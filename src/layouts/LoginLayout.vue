<template>
  <q-layout class="layout-user-container">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      class="flex items-center justify-between footer"
    >
      <div>
        <span>© 2020 Quasar v{{$q.version}}.</span>
        <span class="q-ml-sm">Created by xxx</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'LoginLayout'
}
</script>

<style lang="sass" scoped>
.layout-user-container
  background-image: url("~assets/index.svg");
  background-repeat: no-repeat;
  background-position: center 0px;
  background-size: 100%;
.footer
  font-size: 10px;
  letter-spacing: .3px;
  padding: 15px 25px;
  text-transform: uppercase;
</style>
