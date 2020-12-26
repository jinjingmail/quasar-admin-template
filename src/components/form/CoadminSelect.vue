<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label :class="{'dense':dense, 'ellipsis-2-lines':!noEllipsis}"><slot name="form-label">{{formLabel}}</slot></label>
    <q-select
      v-model="model"
      ref="select"
      class="col"
      :no-error-icon="noErrorIcon"
      :input-class="computedInputClass"
      :style="contentStyle"
      :options="optionsInData"
      v-bind="$attrs"
      v-on="listeners"
      :dense="dense"
      :options-dense="optionsDense"
      :outlined="outlined"
      :disable="disable"
      :readonly="readonly"
      @filter="_filterFn"
      @mouseover.native="hover=true"
      @mouseleave.native="hover=false"
    >
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName"/>
      </template>
      <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
        <slot :name="slotName" v-bind="prop"/>
      </template>
      <template v-slot:append>
        <template v-if="clearable && hover && !!model && !disable">
          <q-icon :name='clearIcon' class='cursor-pointer' @click="_doClean()"/>
        </template>
        <slot v-else name="append"/>
      </template>
    </q-select>
  </div>
  <q-select v-else
    v-model="model"
    ref="select"
    :class="computedClass"
    :no-error-icon="noErrorIcon"
    :input-class="computedInputClass"
    :style="contentStyle"
    :options="optionsInData"
    v-bind="$attrs"
    v-on="listeners"
    :dense="dense"
    :options-dense="optionsDense"
    :outlined="outlined"
    :disable="disable"
    :readonly="readonly"
    @filter="_filterFn"
    @mouseover.native="hover=true"
    @mouseleave.native="hover=false"
  >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
      <slot :name="slotName" v-bind="prop"/>
    </template>

    <template v-slot:append>
      <template v-if="clearable && hover && !!model && !disable">
        <q-icon :name='clearIcon' class='cursor-pointer' @click="_doClean()"/>
      </template>
      <slot v-else name="append"/>
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
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: 'cancel'
    },
    noClearFocus: Boolean,
    noErrorIcon: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    },
    optionsDense: {
      type: Boolean,
      default: true
    },
    noFilter: {
      type: Boolean,
      default: false
    },
    filterKeyLike: {
      type: String,
      default: null
    },
    filterKeyEqual: {
      type: String,
      default: null
    },
    inputClass: String
  },
  data () {
    return {
      hover: false,
      model: null,
      optionsInData: this.options
    }
  },
  created () {
    const value = this.model = this.$attrs.value
    if (this.$attrs.multiple) {
      if (value == null) {
        this.model = []
      } else {
        this.model = value
      }
    } else {
      this.model = value
    }
  },
  watch: {
    '$attrs.value' (val) {
      this.model = val
    },
    model (val, valOld) {
      if (this.$listeners['value-label']) {
        this.$emit('value-label', this.valueToLabel(val))
      }
      if (!this.disable) {
        if (!val) {
          this.$emit('clear', valOld)
        }
        this.$emit('input', val)
      }
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
          /*input: function (value) {
            if (!vm.disable) {
              vm.$emit('input', value)
            }
          }*/
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
    _doClean () {
      this.model = null
      /*if (!this.noClearFocus) {
        this.focus()
      }*/
    },
    valueToLabel (value) {
      if (typeof value !== 'number') {
        if (!value || value.length === 0) {
          return null
        }
      }
      if (this.$attrs['map-options'] === '' || this.$attrs['map-options']) {
        const optionLabelKey = (this.$attrs['option-label'] === undefined) ? 'label' : this.$attrs['option-label']
        const optionValueKey = (this.$attrs['option-value'] === undefined) ? 'value' : this.$attrs['option-value']
        if (this.$attrs['emit-value'] !== '' && !this.$attrs['emit-value']) {
          value = this.transMapToValue(value, optionValueKey)
        }
        const labels = []
        if (this.$attrs.multiple === '' || this.$attrs.multiple) {
          for (const v of value) {
            for (const m of this.options) {
              if (m[optionValueKey] === v) {
                labels.push(m[optionLabelKey])
                break
              }
            }
          }
        } else {
          for (const m of this.options) {
            if (m[optionValueKey] === value) {
              return m[optionLabelKey]
            }
          }
        }
        return labels
      } else {
        return value
      }
    },
    transMapToValue (mapValue, valueKey) {
      if (mapValue.length !== undefined) {
        const values = []
        for (const v of mapValue) {
          values.push(v[valueKey])
        }
        return values
      } else {
        return mapValue[valueKey]
      }
    },
    _filterFn (val, update, abort) {
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
            const labelKey = (this.$attrs['option-label'] === undefined) ? 'label' : this.$attrs['option-label']
            const needle = val.toLocaleLowerCase()
            const likeKey = this.filterKeyLike
            const equalKey = this.filterKeyEqual
            this.optionsInData = this.options.filter(v => v[labelKey].toLocaleLowerCase().indexOf(needle) > -1 ||
             (likeKey && v[likeKey] && v[likeKey].toLocaleLowerCase().indexOf(needle) > -1) ||
             (equalKey && v[equalKey] && v[equalKey].toString() === needle))
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
