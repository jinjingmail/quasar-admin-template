<!--
  增加插槽：
  增加属性：
    参考 props 定义
    option-label      参考q-select 定义这两个key
    option-value      参考q-select 定义这两个key
    value-to-string   将value转换为string再使用(用于value跟options里面数据类型不一致的情况)
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label :class="{'dense':dense, 'ellipsis-2-lines':!noEllipsis}"
      :style="computedLabelStyle">
      <slot name="form-label"><template v-if="rules && rules.length > 0">* </template>{{formLabel}}</slot>
    </label>
    <q-option-group
      :value="valueSync"
      ref="optionGroup"
      class="col q-py-xs coadmin-option-group"
      v-bind="$attrs"
      v-on="listeners"
      :rules="rules"
      :type="type"
      :options="optionsTranslated"
      :dense="dense"
      :disable="disable"
      :readonly="readonly"
    >
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName"/>
      </template>
      <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
        <slot :name="slotName" v-bind="prop"/>
      </template>
    </q-option-group>
  </div>
  <q-option-group v-else
    :value="valueSync"
    ref="optionGroup"
    class="q-py-xs coadmin-option-group"
    :class="computedClass"
    v-bind="$attrs"
    v-on="listeners"
    :rules="rules"
    :type="type"
    :options="optionsTranslated"
    :dense="dense"
    :disable="disable"
    :readonly="readonly"
  >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
      <slot :name="slotName" v-bind="prop"/>
    </template>
  </q-option-group>

</template>

<script>
import formMixin from './formMixin.js'
export default {
  name: 'CoadminOptionGroup',
  inheritAttrs: false,
  mixins: [formMixin],
  props: {
    value: null,
    valueToString: Boolean,
    rules: Array,
    type: {
      type: String,
      default: 'radio',
      validator: v => ['radio', 'checkbox', 'toggle'].includes(v)
    },
    options: {
      type: Array,
      default: () => []
    },
    optionLabel: {
      type: [Function, String],
      default: 'label'
    },
    optionValue: {
      type: [Function, String],
      default: 'value'
    }
  },
  data () {
    return {
      valueSync: null,
      optionsTranslated: []
    }
  },
  created () {
    if (this.optionLabel === 'label' && this.optionValue === 'value') {
      this.optionsTranslated = this.options
    } else {
      this.optionsTranslated = this.options.map(o => { return { label: o[this.optionLabel], value: o[this.optionValue] } })
    }
    if (this.value == null && this.type === 'checkbox') {
      this.$emit('input', [])
    }
    if (this.valueToString && this.value != null) {
      if (typeof this.value === 'object') {
        this.valueSync = []
        for (const o of this.value) {
          this.valueSync.push(o + '')
        }
      } else {
        this.valueSync = this.value + ''
      }
    }
    this._emitValueLabel(this.valueSync)
  },
  watch: {
    value: {
      immediate: true,
      handler (newVal, oldVal) {
        if (this.valueToString && this.value != null) {
          if (typeof this.value === 'object') {
            this.valueSync = []
            for (const o of this.value) {
              this.valueSync.push(o + '')
            }
          } else {
            this.valueSync = this.value + ''
          }
        } else {
          this.valueSync = this.value
        }
        this._emitValueLabel(this.valueSync)
      }
    }
  },
  computed: {
    listeners: function () {
      const vm = this
      return Object.assign({},
        // 从父级添加所有的监听器
        vm.$listeners,
        // 添加自定义监听器，或覆写一些监听器的行为
        {
          input: function (value) {
            vm._doModelChange(value)
          }
        }
      )
    }
  },
  methods: {
    _emitValueLabel(value) {
      if (this.$listeners['value-label']) {
        const labels = this._valueToLabel(value)
        this.$emit('value-label', labels)
      }
    },
    _doModelChange(value) {
      if (!this.disable) {
        this.$emit('input', value)
      }
    },
    _valueToLabel (value) {
      if (value == null || value === undefined) {
        return null
      }
      if (typeof value === 'object') {
        const labels = []
        for (const vv of value) {
          for (const v of this.optionsTranslated) {
            if (v.value === vv) {
              labels.push(v.label)
              break
            }
          }
        }
        return labels.length === 0 ? null : labels
      }
      for (const v of this.optionsTranslated) {
        if (v.value === value) {
          return v.label
        }
      }
      return value
    }
  }
}
</script>
