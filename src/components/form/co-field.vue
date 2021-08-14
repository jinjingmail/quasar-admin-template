<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label inline no-wrap items-center">
    <label :class="{'dense':_dense(), 'ellipsis-2-lines':!noEllipsis}"
      class="non-selectable"
      :style="computedLabelStyle">
      <slot name="form-label col-auto"><span style="color:red" v-if="rules && rules.length > 0">* </span>{{formLabel}}</slot>
    </label>
    <q-field
      ref="field"
      class="col co-field"
      :style="contentStyle"
      v-bind="$attrs"
      v-on="listeners"
      :dense="_dense()"
      :disable="disable"
      :readonly="readonly"
      :filled="_filled()"
      :outlined="_outlined()"
      :standout="_standout()"
      :borderless="_borderless()"
      :square="_square()"
      :rounded="_rounded()"
      :rules="rules"
      :no-error-icon="noErrorIcon"
    >
      <template v-slot:control="prop">
        {{prop.value}}
      </template>
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName"/>
      </template>
      <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
        <slot :name="slotName" v-bind="prop"/>
      </template>
    </q-field>
  </div>
  <q-field v-else
    ref="field"
    class="co-field"
    :class="computedClass"
    :style="contentStyle"
    v-bind="$attrs"
    v-on="listeners"
    :dense="_dense()"
    :disable="disable"
    :readonly="readonly"
    :filled="_filled()"
    :outlined="_outlined()"
    :standout="_standout()"
    :borderless="_borderless()"
    :square="_square()"
    :rounded="_rounded()"
    :rules="rules"
    :no-error-icon="noErrorIcon"
  >
    <template v-slot:control="prop">
      {{prop.value}}
    </template>
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
      <slot :name="slotName" v-bind="prop"/>
    </template>
  </q-field>

</template>

<script>
import defaultSetting from '@/default-setting'

import FormMixin from './form-mixin.js'
export default {
  name: 'CoField',
  inheritAttrs: false,
  mixins: [FormMixin],
  props: {
    rules: Array,
    filled: {
      type: Boolean,
      default: undefined
    },
    outlined: {
      type: Boolean,
      default: undefined
    },
    standout: {
      type: Boolean,
      default: undefined
    },
    borderless: {
      type: Boolean,
      default: undefined
    },
    square: {
      type: Boolean,
      default: undefined
    },
    rounded: {
      type: Boolean,
      default: undefined
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
            if (!vm.disable && !vm.readonly) {
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
    _filled() {
      const undef = this.filled === undefined && this.outlined === undefined && this.standout === undefined && this.borderless === undefined
      if (!undef) {
        return this.filled
      }
      if (defaultSetting.inputDesignMode === 'filled') {
        return true
      } else {
        return false
      }
    },
    _outlined() {
      const undef = this.filled === undefined && this.outlined === undefined && this.standout === undefined && this.borderless === undefined
      if (!undef) {
        return this.outlined
      }
      if (defaultSetting.inputDesignMode === 'outlined') {
        return true
      } else {
        return false
      }
    },
    _standout() {
      const undef = this.filled === undefined && this.outlined === undefined && this.standout === undefined && this.borderless === undefined
      if (!undef) {
        return this.standout
      }
      if (defaultSetting.inputDesignMode === 'standout') {
        return true
      } else {
        return false
      }
    },
    _borderless() {
      const undef = this.filled === undefined && this.outlined === undefined && this.standout === undefined && this.borderless === undefined
      if (!undef) {
        return this.borderless
      }
      if (defaultSetting.inputDesignMode === 'borderless') {
        return true
      } else {
        return false
      }
    },
    _square() {
      const undef = this.square === undefined && this.rounded === undefined
      if (!undef) {
        return this.square
      }
      if (defaultSetting.inputDesignCorner === 'square') {
        return true
      } else {
        return false
      }
    },
    _rounded() {
      const undef = this.square === undefined && this.rounded === undefined
      if (!undef) {
        return this.rounded
      }
      if (defaultSetting.inputDesignCorner === 'rounded') {
        return true
      } else {
        return false
      }
    },
    _dense() {
      if (this.dense === undefined) {
        return defaultSetting.denseMode
      } else {
        return this.dense
      }
    },

    resetValidation () {
      this.$refs.field.resetValidation()
    },
    validate (value) {
      return this.$refs.field.validate(value)
    },
    focus () {
      this.$refs.field.focus()
    },
    blur () {
      this.$refs.field.blur()
    }
  }
}
</script>
