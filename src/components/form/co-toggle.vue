<!--
  co-toggle 组件
-->
<template>
  <q-toggle
    ref="toggle"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-toggle"
    :dense="_dense()"
    >
      <slot />
  </q-toggle>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoToggle',
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
      this.$refs.toggle.toggle()
    }
  }
}
</script>
