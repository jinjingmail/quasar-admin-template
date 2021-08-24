<!--
  co-list 组件
-->
<template>
  <q-list
    ref="list"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-list"
    :dense="_dense()"
    >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
  </q-list>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoList',
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
