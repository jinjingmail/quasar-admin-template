<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label :class="{'dense':_dense(), 'ellipsis-2-lines':!noEllipsis}"
      class="non-selectable"
      :style="computedLabelStyle">
      <slot name="form-label"><span style="color:red" v-if="rules && rules.length > 0">* </span>{{formLabel}}</slot>
    </label>
    <div class="col co-form-item">
      <slot />
    </div>
  </div>
  <div v-else
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script>
import defaultSetting from '@/default-setting'

import FormMixin from './form-mixin.js'
export default {
  name: 'CoFormItem',
  inheritAttrs: false,
  mixins: [FormMixin],
  props: {
    rules: Array
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    _dense() {
      if (this.dense === undefined) {
        return defaultSetting.denseMode
      } else {
        return this.dense
      }
    }
  }
}
</script>
