<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label q-pt-sm">
    <label class="ellipsis" :class="{'dense':dense}"><slot name="form-label">{{formLabel}}</slot></label>
    <q-option-group
      ref="optionGroup"
      class="col q-pt-xs"
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
    ref="optionGroup"
    class="q-pt-sm"
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
      optionsTranslated: []
    }
  },
  created () {
    if (this.labelKey === 'label' && this.valueKey === 'value') {
      this.optionsTranslated = this.options
    } else {
      this.optionsTranslated = this.options.map(o => { return { label: o[this.labelKey], value: o[this.valueKey] } })
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
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import './form.scss'
</style>
