<!--
  重新定义QDialog组件，主要是为了增加拖拽功能，和默认标题栏
  增加插槽：
    header_left
    header_right
    header_right_prepend   在最大化和删除按钮之前
  增加属性：
    参考 props 定义
    no-toolbar
    no-drag
    no-max
    no-close
    close-method
    icon
    ...
-->
<template>
  <q-dialog
      ref="dialog"
      :content-class="customContentClass"
      :maximized="maxscreen"
      v-bind="$attrs"
      v-on="$listeners"
      @show="_beforeShow"
  >
    <q-card ref="card" :style="contentStyle" :id="uuid">
      <q-card-section v-if="!noToolbar" class="no-padding">
        <q-toolbar>
          <q-toolbar v-if="!noDrag" v-drag="{moveElId: uuid, dragOutY:40}" class="q-pl-none">
            <slot name="header_left">
              <q-avatar v-if="!!icon">
                <q-icon :name="icon"/>
              </q-avatar>
              <q-toolbar-title><div>{{title}}</div></q-toolbar-title>
            </slot>
          </q-toolbar>
          <template v-else>
            <slot name="header_left">
              <q-avatar v-if="!!icon">
                <q-icon :name="icon"/>
              </q-avatar>
              <q-toolbar-title><div>{{title}}</div></q-toolbar-title>
            </slot>
          </template>

          <slot name="header_right_prepend"></slot>
          <slot name="header_right">
            <q-btn v-if="!noMax" flat round dense :icon="maxscreen?icon_max_exit:icon_max" @click="toggleMaxScreen()"/>
            <q-btn v-if="!noClose" flat round dense :icon="icon_close?icon_close:'close'" @click="closeMethod?closeMethod():$refs.dialog.hide()"/>
          </slot>
        </q-toolbar>
      </q-card-section>

      <slot />

    </q-card>
  </q-dialog>
</template>

<script>
import random from '../utils'
// import { QDialog } from 'quasar'

export default {
  name: 'CoadminDialog',
  inheritAttrs: false,
  // mixins: [QDialog],
  props: {
    title: {
      type: String,
      default: ''
    },
    noToolbar: Boolean,
    noClose: Boolean,
    noDrag: Boolean,
    noMax: Boolean,
    maximized: {
      type: Boolean,
      default: false
    },
    closeMethod: Function,
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
      uuid: '',
      maxscreen: null,
      tempStyleWidth: null,
      tempStyleMaxWidth: null,
      tempStyleLeft: null,
      tempStyleTop: null
    }
  },
  computed: {
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
  },
  created () {
    this.uuid = 'id' + random()
  },
  mounted () {
    if (this.maxscreen === null) {
      this.maxscreen = this.maximized
    }
  },
  methods: {
    _beforeShow (evt) {
      this.$nextTick(function () {
        if (this.maxscreen) {
          this._toMaxScreen()
        } else if (this.tempStyleWidth) {
          this._toNormalScreen()
        }
      })
    },
    show (evt) {
      this.$refs.dialog.show(evt)
    },
    hide (evt) {
      this.$refs.dialog.hide(evt)
    },
    toggle (evt) {
      this.$refs.dialog.toggle(evt)
    },
    focus () {
      this.$refs.dialog.focus()
    },
    shake () {
      this.$refs.dialog.shake()
    },
    _toMaxScreen () {
      this.tempStyleWidth = this.$refs.card.$el.style.width
      this.tempStyleMaxWidth = this.$refs.card.$el.style.maxWidth
      this.tempStyleLeft = this.$refs.card.$el.style.left
      this.tempStyleTop = this.$refs.card.$el.style.top
      this.$refs.card.$el.style.width = '100%'
      this.$refs.card.$el.style.maxWidth = '100vw'
      this.$refs.card.$el.style.left = ''
      this.$refs.card.$el.style.top = ''
    },
    _toNormalScreen () {
      if (this.tempStyleWidth) {
        this.$refs.card.$el.style.width = this.tempStyleWidth
      } else {
        this.$refs.card.$el.style.width = ''
      }
      if (this.tempStyleMaxWidth) {
        this.$refs.card.$el.style.maxWidth = this.tempStyleMaxWidth
      } else {
        this.$refs.card.$el.style.maxWidth = ''
      }
      if (this.tempStyleLeft) {
        this.$refs.card.$el.style.left = this.tempStyleLeft
      } else {
        this.$refs.card.$el.style.left = ''
      }
      if (this.tempStyleTop) {
        this.$refs.card.$el.style.top = this.tempStyleTop
      } else {
        this.$refs.card.$el.style.top = ''
      }
    },
    toggleMaxScreen () {
      if (this.maxscreen) {
        this._toNormalScreen()
      } else {
        this._toMaxScreen()
      }
      this.maxscreen = !this.maxscreen
    }
  }
}
</script>
