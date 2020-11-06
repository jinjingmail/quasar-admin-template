<template>
  <q-dialog
      :content-class="customContentClass()"
      :maximized="maxscreen"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <q-card :style="contentStyle">
      <q-card-section class="no-padding">
        <q-toolbar>
          <q-toolbar v-if="draggable" v-drag="{selectorTrim: ' > div > div > div', dragOutY:40}">
            <slot name="header_left">
              <q-avatar>
                <q-icon :name="icon"/>
              </q-avatar>
              <q-toolbar-title><div>{{title}}</div></q-toolbar-title>
            </slot>
          </q-toolbar>
          <template v-else>
            <slot name="header_left">
              <q-avatar>
                <q-icon :name="icon"/>
              </q-avatar>
              <q-toolbar-title><div>{{title}}</div></q-toolbar-title>
            </slot>
          </template>

          <slot name="header_right_prepend"></slot>
          <slot name="header_right">
            <q-btn v-if="maxable" flat round dense :icon="maxscreen?icon_max_exit:icon_max" @click="maxscreen = !maxscreen"/>
            <q-btn v-if="icon_close" flat round dense :icon="icon_close" v-close-popup />
          </slot>
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
    icon_close: {
      type: String,
      default: 'close'
    },
    icon_max: {
      type: String,
      default: 'fullscreen'
    },
    icon_max_exit: {
      type: String,
      default: 'fullscreen_exit'
    },
    maximized: {
      type: Boolean,
      default: false
    },
    maxable: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: String,
      default: 'coadmin-dialog'
    },
    contentStyle: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      maxscreen: this.maximized
    }
  },
  methods: {
    customContentClass () {
      if (!this.contentClass) {
        return 'coadmin-dialog'
      }
      if (this.contentClass.indexOf('coadmin-dialog') < 0) {
        return 'coadmin-dialog ' + this.contentClass
      } else {
        return this.contentClass
      }
    }
  }
}
</script>
