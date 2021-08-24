<!--
  co-item 组件
-->
<template>
  <q-item
    ref="item"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-item"
    :dense="_dense()"
    >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
  </q-item>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoItem',
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
    }
  }
}
</script>
