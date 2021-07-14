<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <q-form
    ref="form"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-form"
    :class="computedClass"
  >
    <slot />
  </q-form>
</template>

<script>
import FormMixin from './form-mixin.js'

export default {
  name: 'CoForm',
  inheritAttrs: false,
  mixins: [FormMixin],
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
    validate (shouldFocus) {
      return this.$refs.form.validate(shouldFocus)
    },
    submit (evt) {
      this.$refs.form.submit(evt)
    },
    reset (evt) {
      this.$refs.form.reset(evt)
    },
    getValidationComponents () {
      return this.$refs.form.getValidationComponents()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    focus () {
      this.$refs.form.focus()
    }
  }
}
</script>
