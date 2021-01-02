<!--
  增加插槽：
  增加属性：
    公共属性参考 formMixin.js
    filter-key-equal
    filter-key-like
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label :class="{'dense':dense, 'ellipsis-2-lines':!noEllipsis}" :style="computedLabelStyle"><slot name="form-label">{{formLabel}}</slot></label>
    <q-select
      :value="model"
      ref="select"
      class="col coadmin-select"
      popup-content-class="custom-other-bg"
      :no-error-icon="noErrorIcon"
      :input-class="computedInputClass"
      :style="contentStyle"
      :options="optionsInData"
      v-bind="$attrs"
      v-on="listeners"
      :multiple="multiple"
      :use-input="useInput"
      :emit-value="emitValue"
      :map-options="mapOptions"
      :dense="dense"
      :options-dense="optionsDense"
      :option-label="optionLabel"
      :option-value="optionValue"
      :outlined="outlined"
      :disable="disable"
      :readonly="readonly"
      hide-dropdown-icon
      @filter="_filterFn"
      @mouseover.native="hover=true"
      @mouseleave.native="hover=false"
      @popup-show="_popupshow"
      @popup-hide="_popuphide"
      @input="_input"
    >
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName"/>
      </template>
      <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
        <slot :name="slotName" v-bind="prop"/>
      </template>
      <template v-slot:append>
        <slot name="append" />
        <template v-if="clearable && hover && !!model && !disable">
          <q-icon :name='clearIcon' class='cursor-pointer' @click="_doClean()"/>
        </template>
        <template v-else>
          <q-icon
            v-if="!hideDropdownIcon"
            class="cursor-pointer"
            :style="popupShow?'transform: rotate(180deg)':''"
            :name="dropdownIcon"
            @click="_doCustomCursorClick()"/>
        </template>
      </template>
    </q-select>
  </div>
  <q-select v-else
    :value="model"
    ref="select"
    class="coadmin-select"
    popup-content-class="custom-other-bg"
    :class="computedClass"
    :no-error-icon="noErrorIcon"
    :input-class="computedInputClass"
    :style="contentStyle"
    :options="optionsInData"
    v-bind="$attrs"
    v-on="listeners"
    :multiple="multiple"
    :use-input="useInput"
    :emit-value="emitValue"
    :map-options="mapOptions"
    :dense="dense"
    :options-dense="optionsDense"
    :option-label="optionLabel"
    :option-value="optionValue"
    :outlined="outlined"
    :disable="disable"
    :readonly="readonly"
    hide-dropdown-icon
    @filter="_filterFn"
    @mouseover.native="hover=true"
    @mouseleave.native="hover=false"
    @popup-show="_popupshow"
    @popup-hide="_popuphide"
    @input="_input"
  >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
      <slot :name="slotName" v-bind="prop"/>
    </template>

    <template v-slot:append>
      <slot name="append" />
      <template v-if="clearable && hover && !!model && !disable">
        <q-icon :name='clearIcon' class='cursor-pointer' @click="_doClean()"/>
      </template>
      <template v-else>
        <q-icon
          v-if="!hideDropdownIcon"
          class="cursor-pointer"
          :style="popupShow?'transform: rotate(180deg)':''"
          :name="dropdownIcon"
          @click="_doCustomCursorClick()"/>
      </template>
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
    dropdownIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    hideDropdownIcon: Boolean,
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
      hover: false,
      model: null,
      optionsInData: this.options,
      popupShow: false
    }
  },
  created () {
    this._initModel(this.$attrs.value)
  },
  watch: {
    '$attrs.value' (val, old) {
      console.log('new=', val)
      console.log('old=', old)
      //this.model = val
      this._initModel(val)
    }
    /*,
    model (val, valOld) {
      if (this.$listeners['value-label']) {
        this.$emit('value-label', this._valueToLabel(val))
      }
      if (!this.disable) {
        if (!val) {
          this.$emit('clear', valOld)
          this.$emit('input', val)
        }
      }
    }*/
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
              //vm.$emit('input', value)
              vm._modelChange(value)
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
  methods: {
    _initModel(value) {
      let optionIsString = false
      if (this.options && this.options.length > 0) {
        const opt0 = this.options[0]
        if (typeof opt0[this.optionValue] === 'string') {
          //if (!(value === null || value === undefined || typeof value === 'object')) {
          optionIsString = true
          //}
        }
      }
      console.log('optionisstring=', optionIsString, typeof value, Array.isArray(value), this.multiple)
      if (this.multiple) {
        if (value == null) {
          this.model = []
        } else {
          if (optionIsString) {
            if (typeof value === 'number') {
              this.model = value + ''
            } else if (Array.isArray(value)) {
              this.model = []
              for (const v of value) {
                this.model.push(v + '')
              }
              console.log('value.is array=', this.model)
            } else {
              this.model = value
            }
          } else {
            this.model = value
          }
        }
      } else {
        this.model = optionIsString ? value + '' : value
      }
      console.log('model=', this.model, this.$attrs.value)
    },
    _input (val) {
      console.log('_input.val=', val)
      this._modelChange(val)
    },
    _doCustomCursorClick () {
      // eslint-disable-next-line eqeqeq
      if (this.useInput) {
        if (this.popupShow) {
          this.$refs.select.hidePopup()
        } else {
          this.$refs.select.showPopup()
        }
      }
    },
    _modelChange (valNew, valOld) {
      if (this.$listeners['value-label']) {
        this.$emit('value-label', this._valueToLabel(valNew))
      }
      if (!valNew) {
        this.$nextTick(() => {
          this.$emit('clear', valOld)
        })
      }
      if (!this.disable) {
        this.$emit('input', valNew)
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
    _doClean () {
      const old = this.model
      this.model = null
      this._modelChange(this.model, old)
      /*if (!this.noClearFocus) {
        this.focus()
      }*/
    },
    _valueToLabel (value) {
      if (typeof value !== 'number') {
        if (!value || value.length === 0) {
          return null
        }
      }
      if (this.mapOptions) {
        const optionLabelKey = this.optionLabel // (this.$attrs['option-label'] === undefined) ? 'label' : this.$attrs['option-label']
        const optionValueKey = this.optionValue // (this.$attrs['option-value'] === undefined) ? 'value' : this.$attrs['option-value']
        if (this.emitValue) {
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
        }
        return labels
      } else {
        return value
      }
    },
    _transMapToValue (mapValue, valueKey) {
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
            const labelKey = this.optionLabel // (this.$attrs['option-label'] === undefined) ? 'label' : this.$attrs['option-label']
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
