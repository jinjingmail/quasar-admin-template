<template>
  <div class="row no-wrap q-pa-sm">
    <div class="column">
      <slot />
      <template v-if="!noFullscreen && tableSlotTopProps && tableSlotTopProps.inFullscreen != undefined">
        <q-btn flat label="全屏" align="left" :icon="tableSlotTopProps.inFullscreen?'fullscreen_exit':'fullscreen'" @click.native="toggleTableFullscreen(tableSlotTopProps)"/>
        <q-separator/>
      </template>

      <q-toggle v-model="crud.visibleColumns" v-for="item in crud.columns" :key="item.name"
        :val="item.name" :label="item.label" :disable="item.required"/>
    </div>
  </div>
</template>
<script>
import { crud } from './crud'

export default {
  mixins: [crud()],
  props: {
    tableSlotTopProps: Object,
    noFullscreen: Boolean
  },
  data () {
    return {
    }
  },
  methods: {
    toggleTableFullscreen (props) {
      props.toggleFullscreen()
      this.$nextTick(() => {
      })
    }
  }
}
</script>
