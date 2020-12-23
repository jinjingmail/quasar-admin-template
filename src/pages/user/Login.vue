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
            <q-avatar :size="$q.screen.gt.xs?'100px':'80px'">
              <q-img src="~assets/logo.svg" />
            </q-avatar>
          </div>
          <div class="text-h5 text-primary q-mb-xs">登录</div>
          <coadmin-form
            @submit="onSubmit"
            class="login-form my-form q-mt-lg"
          >
            <coadmin-input
              class="q-mb-md"
              outlined
              dense
              no-error-icon
              v-model.trim="form.username"
              placeholder="账号 admin"
              :rules="[ val => val && val.length > 0 || '请输入用户账号']"
            />
            <coadmin-input
              class="q-mb-md"
              outlined
              dense
              no-error-icon
              type="password"
              v-model.trim="form.password"
              placeholder="密码 123456"
              :rules="[ val => val && val.length > 0 || '请输入登录密码']"
            />
            <coadmin-input
              class="q-mb-md"
              outlined
              dense
              no-error-icon
              v-model.trim="form.verify"
              placeholder="验证码"
              :rules="[ val => val && val.length > 0 || '请输入验证码']"
            >
              <template v-slot:after>
                <img src="data:image/png;base64,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"/>
              </template>
            </coadmin-input>
            <div class="column q-gutter-y-sm q-mt-none">
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
          </coadmin-form>

          <q-toolbar class="no-padding">
            <q-toggle :value="$q.dark.isActive" :val="true" label="DARK" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
          </q-toolbar>
          <q-toolbar class="no-padding">
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
import Cookies from 'js-cookie'
import BrandColor from 'components/BrandColor.vue'
import { random } from '@/utils/index'

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
    this.imgsrc = 'img/nature-' + (random() % 8) + '.jpg'
    // token 过期提示
    this.point()
  },
  computed: {
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
    },
    point() {
      const point = Cookies.get('point') !== undefined
      if (point) {
        this.$q.notify({
          type: 'warning',
          message: '当前登录状态已过期，请重新登录！',
          timeout: 5000,
          position: 'top'
        })
        Cookies.remove('point')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.login-wrapper, login-form
  width: 840px
  min-width: 260px
@media (max-width: 1023px)
  .login-wrapper, login-form
    width: 94%
@media (max-width: 599px)
  .q-pa-xl
    padding: 15px
</style>
