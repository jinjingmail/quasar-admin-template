<!--
  co-btn 组件
-->
<template>
  <q-btn
    ref="btn"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-btn"
    :dense="_dense()"
    >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
  </q-btn>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoBtn',
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

    click(evt) {
      this.$refs.btn.click(evt)
    }
  }
}
</script>
