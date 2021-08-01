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
        <q-btn flat :label="labelFullscreen" align="left"
          :dense="_dense()"
          :icon="tableSlotTopProps.inFullscreen?iconFullscreenExit:iconFullscreen"
          @click.native="toggleTableFullscreen(tableSlotTopProps)"/>
        <q-separator/>
      </template>

      <q-toggle v-model="crud.visibleColumns" :dense="_dense()" v-for="item in crud.columns" :key="item.name"
        :val="item.name" :label="getLabel(item.label)" :disable="item.required" :style="_dense()?'padding:3px 0':''"/>

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
