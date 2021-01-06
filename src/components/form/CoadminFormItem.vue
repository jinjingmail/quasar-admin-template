<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label :class="{'dense':dense, 'ellipsis-2-lines':!noEllipsis}"
      :style="computedLabelStyle">
      <slot name="form-label"><template v-if="rules && rules.length > 0">* </template>{{formLabel}}</slot>
    </label>
    <div class="col coadmin-form-item">
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
import formMixin from './formMixin.js'
export default {
  name: 'CoadminFormItem',
  inheritAttrs: false,
  mixins: [formMixin],
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
  }
}
</script>
