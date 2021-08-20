<!--
  co-slider 组件
-->
<template>
  <q-slider
    ref="slider"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-slider"
    :dense="_dense()"
    >
    <slot />
  </q-slider>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoSlider',
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
      this.$refs.slider.input(value)
    },
    change (value) {
      this.$refs.slider.change(value)
    },
    pan (phase) {
      this.$refs.slider.pan(phase)
    }
  }
}
</script>
