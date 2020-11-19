<template>
  <div class="q-gutter-sm q-ma-none">
    <q-btn round style="background-color:#1976D2"
      @click="setBrand('#1976D2')" size="7px"/>
    <q-btn round color="brown"
      @click="setBrand('brown')" size="7px"/>
    <q-btn round color="teal"
      @click="setBrand('teal')" size="7px"/>
    <q-btn round style="background-color:#2b2b2b"
      @click="setBrand('#2b2b2b')" size="7px"/>
    <q-btn round color="indigo"
      @click="setBrand('indigo')" size="7px"/>
    <q-btn round style="background-color:#ff6a00"
      @click="setBrand('#ff6a00')" size="7px"/>
    <q-btn round color="green" icon="more_horiz" @click="customColor()"
      size="7px">
      <q-popup-proxy>
        <q-color v-model="color"/>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { colors } from 'quasar'
export default {
  name: 'BrandColor',
  data () {
    return {
      color: ''
    }
  },
  watch: {
    color (val) {
      this.setBrand(this.color)
    }
  },
  methods: {
    ...mapActions('settings', [
      'changeSetting'
    ]),
    setBrand (color) {
      colors.setBrand('primary', color)
      this.changeSetting({ key: 'colorPrimary', value: color })
    },
    customColor () {
      console.log('primary', colors.getBrand('primary'))
      this.color = colors.getBrand('primary')
    }
  }
}
</script>

<style lang="sass" scoped>
.skin-color
  padding: 8px
  border-radius: 50%
</style>
