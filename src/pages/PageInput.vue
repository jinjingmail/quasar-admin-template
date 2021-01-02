<template>
  <div class="">
    <coadmin-card class="q-ma-none q-pa-md q-gutter-md">
      <q-input dense :value="model" outlined @input="_input" placeholder="输入值"/>
      <div>当前值：{{model}}</div>
    </coadmin-card>
  </div>
</template>

<script>

export default {
  name: 'PageInput',
  data () {
    return {
      model: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.model = '559'
    }, 2000)
  },
  computed: {
  },
  watch: {
    model (newVal, old) {
      console.log('watch model:', newVal, old)
    }
  },
  methods: {
    _input(value) {
      console.log('input:', value)
      this.model = value
    }
  }
}
</script>
