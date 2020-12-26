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
  返回值：
      range=false "2019/02/10"
      range=true  ["2019/02/10", "2019/02/15"]
-->
<template>
  <coadmin-input
    v-model="inputModel"
    ref="input"
    v-on="listeners"
    v-bind="$attrs"
    :disable="disable"
    :readonly="computedReadonly"
    :no-clear-focus="noClearFocus"
  >
    <q-popup-proxy
      ref="popupDate"
    >
      <coadmin-date
        v-model="dateModel"
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
        @input="$refs.popupDate.hide()"
      >
      </coadmin-date>
    </q-popup-proxy>

    <!--
    <template v-slot:append v-if="!noIcons">
      <q-icon name="event" />
    </template>
    -->

    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>

  </coadmin-input>
</template>

<script>
// import formMixin from './formMixin.js'
export default {
  name: 'CoadminDateSelect',
  inheritAttrs: false,
  // mixins: [formMixin],
  props: {
    disable: Boolean,
    readonly: Boolean,
    useInput: Boolean,
    noIcons: Boolean,
    noClearFocus: {
      type: Boolean,
      default: true
    },

    range: Boolean,
    rangeSeparator: {
      type: String,
      default: ' ~ '
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
    navigationMaxYearMonth: String
  },
  data () {
    return {
      inputModel: null,
      dateModel: null
    }
  },
  created () {
  },
  mounted () {
    if (this.$attrs.value && this.$attrs.value.length > 0) {
      this.dateModel = !this.range ? this.$attrs.value : { from: this.$attrs.value[0], to: this.$attrs.value[1] }
    }
  },
  watch: {
    '$attrs.value' (newVal) {
      if (!newVal) {
        this.dateModel = null
      }
    },
    inputModel (newVal, oldVal) {
      if (!newVal) {
        this.dateModel = null
      }
      if (!this.range) {
        // TODO 判断 newVal是否合法
        this.dateModel = newVal
      }
    },
    dateModel (newVal, oldVal) {
      if (this.range) {
        if (!newVal || !newVal.from) {
          this.inputModel = null
        } else {
          this.inputModel = newVal.from + this.rangeSeparator + newVal.to
        }
      } else {
        if (!newVal) {
          this.inputModel = null
        } else {
          this.inputModel = newVal
        }
      }
      if (this.disable) {
        return
      }
      if (this.range && newVal && newVal.from) {
        this.$emit('input', [newVal.from, newVal.to])
      } else if (newVal && newVal.length > 0) {
        this.$emit('input', newVal)
      } else {
        this.$emit('input', '')
      }
    }
  },
  computed: {
    computedReadonly () {
      if (!this.useInput || this.readonly) {
        return true
      } else {
        return false
      }
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
            // if (!vm.disable && !vm.readonly) {
            //   vm.$emit('input', value)
            // }
          }
        }
      )
    }
  },
  methods: {
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
