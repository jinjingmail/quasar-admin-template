<!--
  增加插槽：
    loading
    header_left
    header_right
    header_right_prepend   在最大化和删除按钮之前
  增加属性：
    参考 props 定义
    loading
    loading-delay       多少ms后开始显示 loading 状态
    loading-spinner     '', 'cycle', 'gears', 'ios', 'ball', 'dots' 【提示：loading-spinner=''，则使用默认loading】
    no-header
    no-drag
    no-max
    no-min
    no-close
    close-method
    icon
    content-class
    content-style
    card-class
    card-style
    ...
-->
<template>
  <q-dialog
    ref="dialog"
    :content-class="'co-dialog ' + contentClass"
    :content-style="contentStyle"
    :maximized="maxscreen"
    v-bind="$attrs"
    v-on="$listeners"
    @before-show="_beforeShow"
  >
    <q-card ref="card" :style="computedCardStyle" :class="computedCardClass" :id="uuid"
      :loading="loading" :loading-spinner="loadingSpinner" :loading-delay="loadingDelay">
      <q-card-section v-if="!noHeader" class="no-padding">
        <q-toolbar>
          <q-toolbar v-if="!noDrag && !maxscreen" key="drag" v-drag="{moveElId: uuid, dragOutY:40}" class="q-pl-none cursor-move">
            <slot name="header_left">
              <q-avatar v-if="!!icon">
                <q-icon :name="icon"/>
              </q-avatar>
              <div class="text-subtitle1 non-selectable">{{title}}</div>
            </slot>
          </q-toolbar>
          <q-toolbar v-else class="q-pl-none" key="no-drag">
            <slot name="header_left">
              <q-avatar v-if="!!icon">
                <q-icon :name="icon"/>
              </q-avatar>
              <div class="text-subtitle1 non-selectable">{{title}}</div>
            </slot>
          </q-toolbar>

          <slot name="header_right_prepend"></slot>
          <slot name="header_right">
            <co-btn dense padding="xs sm" v-if="!noMin" flat
              :icon="minimize?'expand_more':'expand_less'"
              @click="toggleMinimize()"/>

            <co-btn dense padding="xs sm" v-if="!noMax" flat
              :icon="maxscreen?icon_max_exit:icon_max"
              @click="toggleMaxScreen()"/>

            <co-btn dense padding="xs sm" v-if="!noClose" flat
              :icon="icon_close?icon_close:'close'"
              @click="closeMethod?closeMethod():$refs.dialog.hide()"/>
          </slot>
        </q-toolbar>
      </q-card-section>

      <slot  v-if="!minimize"/>

    </q-card>
  </q-dialog>
</template>

<script>
import { random } from '@/utils/index'
import Setting from '@/default-setting'

export default {
  name: 'CoDialog',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: Boolean,
    loadingSpinner: {
      type: String,
      validator: v => ['', 'cycle', 'gears', 'ios', 'ball', 'dots'].includes(v)
    },
    loadingDelay: Number,

    noHeader: Boolean,
    noClose: Boolean,
    noMin: Boolean,
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
      default: ''
    },
    contentStyle: {
      type: String,
      default: ''
    },
    cardClass: {
      type: String,
      default: ''
    },
    cardStyle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      uuid: '',
      minimize: false,
      maxscreen: null,
      tempStyleWidth: null,
      tempStyleMaxWidth: null,
      tempStyleHeight: null,
      tempStyleMaxHeight: null,
      tempStyleLeft: null,
      tempStyleTop: null
    }
  },
  computed: {
    settingDialogClass () {
      if (this.$q.screen.gt.xs) {
        return Setting.dialogClass
      } else {
        return Setting.dialogClassMobile
      }
    },
    settingDialogStyle () {
      if (this.$q.screen.gt.xs) {
        return Setting.dialogStyle
      } else {
        return Setting.dialogStyleMobile
      }
    },
    computedCardClass () {
      return this.settingDialogClass + ' ' + this.cardClass
    },
    computedCardStyle () {
      if (this.settingDialogStyle && this.cardStyle) {
        return this.settingDialogStyle + ';' + this.cardStyle
      } else if (this.cardStyle) {
        return this.cardStyle
      } else if (this.settingDialogStyle) {
        return this.settingDialogStyle
      } else {
        return ''
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
    _dense() {
      if (this.dense === undefined) {
        return Setting.denseMode
      } else {
        return this.dense
      }
    },
    _beforeShow (evt) {
      if (this.$listeners['before-show']) {
        this.$emit('before-show')
      }
      this.$nextTick(() => {
        if (this.maxscreen) {
          this._toMaxScreen()
        } else if (this.tempStyleWidth) {
          //this._toNormalScreen()
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
      this.tempStyleHeight = this.$refs.card.$el.style.height
      this.tempStyleMaxHeight = this.$refs.card.$el.style.maxHeight
      this.tempStyleLeft = this.$refs.card.$el.style.left
      this.tempStyleTop = this.$refs.card.$el.style.top
      this.$refs.card.$el.style.width = '100%'
      this.$refs.card.$el.style.maxWidth = '100vw'
      this.$refs.card.$el.style.height = '100%'
      this.$refs.card.$el.style.maxHeight = '100vh'
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
      if (this.tempStyleHeight) {
        this.$refs.card.$el.style.height = this.tempStyleHeight
      } else {
        this.$refs.card.$el.style.height = ''
      }
      if (this.tempStyleMaxHeight) {
        this.$refs.card.$el.style.maxHeight = this.tempStyleMaxHeight
      } else {
        this.$refs.card.$el.style.maxHeight = ''
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
        this.minimize = false
        this._toMaxScreen()
      }
      this.maxscreen = !this.maxscreen
    },
    toggleMinimize () {
      this.minimize = !this.minimize
    }
  }
}
</script>

<style scoped>
  .cursor-move {
    cursor: move;
  }
</style>
