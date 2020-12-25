// import something here
import { LoadingBar } from 'quasar'
import Setting from '@/default-setting'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ app, router, store, Vue }) => {
  // Check for protected and guest routes and perform checks
  router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title + ' - ' + Setting.title
    }
    LoadingBar.start()
    const protectedRoute = to.matched.some(route => route.meta.auth)
    // Allow guest routes
    if (!protectedRoute) return next()

    // If auth is required and the user is logged in, verify the token...
    if (store.getters['user/isAuthed']) {
      return store.dispatch('user/validate').then(user => {
        user ? next() : next({ name: 'user-login', query: { redirect: to.fullPath } })
        LoadingBar.stop()
      })
    }
    next({ name: 'user-login', query: { redirect: to.fullPath } })
    LoadingBar.stop()
  })

  router.afterEach(() => {
    LoadingBar.stop()
  })
}
