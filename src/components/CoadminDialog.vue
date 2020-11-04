<template>
  <q-dialog
      :content-class="contentClass"
      :maximized="maxscreen"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <q-card style="" class="">
      <q-card-section class="no-padding">
        <q-toolbar>
          <q-toolbar v-if="draggable" v-drag="{selectorTrim: ' > div > div > div', dragOutY:40}">
            <q-avatar>
              <q-icon :name="icon"/>
            </q-avatar>
            <q-toolbar-title><div>{{title}}</div></q-toolbar-title>
          </q-toolbar>
          <template v-else>
            <q-avatar>
              <q-icon :name="icon"/>
            </q-avatar>
            <q-toolbar-title><div>{{title}}</div></q-toolbar-title>
          </template>

          <q-btn flat round dense :icon="maxscreen?'fullscreen_exit':'fullscreen'" @click="maxscreen = !maxscreen"/>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
      </q-card-section>

      <slot>
      </slot>

    </q-card>
  </q-dialog>
</template>

<script>
/*
 * 重新定义QDialog组件，主要是为了增加拖拽功能，和默认标题栏
 */
export default {
  name: 'CoadminDialog',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    draggable: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: undefined
    },
    maximized: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: String,
      default: 'coadmin-dialog'
    }
  },
  data () {
    return {
      maxscreen: this.maximized
    }
  }
}
</script>
