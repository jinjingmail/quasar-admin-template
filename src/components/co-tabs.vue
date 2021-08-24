<!--
  co-tabs 组件
-->
<template>
  <q-tabs
    ref="tabs"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-tabs"
    :dense="_dense()"
    >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
  </q-tabs>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoTabs',
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
