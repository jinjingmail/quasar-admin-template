<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label :class="{'dense':dense, 'ellipsis-2-lines':!noEllipsis}" :style="computedLabelStyle"><slot name="form-label">{{formLabel}}</slot></label>
    <q-option-group
      v-model="model"
      ref="optionGroup"
      class="col q-py-xs coadmin-option-group"
      v-bind="$attrs"
      v-on="listeners"
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
    v-model="model"
    ref="optionGroup"
    class="q-py-xs coadmin-option-group"
    :class="computedClass"
    v-bind="$attrs"
    v-on="listeners"
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
    options: {
      type: Array,
      default: () => []
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {
      model: null,
      optionsTranslated: []
    }
  },
  created () {
    if (this.labelKey === 'label' && this.valueKey === 'value') {
      this.optionsTranslated = this.options
    } else {
      this.optionsTranslated = this.options.map(o => { return { label: o[this.labelKey], value: o[this.valueKey] } })
    }
    const value = this.$attrs.value

    if (!(value === false || value === 0 || !!value) && (this.$attrs.type === 'checkbox' || this.$attrs.type === 'toggle')) {
      this.model = []
    } else {
      if (this.optionsTranslated && this.optionsTranslated.length === 0) {
        this.model = value
        return
      }
      if (this.optionsTranslated && this.optionsTranslated.length > 0) {
        const opt0 = this.optionsTranslated[0]
        if (typeof opt0[this.valueKey] === 'string') {
          if (!(value === null || value === undefined || typeof value === 'object')) {
            this.model = value + ''
          } else {
            this.model = value
          }
        } else {
          this.model = value
        }
      }
    }
  },
  mounted () {
  },
  watch: {
    '$attrs.value' (val) {
      if ((this.$attrs.type === 'checkbox' || this.$attrs.type === 'toggle') && !val) {
        this.model = []
      } else {
        this.model = val
      }
    },
    model (value) {
      // 这里不判断 this.disable
      if (this.$listeners['value-label']) {
        this.$emit('value-label', this.valueToLabel(value))
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
            if (!vm.disable) {
              vm.$emit('input', value)
            }
          }
        }
      )
    }
  },
  methods: {
    valueToLabel (value) {
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
      if (typeof value === 'string' && value.length > 0) {
        for (const v of this.optionsTranslated) {
          if (v.value === value) {
            return v.label
          }
        }
      }
      return value
    }
  }
}
</script>
