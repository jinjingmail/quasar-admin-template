// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ app, router, Vue }) => {
  // Check for protected and guest routes and perform checks
  router.beforeEach((to, from, next) => {
    const protectedRoute = to.matched.some(route => route.meta.auth)
    // Allow guest routes
    if (!protectedRoute) return next()

    // If auth is required and the user is logged in, verify the token...
    if (app.store.getters['user/isAuthed']) {
      return app.store.dispatch('user/validate').then(user => {
        user ? next() : next({ name: 'user-login', query: { redirect: to.fullPath } })
      })
    }
    next({ name: 'user-login', query: { redirect: to.fullPath } })
  })
}
