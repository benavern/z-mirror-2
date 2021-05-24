<template>
  <div id="clock">
    <div class="time">
      <span class="houres">{{ houres }}</span><span :class="['separator', {'hidden': seconds % 2}]">:</span><span class="minutes">{{ minutes }}</span>
      <span class="seconds">{{ seconds }}</span>
    </div>
    <div class="date">{{ date }}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'defaultClock',
  data () {
    return {
      houres: '',
      minutes: '',
      seconds: '',
      date: '',
      now: null,
      clockTimer: null
    }
  },
  mounted () {
    this.$on('start', this.startClock)
    this.$on('stop', this.stopClock)

    this.updateClock()
    this.startClock()
  },
  methods: {
    updateClock () {
      this.now = dayjs()
      this.houres = this.now.format('HH')
      this.minutes = this.now.format('mm')
      this.seconds = this.now.format('ss')
      this.date = this.now.format('dddd D MMM YYYY')
    },
    startClock () {
      this.clockTimer = setInterval(this.updateClock, 1000)
    },
    stopClock () {
      clearInterval(this.clockTimer)
    }
  }
}
</script>

<style lang="scss" scoped>
  #clock {
    .time {
      position: relative;
      display: inline-block;
      font-size: 5rem;
      line-height: 5rem;
      font-weight: bold;

      .hidden {
        opacity: 0;
      }

      .seconds {
        position: relative;
        display: inline-block;
        line-height: 2.5rem;
        font-size: 2.5rem;
        margin-left: .5rem;
        top: -1.75rem;
        font-weight: normal;
      }
    }

    .date {
      margin-top: 1rem;
      text-transform: capitalize;
    }
  }
</style>
