<template>
  <q-page class="flex flex-center">
    <p>欢迎 {{username}}</p>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageNeedLogin',
  computed: {
    ...mapGetters('user', [
      'username'
    ])
  }
}
</script>
