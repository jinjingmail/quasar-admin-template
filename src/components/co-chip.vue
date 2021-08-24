<!--
  co-chip 组件
-->
<template>
  <q-chip
    ref="chip"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-chip"
    :dense="_dense()"
    :outline="_outline()"
    :square="_square()"
    >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
  </q-chip>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoChip',
  inheritAttrs: false,
  props: {
    dense: {
      type: Boolean,
      default: undefined
    },
    outline: {
      type: Boolean,
      default: undefined
    },
    square: {
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
    _outline() {
      const undef = this.outline === undefined
      if (!undef) {
        return this.outline
      }
      if (Setting.btnDesignMode === 'outline') {
        return true
      } else {
        return false
      }
    },
    _square() {
      const undef = this.rounded === undefined
      if (!undef) {
        return this.square
      }
      if (Setting.btnDesignCorner === 'square') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
