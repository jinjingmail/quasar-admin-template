<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'

import drag from './utils/vue-dragdrag'
Vue.directive('drag', drag)

export default {
  name: 'App'
}
</script>
