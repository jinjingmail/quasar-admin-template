<template>
  <div class="q-gutter-sm q-ma-none">
    <q-btn round style="background-color:#1976D2"
      @click="setBrand('#1976D2')" size="7px"/>
    <q-btn round style="background-color:brown"
      @click="setBrand('brown')" size="7px"/>
    <q-btn round style="background-color:teal"
      @click="setBrand('teal')" size="7px"/>
    <q-btn round style="background-color:#2b2b2b"
      @click="setBrand('#2b2b2b')" size="7px"/>
    <q-btn round style="background-color:rgb(212,0,212)"
      @click="setBrand('rgb(212,0,212)')" size="7px"/>
    <q-btn round style="background-color:#ff6a00"
      @click="setBrand('#ff6a00')" size="7px"/>
    <q-btn round style="background-color:rgb(0,161,80)"
      @click="setBrand('rgb(0,161,80)')" size="7px"/>
    <q-btn round color="cyan" label="M" @click="customColor()"
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
      this.changeSetting({ key: 'colorPrimary', value: color })
    },
    customColor () {
      this.color = colors.getBrand('primary')
    }
  }
}
</script>
