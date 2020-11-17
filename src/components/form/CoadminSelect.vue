<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label class="ellipsis" :class="{'dense':dense}"><slot name="form-label">{{formLabel}}</slot></label>
    <q-select
      ref="select"
      class="col"
      :input-class="computedInputClass"
      :options="optionsInData"
      v-bind="$attrs"
      v-on="listeners"
      :dense="dense"
      :outlined="outlined"
      :disable="disable"
      :readonly="readonly"
      @filter="_filterFn"
      @input-valuexxx="inputValue"
    >
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName"/>
      </template>
      <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
        <slot :name="slotName" v-bind="prop"/>
      </template>
    </q-select>
  </div>
  <q-select v-else
    ref="select"
    :class="computedClass"
    :input-class="computedInputClass"
    :options="optionsInData"
    v-bind="$attrs"
    v-on="listeners"
    :dense="dense"
    :outlined="outlined"
    :disable="disable"
    :readonly="readonly"
    @filter="_filterFn"
    @input-valuexxx="inputValue"
  >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
      <slot :name="slotName" v-bind="prop"/>
    </template>
  </q-select>

</template>

<script>
import formMixin from './formMixin.js'
export default {
  name: 'CoadminSelect',
  inheritAttrs: false,
  mixins: [formMixin],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    noFilter: {
      type: Boolean,
      default: false
    },
    inputClass: String
  },
  data () {
    return {
      optionsInData: this.options
    }
  },
  computed: {
    computedInputClass () {
      if (!this.inputClass) {
        return 'fit'
      } else {
        return 'fit ' + this.inputClass
      }
    },
    listeners: function () {
      const vm = this
      return Object.assign({},
        // 从父级添加所有的监听器
        vm.$listeners,
        // 添加自定义监听器，或覆写一些监听器的行为
        {
          input: function (value) {
            if (!vm.disable && !vm.readonly) {
              vm.$emit('input', value)
            }
          }
          /*
          filter: function (inputValue, doneFn, abortFn) {
            if (vm.noFilter) {
              vm.$emit('filter', )
            }
          } */
        }
      )
    }
  },
  mounted () {
  },
  methods: {
    inputValue (value) {
      console.log('input.value=', value)
    },
    _filterFn (val, update, abort) {
      console.log('filterFn=', val)
      const fn = this.$listeners.filter
      if (typeof fn === 'function') {
        fn(val, update, abort)
        return
      }
      update(() => {
        if (!val) {
          this.optionsInData = this.options
        } else {
          if (this.options && typeof this.options[0] === 'string') {
            const needle = val.toLocaleLowerCase()
            this.optionsInData = this.options.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
          } else {
            const needle = val.toLocaleLowerCase()
            this.optionsInData = this.options.filter(v => v.desc.toLocaleLowerCase().indexOf(needle) > -1)
          }
        }
      },
      ref => {
        // "ref" is the Vue reference to the QSelect
        if (val !== '' && ref.options.length > 0) {
          ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
          ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
        }
      })
    },

    /** ********* 原组件method begin */
    scrollTo (index, edge) {
      this.$refs.select.scrollTo(index, edge)
    },
    reset () {
      this.$refs.select.reset()
    },
    refresh (index) {
      this.$refs.select.refresh(index)
    },
    resetValidation () {
      this.$refs.select.resetValidation()
    },
    validate (value) {
      return this.$refs.select.validate(value)
    },
    focus () {
      this.$refs.select.focus()
    },
    showPopup () {
      this.$refs.select.showPopup()
    },
    hidePopup () {
      this.$refs.select.hidePopup()
    },
    removeAtIndex (index) {
      this.$refs.select.removeAtIndex(index)
    },
    add (opt, unique) {
      this.$refs.select.add(opt, unique)
    },
    toggleOption (opt, keepOpen) {
      this.$refs.select.toggleOption(opt, keepOpen)
    },
    setOptionIndex (index) {
      this.$refs.select.setOptionIndex(index)
    },
    moveOptionSelection (offset, skipInputValue) {
      this.$refs.select.moveOptionSelection(offset, skipInputValue)
    },
    filter (value) {
      this.$refs.select.filter(value)
    },
    updateMenuPosition () {
      this.$refs.select.updateMenuPosition()
    },
    updateInputValue (value, noFilter) {
      this.$refs.select.updateInputValue(value, noFilter)
    },
    isOptionSelected (opt) {
      return this.$refs.select.isOptionSelected(opt)
    },
    getEmittingOptionValue (opt) {
      return this.$refs.select.updateMenuPosition(opt)
    },
    getOptionValue (opt) {
      return this.$refs.select.updateMenuPosition(opt)
    },
    getOptionLabel (opt) {
      return this.$refs.select.updateMenuPosition(opt)
    },
    isOptionDisabled (opt) {
      return this.$refs.select.updateMenuPosition(opt)
    }
    /** ********* 原组件method end */
  }
}
</script>

<style lang="scss" scoped>
@import './form.scss'
</style>
