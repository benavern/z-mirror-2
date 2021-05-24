<template>
  <div id="clock">
    <div class="time">{{ date | formatDate('HH:mm') }}</div>
    <div class="date">{{ date | formatDate('dddd, D MMM YYYY') }}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'ModernClock',

  data() {
    return {
      date: null,
      clockTimer: null
    }
  },

  filters: {
    formatDate(date, format = 'HH:mm') {
      if(!date) return ''
      return date.format(format)
    }
  },

  methods: {
    updateClock () {
      this.date = dayjs()
    },
    startClock () {
      this.clockTimer = setInterval(this.updateClock, 1000)
    },
    stopClock () {
      this.date = null
      clearInterval(this.clockTimer)
    }
  },

  mounted () {
    this.$on('start', this.startClock)
    this.$on('stop', this.stopClock)

    this.updateClock()
    this.startClock()
  },

  destroyed() {
    this.stopClock()
  }
}
</script>


<style lang="scss" scoped>
  #clock {
    position: relative;
    text-align: right;

    .time {
      font-size: 6rem;
    }

    .date {
      text-transform: capitalize;
      font-size: 2rem;
    }
  }
</style>

