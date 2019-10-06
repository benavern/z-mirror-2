<template>
  <div id="clock">
    <div class="clock-content">
      <div class="time">
        <span class="houres">{{ houres }}</span>
        <span :class="['separator', {'hidden': seconds % 2}]">:</span>
        <span class="minutes">{{ minutes }}</span>
        <!-- <span class="seconds">{{ seconds }}</span> -->
      </div>
      <div class="date">{{ date }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

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
      this.now = moment()
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
    position: relative;

    .clock-content {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }

    .time {
      position: relative;
      display: inline-block;
      font-size: 4rem;
      line-height: 4rem;

      .hidden {
        opacity: 0;
      }

      .separator {
        margin: 0 .1em;
      }
    }

    .date {
      margin-top: 1rem;
      text-transform: capitalize;
    }
  }
</style>
