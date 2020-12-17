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
          :dense="dense"
          :icon="tableSlotTopProps.inFullscreen?iconFullscreenExit:iconFullscreen"
          @click.native="toggleTableFullscreen(tableSlotTopProps)"/>
        <q-separator/>
      </template>

      <q-toggle v-model="crud.visibleColumns" :dense="dense" v-for="item in crud.columns" :key="item.name"
        :val="item.name" :label="getLabel(item.label)" :disable="item.required"/>

      <slot name="end"/>
    </div>
  </div>
</template>
<script>
import { crud } from './crud'

export default {
  mixins: [crud()],
  props: {
    tableSlotTopProps: Object,
    noFullscreen: Boolean,
    dense: Boolean,
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
