<!--
  co-radio 组件
-->
<template>
  <q-radio
    ref="radio"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-radio"
    :dense="_dense()"
    >
      <slot />
  </q-radio>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoRadio',
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

    set() {
      this.$refs.radio.set()
    }
  }
}
</script>
