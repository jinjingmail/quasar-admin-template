<!--
  co-btn-dropdown 组件
-->
<template>
  <q-btn-dropdown
    ref="btnDropdown"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-btn-dropdown"
    :dense="_dense()"
    >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
  </q-btn-dropdown>
</template>

<script>
import Setting from '@/default-setting'

export default {
  name: 'CoBtnDropdown',
  inheritAttrs: false,
  props: {
    dense: {
      type: Boolean,
      default: undefined
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

    show(evt) {
      this.$refs.btnDropdown.show(evt)
    },
    hide(evt) {
      this.$refs.btnDropdown.hide(evt)
    },
    toggle(evt) {
      this.$refs.btnDropdown.toggle(evt)
    }
  }
}
</script>
