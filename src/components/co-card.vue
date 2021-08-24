<!--
  增加插槽：
    loading
  增加属性：
    loading
    loading-delay       默认0；多少ms后开始显示 loading 状态
    loading-spinner     '', 'cycle', 'gears', 'ios', 'ball', 'dots' 【提示：loading-spinner=''，则使用默认loading】

-->
<template>
  <q-card
    ref="card"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-card custom-other-bg"
    :class="settingClass"
    :style="settingStyle"
    >
    <slot />
    <!-- loadingSpinner 明确为空，则忽略 -->
    <template v-if="showLoading && !!loadingSpinner">
      <slot name="loading">
        <q-inner-loading showing color="primary" style="z-index:5">
          <q-spinner-gears v-if="loadingSpinner === 'gears'" size="60px" color="primary" />
          <q-spinner-ios   v-else-if="loadingSpinner === 'ios'" size="60px" color="primary" />
          <q-spinner       v-else-if="loadingSpinner === 'cycle'" size="60px" color="primary" />
          <q-spinner-ball  v-else-if="loadingSpinner === 'ball'" size="60px" color="primary" />
          <q-spinner-dots  v-else-if="loadingSpinner === 'dots'" size="60px" color="primary" />
          <q-spinner-gears v-else size="60px" color="primary" />
        </q-inner-loading>
      </slot>
    </template>
  </q-card>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoCard',
  inheritAttrs: false,
  props: {
    loading: Boolean,
    loadingSpinner: {
      type: String,
      default: 'gears',
      validator: v => ['', 'cycle', 'gears', 'ios', 'ball', 'dots'].includes(v)
    },
    loadingDelay: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      showLoading: false
    }
  },
  created () {
    this.showLoading = this.loading
  },
  computed: {
    settingClass () {
      if (this.$q.screen.gt.xs) {
        return Setting.cardClass
      } else {
        return Setting.cardClassMobile
      }
    },
    settingStyle () {
      if (this.$q.screen.gt.xs) {
        return Setting.cardStyle
      } else {
        return Setting.cardStyleMobile
      }
    }

  },
  watch: {
    loading (valNew) {
      this.showLoading = false
      if (valNew) {
        if (this.loadingDelay <= 0) {
          this.showLoading = this.loading
        } else {
          setTimeout(() => {
            this.showLoading = this.loading
          }, this.loadingDelay)
        }
      }
    }
  }
}
</script>
