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
      default-time  自动在日期后面添加后缀，比如：[' 00:00:00', ' 23:59:59']
      hide-dropdown-icon
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
  >
    <q-popup-proxy
      ref="popupDate"
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
export default {
  name: 'CoDateSelect',
  inheritAttrs: false,
  props: {
    disable: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    useInput: Boolean,
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
      default: ' -> '
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
    defaultTime: Array
  },
  computed: {
    dateModel () {
      const newVal = this.$attrs.value
      if (this.range) {
        if (Array.isArray(newVal) && newVal.length >= 2) {
          // 在range模式下，同一天 {from:'2020-01-12', to:'2020-01-12'} 会不显示，所以这里特殊处理一下
          if (newVal[0] === newVal[1]) { // TODO 包含defaultTime时，需要先去掉defaultTime
            return newVal[0]
          } else {
            return { from: newVal[0], to: newVal[1] }
          }
        } else {
          return undefined
        }
      } else {
        if (!newVal) {
          return undefined
        } else {
          return newVal
        }
      }
      /*
      if (!newVal) {
        return undefined
      } else {
        if (Array.isArray(newVal) && newVal.length > 0) {
          return !this.range ? newVal : { from: newVal[0], to: newVal[1] }
        } else {
          return newVal
        }
      }*/
    },
    inputModel () {
      const newVal = this.$attrs.value
      let input
      if (this.range) {
        /*
        if (!newVal || !newVal.from) {
          input = undefined
        } else {
          input = newVal.from + this.rangeSeparator + newVal.to
        }*/
        if (Array.isArray(newVal) && newVal.length >= 2) {
          input = newVal[0] + this.rangeSeparator + newVal[1]
        } else {
          input = undefined
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
    _dateInput(value, reason, details) {
      const newVal = value
      if (this.range && newVal && newVal.from) {
        let time1 = ''
        let time2 = ''
        if (this.defaultTime) {
          if (this.defaultTime.length >= 1) {
            time1 = this.defaultTime[0]
          }
          if (this.defaultTime.length >= 2) {
            time2 = this.defaultTime[1]
          }
        }
        this.$emit('input', [newVal.from + time1, newVal.to + time2])
      } else if (newVal && newVal.length > 0) {
        let time1 = ''
        if (this.defaultTime && this.defaultTime.length >= 1) {
          time1 = this.defaultTime[0]
        }
        this.$emit('input', newVal + time1)
      } else {
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
    },
    select () {
      this.$refs.input.select()
    }
  }
}
</script>
