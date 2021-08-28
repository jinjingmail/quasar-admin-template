<!--
  co-time 组件
-->
<template>
  <q-time
    ref="time"
    v-bind="$attrs"
    v-on="$listeners"
    class="co-time"
    >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
  </q-time>
</template>

<script>

export default {
  name: 'CoTime',
  inheritAttrs: false,
  props: {
  },
  methods: {
    setNow () {
      this.$refs.time.setNow()
    }
  }
}
</script>
