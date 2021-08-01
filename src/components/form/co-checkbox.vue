<!--
  co-checkbox 组件
-->
<template>
  <q-checkbox
    ref="checkbox"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-checkbox"
    :dense="_dense()"
    >
      <slot />
  </q-checkbox>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoCheckbox',
  inheritAttrs: false,
  props: {
    dense: {
      type: Boolean,
      default: undefined
    }
  },
  data () {
    return {
    }
  },
  methods: {
    _dense() {
      if (this.dense === undefined) {
        return Setting.denseMode
      } else {
        return this.dense
      }
    },

    toggle() {
      this.$refs.checkbox.toggle()
    }
  }
}
</script>
