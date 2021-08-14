<!--
  提示：暂时不支持编辑输入框
  初值：
    this.$attrs.value
      range=false "2019/02/10"
      range=true  ["2019/02/10", "2019/02/15"]
  新增插槽：
      form-label
  新增prop：
      见prop定义
      date-today-btn
      default-time  自动在日期后面添加后缀，比如：['00:00:00', '23:59:59']
      date-time-join 日期和时间链接符号
      hide-dropdown-icon
      edit-time     修改时间
      with-seconds
  返回值：
      range=false "2019/02/10"
      range=true  ["2019/02/10", "2019/02/15"]
-->
<template>
  <co-field
    :value="inputModel"
    ref="input"
    v-on="listeners"
    v-bind="$attrs"
    :disable="disable"
    :readonly="readonly"
    :no-clear-focus="noClearFocus"
    :rules="rules"
  >
    <q-popup-proxy
      ref="popupDate"
      @before-hide="_popupDateBeforeHide"
    >
      <co-date
        :value="dateModel"
        :class="dateClass"
        :style="dateStyle"
        :color="dateColor"
        :text-color="dateTextColor"
        :mask="dateMask"
        :multiple="false"
        :range="range"
        :today-btn="dateTodayBtn"
        :disable="disable"
        :readonly="readonly"
        :range-separator="rangeSeparator"
        :options="dateOptions"
        :default-year-month="defaultYearMonth"
        :navigation-min-year-month="navigationMinYearMonth"
        :navigation-max-year-month="navigationMaxYearMonth"
        @input="_dateInput"
      >
        <div class="row q-gutter-xl" v-if="editTime">
          <q-field dense class="col" label="开始时间" :value="times[0]">
            <template v-slot:control>{{times[0]}}</template>
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                v-model="times[0]"
                :with-seconds="withSeconds"
                format24h
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-field>
          <q-field dense class="col" label="结束时间" :value="times[1]">
            <template v-slot:control>{{times[1]}}</template>
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                v-model="times[1]"
                :with-seconds="withSeconds"
                format24h
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-field>
        </div>
      </co-date>
    </q-popup-proxy>

    <template v-slot:append v-if="!hideDropdownIcon || (clearable && !!inputModel)">
      <q-icon v-if="!disable && clearable && !!inputModel" :name="clearIcon" class="cursor-pointer" @click.prevent.stop="_clearInput"/>
      <q-icon v-else-if="!hideDropdownIcon" :name="dropdownIcon" />
    </template>

    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>

  </co-field>
</template>

<script>
import { remove } from '@/utils/string'

export default {
  name: 'CoDateSelect',
  inheritAttrs: false,
  props: {
    disable: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    useInput: Boolean,
    rules: Array,
    dropdownIcon: {
      type: String,
      default: 'event'
    },
    hideDropdownIcon: Boolean,
    clearIcon: {
      type: String,
      default: 'cancel'
    },
    noClearFocus: {
      type: Boolean,
      default: true
    },

    range: Boolean,
    rangeSeparator: {
      type: String,
      default: ' → '
    },
    dateTimeJoin: {
      type: String,
      default: ' '
    },
    dateTodayBtn: Boolean,
    dateMask: String,
    dateMinimal: Boolean,
    dateOptions: [Array, Function],
    dateClass: String,
    dateStyle: String,
    dateColor: String,
    dateTextColor: String,
    defaultYearMonth: String,
    navigationMinYearMonth: String,
    navigationMaxYearMonth: String,
    defaultTime: Array,
    editTime: Boolean,
    withSeconds: Boolean
  },
  data () {
    return {
      times: []
    }
  },
  created() {
    if (this.editTime) {
      this.times[0] = this.defaultTime[0]
      this.times[1] = this.defaultTime[1]
    }
  },
  computed: {
    dateModel () {
      if (this.range) {
        if (Array.isArray(this.$attrs.value) && this.$attrs.value.length >= 2) {
          // 去掉 defaultTime 后缀
          let dateBegin = this.$attrs.value[0]
          let dateEnd = this.$attrs.value[1]
          if (Array.isArray(this.times) && this.times.length >= 2) {
            const b = dateBegin.split(this.dateTimeJoin)
            const e = dateEnd.split(this.dateTimeJoin)
            dateBegin = remove(dateBegin, b[b.length - 1])
            dateEnd = remove(dateEnd, e[e.length - 1])
          }
          // 在range模式下，同一天 {from:'2020-01-12', to:'2020-01-12'} 会不显示，所以这里特殊处理一下
          if (dateBegin === dateEnd) {
            return dateBegin
          } else {
            return { from: dateBegin, to: dateEnd }
          }
        } else {
          return undefined
        }
      } else {
        if (!this.$attrs.value) {
          return undefined
        } else {
          return this.$attrs.value
        }
      }
    },
    inputModel () {
      const newVal = this.dateModel
      let input
      if (this.range) {
        if (!newVal) {
          input = undefined
        } else {
          if (newVal.from) {
            input = newVal.from + this.rangeSeparator + newVal.to
          } else {
            input = newVal + this.rangeSeparator + newVal
          }
        }
      } else {
        if (!newVal) {
          input = undefined
        } else {
          input = newVal
        }
      }
      /*if (this.disable) {
        return undefined
      }*/
      return input
    },
    listeners: function () {
      const vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 从父级添加所有的监听器
        vm.$listeners,
        // 添加自定义监听器，或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (value) {
          }
        }
      )
    }
  },
  methods: {
    _popupDateBeforeHide() {
      if (this.editTime) {
        this._dateInput(this.dateModel)
      }
    },
    _dateInput(value, reason, details) {
      const newVal = value
      if (this.range && newVal && newVal.from) {
        let time1 = ''
        let time2 = ''
        if (this.times) {
          if (this.times.length >= 1) {
            time1 = this.times[0]
          }
          if (this.times.length >= 2) {
            time2 = this.times[1]
          }
        }
        this.$emit('input', [newVal.from + this.dateTimeJoin + time1, newVal.to + this.dateTimeJoin + time2])
      } else if (newVal && newVal.length > 0) {
        let time1 = ''
        if (this.times && this.times.length >= 1) {
          time1 = this.times[0]
        }
        this.$refs.popupDate.hide()
        this.$emit('input', newVal + this.dateTimeJoin + time1)
      } else {
        this.$refs.popupDate.hide()
        this.$emit('input', undefined)
      }
    },
    _clearInput(old) {
      this.$emit('input', undefined)
    },

    resetValidation () {
      this.$refs.input.resetValidation()
    },
    validate (value) {
      return this.$refs.input.validate(value)
    },
    focus () {
      this.$refs.input.focus()
    },
    blur () {
      this.$refs.input.blur()
    }
  }
}
</script>
