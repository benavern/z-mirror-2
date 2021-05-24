<template>
  <div id="big-message-list">
    <div class="big-message-item is-size-1"
      v-for="item in bigMessageListFiltered"
      :key="item.key"
      v-html="item.text" />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'defaultBigMessage',
  props: ['bigMessageList'],
  data () {
    let now = dayjs()
    return {
      now,
      refreshInterval: null
    }
  },
  computed: {
    bigMessageListFiltered () {
      return this.bigMessageList.filter(item => {
        const start = {
          h: dayjs(item.start).hour(),
          m: dayjs(item.start).minute()
        }
        const end = {
          h: dayjs(item.end).hour(),
          m: dayjs(item.end).minute()
        }
        const now = {
          h: this.now.hour(),
          m: this.now.minute()
        }

        let display = false

        if (now.h >= start.h && now.h <= end.h) {
          // hours in the interval
          display = true
          // start hours are equal but minutes are before the target time
          if (now.h === start.h && now.m < start.m) display = false
          // end hours are equal but minutes are after the target time
          if (now.h === end.h && now.m >= end.m) display = false
        }

        return display
      })
    }
  },
  methods: {
    updateNow () {
      this.now = dayjs()
    }
  },
  mounted () {
    // refresh date regularily
    clearInterval(this.refreshInterval)
    const t = 1000 * 60
    this.refreshInterval = setInterval(this.updateNow, t)
  },
  beforeDestroy () {
    clearInterval(this.refreshInterval)
  }
}
</script>
