<template>
  <q-layout :class="{'layout-user-container':pageBgImage}" class="custom-page-bg">
    <q-page-container>
      <router-view class="coadmin-page" />
    </q-page-container>
    <q-footer
      bordered
      class="flex items-center justify-between footer custom-page-bg"
      :class="$q.dark.isActive?'text-white':'text-dark'"
    >
      <div>
        <span>© 2020 Company</span>
        <span class="q-ml-sm">Created by Jinjin</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginLayout',
  computed: {
    ...mapGetters('settings', [
      'pageBgImage'
    ])
  }
}
</script>

<style lang="sass" scoped>
.layout-user-container
  background-image: url(~assets/index.svg)
  background-repeat: no-repeat
  background-position: center 0px
  background-size: 100%
.footer
  font-size: 10px
  letter-spacing: .3px
  padding: 15px 25px
  text-transform: uppercase
</style>
