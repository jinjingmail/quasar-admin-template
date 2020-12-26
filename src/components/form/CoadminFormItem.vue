<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label q-pt-sm">
    <label :class="{'dense':dense, 'ellipsis-2-lines':!noEllipsis}" :style="computedLabelStyle"><slot name="form-label">{{formLabel}}</slot></label>
    <div class="col">
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
