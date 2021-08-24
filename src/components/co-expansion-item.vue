<!--
  co-expansion-item 组件
-->
<template>
  <q-expansion-item
    ref="expansionItem"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-expansion-item"
    :dense="_dense()"
    >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
  </q-expansion-item>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoExpansionItem',
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
