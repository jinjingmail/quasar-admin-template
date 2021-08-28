<!--
  增加插槽：
  增加属性：
    multiple-max 多选最多可以选多少个
    range-separator
  返回值：
    range=false, multiple=false："2019/02/10"
    range=false, multiple=true ：["2019/02/10", "2019/02/12", "2019/02/13",]
    range=true, multiple=false： { "from": "2020/07/08", "to": "2020/07/15" }
    range=true, multiple=true ：  [{"from": "2020/07/08", "to": "2020/07/15"}, {"from": "2020/07/08", "to": "2020/07/15"}]
-->
<template>
  <q-date
    ref="date"
    class="custom-other-bg"
    v-bind="$attrs"
    v-on="listeners"
    :mask="mask"
    :locale="cnLocale"
    :multiple="multiple"
    :range="range"
    :subtitle="computedSubtitle"
    :title="computedTitle"
    :today-btn="todayBtn"
  >
    <slot name="default"/>
  </q-date>
</template>
<script>
import { date } from 'quasar'

export default {
  name: 'CoDate',
  inheritAttrs: false,
  props: {
    mask: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    locale: Object,
    subtitle: String,
    title: String,
    todayBtn: Boolean,
    multiple: Boolean,
    multipleMax: Number,
    range: Boolean,
    rangeSeparator: {
      type: String,
      default: '→'
    }
  },
  data () {
    return {
      cnLocale: {
        /* starting with Sunday */
        days: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        daysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        firstDayOfWeek: 1
      }
    }
  },
  created () {
    if (this.locale) {
      this.cnLocale = this.locale
    }
  },
  computed: {
    computedSubtitle () {
      if (this.subtitle) {
        return this.subtitle
      }
      const v = this.$attrs.value
      if (!v) {
        return ''
      }
      if (this.range) {
        if (this.multiple) {
          return ''
        } else if (!v.from) {
          return v
        } else {
          return v.from + this.rangeSeparator + v.to
        }
      } else if (this.multiple) {
        return ''
      } else {
        const date_ = new Date(v)
        const days = date.getDayOfWeek(date_)
        return date_.getUTCFullYear() + ' ' + (days === 7 ? this.cnLocale.days[0] : this.cnLocale.days[days])
      }
    },
    computedTitle () {
      if (this.title) {
        return this.title
      }
      const v = this.$attrs.value
      if (!v) {
        return ''
      }
      if (this.range) {
        if (this.multiple) {
          return (v.length ? v.length : '1') + '个时间段'
        } else {
          if (typeof v === 'string') return '1天'
          return date.getDateDiff(v.to, v.from, 'days') + 1 + ' 天'
        }
      } else if (this.multiple) {
        return v.length + '天'
      } else {
        return v.toString()
      }
    },
    listeners: function () {
      const vm = this
      return Object.assign({},
        // 从父级添加所有的监听器
        vm.$listeners,
        // 添加自定义监听器，或覆写一些监听器的行为
        {
          input: function (value, reason, details) {
            if (!vm.disable) {
              // 提示：Quasar在range状态下，如果只开始和结束是同一天，则Quasar返回的只有这一天的日期，这里修正一些
              if (vm.range === true && typeof value === 'string') {
                vm.$emit('input', { from: value, to: value }, reason, details)
              } else {
                vm.$emit('input', value, reason, details)
              }
            }
          }
        }
      )
    }
  },
  methods: {
    setToday () {
      this.$refs.date.setToday()
    },
    setView (view) {
      this.$refs.date.setView(view)
    },
    offsetCalendar (type, descending) {
      this.$refs.date.offsetCalendar(type, descending)
    },
    setCalendarTo (year, month) {
      this.$refs.date.setCalendarTo(year, month)
    },
    setEditingRange (from, to) {
      this.$refs.date.setEditingRange(from, to)
    }
  }
}
</script>
