<template>
  <q-page class="row items-center justify-center">
    <q-card
      class="login-wrapper shadow-24"
      :bordered="false"
    >
      <!-- https://placeimg.com/430/500/nature -->
      <q-card-section horizontal>
        <q-img
          class="col-6"
          :src="imgsrc"
          v-if="$q.screen.gt.xs"
        >
          <div class="absolute-bottom-left text-subtitle2 text-center">
            {{$q.version}}
          </div>
        </q-img>

        <q-card-section :class="`${$q.screen.gt.xs?'col-6':'col'} q-mt-xs q-px-xl q-py-md`">
          <div class="flex flex-center">
            <q-avatar size="120px">
              <q-img src="~assets/logo.svg" />
            </q-avatar>
          </div>
          <div class="text-h5 text-primary q-mb-xs">登录</div>
          <q-form
            @submit="onSubmit"
            class="login-form my-form q-mt-lg"
          >
            <q-input
              outlined
              dense
              no-error-icon
              v-model.trim="form.username"
              placeholder="账号"
              :rules="[ val => val && val.length > 0 || '请输入用户账号']"
            />
            <q-input
              outlined
              dense
              no-error-icon
              type="password"
              v-model.trim="form.password"
              placeholder="密码"
              :rules="[ val => val && val.length > 0 || '请输入登录密码']"
            />
            <div class="column q-gutter-y-md q-mt-none">
              <q-checkbox
                v-model="form.rememberMe"
                label="记住账号"
                dense
              />
            </div>
            <div class="q-mt-md column items-center">
              <q-btn
                label="登录"
                type="submit"
                color="primary"
                class="full-width"
              />
              <div class="q-mt-md">如果还没有账号？<router-link
                  to="/user/register"
                  class="text-primary"
                >点击注册</router-link>
              </div>
            </div>
          </q-form>

          <q-toolbar class="no-padding">
            <q-toggle :value="$q.dark.isActive" :val="true" label="DARK" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
             <q-space />
            <brand-color />
          </q-toolbar>
        </q-card-section>
      </q-card-section>

      <q-inner-loading :showing="loading">
        <q-spinner-hourglass
          size="sm"
          color="primary"
        />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import BrandColor from 'components/BrandColor.vue'
import random from '../../utils'

export default {
  components: {
    BrandColor
  },
  name: 'UserLogin',
  data () {
    return {
      imgsrc: '',
      loading: false,
      form: {
        username: '',
        password: '',
        rememberMe: false
      }
    }
  },
  created () {
    this.imgsrc = '/img/nature-' + (random() % 8) + '.jpg'
  },
  computed: {
    loginImage () {
      return 'assets/img/nature-3.jpg'
    }
  },
  methods: {
    ...mapActions('settings', [
      'changeSetting'
    ]),
    onSubmit () {
      this.loading = true
      this.$store.dispatch('user/login', this.form).then(() => {
        this.loading = false
        const params = { redirect: this.$route.query.redirect || '/' }
        this.$router.push({ path: params.redirect })
      }).catch(e => {
        this.loading = false
        const message = e.message || '登录失败，请稍后重试！'
        this.$q.notify({ message })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.login-wrapper, login-form
  width: 840px
@media (max-width: 1023px)
  .login-wrapper, login-form
    width: 94%
@media (max-width: 599px)
  .q-pa-xl
    padding: 15px
</style>
