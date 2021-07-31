<!--
  增加插槽：
  增加属性：
    公共属性参考 form-mixin.js
    filter-key-equal
    filter-key-like
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label :class="{'dense':dense, 'ellipsis-2-lines':!noEllipsis}"
      :style="computedLabelStyle">
      <slot name="form-label"><span style="color:red" v-if="rules && rules.length > 0">* </span>{{formLabel}}</slot>
    </label>
    <q-select
      :value="value"
      ref="select"
      class="col co-select"
      popup-content-class="custom-other-bg"
      :no-error-icon="noErrorIcon"
      :input-class="computedInputClass"
      :style="contentStyle"
      :options="optionsInData"
      v-bind="$attrs"
      v-on="listeners"
      :rules="rules"
      :multiple="multiple"
      :use-input="useInput"
      :emit-value="emitValue"
      :map-options="mapOptions"
      :dense="dense"
      :option-label="optionLabel"
      :option-value="optionValue"
      :disable="disable"
      :readonly="readonly"
      hide-dropdown-icon
      @filter="_filterFn"
      @popup-show="_popupshow"
      @popup-hide="_popuphide"
    >
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName"/>
      </template>
      <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
        <slot :name="slotName" v-bind="prop"/>
      </template>
      <template v-slot:append>
        <slot name="append" />
        <template v-if="clearable && _hasValue() && !disable">
          <q-icon :name='clearIcon' class='cursor-pointer' @click.prevent.stop="_doClear()"/>
        </template>
        <template v-else>
          <q-icon
            v-if="!hideDropdownIcon"
            class="cursor-pointer"
            :style="popupShow?'transform: rotate(180deg)':''"
            :name="dropdownIcon"/>
        </template>
      </template>
    </q-select>
  </div>
  <q-select v-else
    :value="value"
    ref="select"
    class="co-select"
    popup-content-class="custom-other-bg"
    :class="computedClass"
    :no-error-icon="noErrorIcon"
    :input-class="computedInputClass"
    :style="contentStyle"
    :options="optionsInData"
    v-bind="$attrs"
    v-on="listeners"
    :rules="rules"
    :multiple="multiple"
    :use-input="useInput"
    :emit-value="emitValue"
    :map-options="mapOptions"
    :dense="dense"
    :option-label="optionLabel"
    :option-value="optionValue"
    :disable="disable"
    :readonly="readonly"
    hide-dropdown-icon
    @filter="_filterFn"
    @popup-show="_popupshow"
    @popup-hide="_popuphide"
  >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
      <slot :name="slotName" v-bind="prop"/>
    </template>

    <template v-slot:append>
      <slot name="append" />
      <template v-if="clearable && _hasValue() && !disable">
        <q-icon :name='clearIcon' class='cursor-pointer' @click.prevent.stop="_doClear()"/>
      </template>
      <template v-else>
        <q-icon
          v-if="!hideDropdownIcon"
          class="cursor-pointer"
          :style="popupShow?'transform: rotate(180deg)':''"
          :name="dropdownIcon"
          />
      </template>
    </template>

  </q-select>

</template>

<script>
import FormMixin from './form-mixin.js'
export default {
  name: 'CoSelect',
  inheritAttrs: false,
  mixins: [FormMixin],
  props: {
    value: {
      type: [String, Number, Array, Boolean]
    },
    rules: Array,
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: 'cancel'
    },
    noClearFocus: Boolean,
    dropdownIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    hideDropdownIcon: Boolean,
    options: {
      type: Array,
      default: () => []
    },
    noFilter: Boolean,
    filterKeyLike: {
      type: String,
      default: null
    },
    filterKeyEqual: {
      type: String,
      default: null
    },
    optionLabel: {
      type: [Function, String],
      default: 'label'
    },
    optionValue: {
      type: [Function, String],
      default: 'value'
    },
    multiple: Boolean,
    useInput: Boolean,
    mapOptions: Boolean,
    emitValue: Boolean,
    inputClass: String
  },
  data () {
    return {
      optionsInData: this.options,
      popupShow: false
    }
  },
  created () {
    if (this.multiple && !this.value) {
      this.$emit('input', [])
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (newVal, oldVal) {
        this._emitValueLabel(newVal)
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
          input: function (value) {
            if (!vm.disable) {
              vm._modelChange(value)
            }
          }
        }
      )
    }
  },
  methods: {
    _hasValue() {
      if (Array.isArray(this.value)) {
        return this.value.length > 0
      } else {
        if (this.value == null) {
          return false
        }
        const type = typeof this.value
        if (type === 'undefined') {
          return false
        }
        if (type === 'string') {
          return this.value !== ''
        }
        return true
      }
    },
    _doClear () {
      const oldVal = this.value
      this._modelChange(null)
      this.$emit('clear', oldVal)
    },
    _modelChange (valNew) {
      if (!this.disable) {
        this.$emit('input', valNew)
      }
    },
    _emitValueLabel(value) {
      if (this.$listeners['value-label']) {
        this.$emit('value-label', this._valueToLabel(value))
      }
    },
    _popupshow (evt) {
      this.popupShow = true
      this.$emit('popup-show', evt)
    },
    _popuphide (evt) {
      this.popupShow = false
      this.$emit('popup-hide', evt)
    },
    _valueToLabel (value) {
      if (typeof value !== 'number') {
        if (!value || value.length === 0) {
          return null
        }
      }
      if (this.mapOptions) {
        const optionLabelKey = this.optionLabel
        const optionValueKey = this.optionValue
        if (!this.emitValue) {
          value = this._transMapToValue(value, optionValueKey)
        }
        const labels = []
        if (this.multiple) {
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
          return null
        }
        return labels
      } else {
        return value
      }
    },
    _transMapToValue (mapValue, valueKey) {
      if (mapValue.length) {
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
            const labelKey = this.optionLabel
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
