<!--
  co-pagination 组件
-->
<template>
  <q-pagination
    ref="pagination"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-pagination"
    :dense="_dense()"
    :flat="_flat()"
    :outline="_outline()"
    :push="_push()"
    :unelevated="_unelevated()"
    :rounded="_rounded()"
    />
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoPagination',
  inheritAttrs: false,
  props: {
    dense: {
      type: Boolean,
      default: undefined
    },
    flat: {
      type: Boolean,
      default: undefined
    },
    outline: {
      type: Boolean,
      default: undefined
    },
    push: {
      type: Boolean,
      default: undefined
    },
    unelevated: {
      type: Boolean,
      default: undefined
    },
    square: {
      type: Boolean,
      default: undefined
    },
    rounded: {
      type: Boolean,
      default: undefined
    },
    round: {
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
    // 当前 flat 模式有bug，先禁用这个模式
    _flat() {
      const undef = this.flat === undefined && this.outline === undefined && this.push === undefined && this.unelevated === undefined
      if (!undef) {
        //return this.flat
        return undefined
      }
      if (Setting.btnDesignMode === 'flat') {
        //return true
        return false
      } else {
        return false
      }
    },
    _outline() {
      const undef = this.flat === undefined && this.outline === undefined && this.push === undefined && this.unelevated === undefined
      if (!undef) {
        return this.outline
      }
      if (Setting.btnDesignMode === 'outline') {
        return true
      } else {
        return false
      }
    },
    _push() {
      const undef = this.flat === undefined && this.outline === undefined && this.push === undefined && this.unelevated === undefined
      if (!undef) {
        return this.push
      }
      if (Setting.btnDesignMode === 'push') {
        return true
      } else {
        return false
      }
    },
    _unelevated() {
      const undef = this.flat === undefined && this.outline === undefined && this.push === undefined && this.unelevated === undefined
      if (!undef) {
        return this.unelevated
      }
      if (Setting.btnDesignMode === 'unelevated') {
        return true
      } else {
        return false
      }
    },

    _square() {
      const undef = this.rounded === undefined && this.square === undefined
      if (!undef) {
        return this.square
      }
      if (Setting.btnDesignCorner === 'square') {
        return true
      } else {
        return false
      }
    },
    _rounded() {
      const undef = this.rounded === undefined && this.square === undefined
      if (!undef) {
        return this.rounded
      }
      if (Setting.btnDesignCorner === 'rounded') {
        return true
      } else {
        return false
      }
    },

    set(pageNumber) {
      this.$refs.pagination.click(pageNumber)
    },
    setByOffset (offset) {
      this.$refs.pagination.setByOffset(offset)
    }
  }
}
</script>
