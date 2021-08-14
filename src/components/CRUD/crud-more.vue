<!--
  插槽：
    start
    end
  属性：
    dense
    table-slot-top-props
    no-fullscreen
    icon-fullscreen
    icon-fullscreen-exit
    label-fullscreen
-->
<template>
  <div class="no-wrap q-pa-sm">
    <div class="column">
      <slot name="start"/>
      <template v-if="!noFullscreen && tableSlotTopProps && tableSlotTopProps.inFullscreen != undefined">
        <co-btn :label="labelFullscreen" align="left"
          flat
          :dense="_dense()"
          :icon="tableSlotTopProps.inFullscreen?iconFullscreenExit:iconFullscreen"
          @click.native="toggleTableFullscreen(tableSlotTopProps)"/>
        <q-separator/>
      </template>
      <co-checkbox v-model="crud.visibleColumns" v-for="item in crud.columns" :key="item.name" :dense="_dense()"
        :val="item.name" :label="getLabel(item.label)" :disable="item.required" style="margin:1px 6px"/>
      <slot name="end"/>
    </div>
  </div>
</template>
<script>
import { crud } from './crud'
import Setting from '@/default-setting'

export default {
  mixins: [crud()],
  props: {
    tableSlotTopProps: Object,
    noFullscreen: Boolean,
    dense: {
      type: Boolean,
      default: undefined
    },
    iconFullscreen: {
      type: String,
      default: 'fullscreen'
    },
    iconFullscreenExit: {
      type: String,
      default: 'fullscreen_exit'
    },
    labelFullscreen: {
      type: String,
      default: '全屏'
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
    getLabel (label) {
      if (label.length > 20) {
        return label.substr(0, 20) + '..'
      } else {
        return label
      }
    },
    toggleTableFullscreen (props) {
      props.toggleFullscreen()
      this.$nextTick(() => {
      })
    }
  }
}
</script>
