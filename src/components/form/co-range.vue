<!--
  co-range 组件
-->
<template>
  <q-range
    ref="range"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-range"
    :dense="_dense()"
    >
    <slot />
  </q-range>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoRange',
  inheritAttrs: false,
  props: {
    dense: {
      type: Boolean,
      default: undefined
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

    input (value) {
      this.$refs.range.input(value)
    },
    change (value) {
      this.$refs.range.change(value)
    },
    pan (phase) {
      this.$refs.range.pan(phase)
    }
  }
}
</script>
