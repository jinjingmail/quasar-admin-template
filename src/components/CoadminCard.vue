<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <q-card
    ref="card"
    v-bind="$attrs"
    v-on="$listeners"
    class="coadmin-card custom-other-bg"
    >
    <slot />
  </q-card>
</template>

<script>
export default {
  name: 'CoadminCard',
  inheritAttrs: false,
  props: {
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
