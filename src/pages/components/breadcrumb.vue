<template>
  <q-breadcrumbs class="q-ml-md">
    <template v-for="(item, index) in levelList">
      <q-breadcrumbs-el v-if="!mobileLess || $q.screen.gt.xs || index === levelList.length - 1"
        :key="item.path"
        :label="item.meta.title"
        @click.native="handleLink(item, index)"
        />
    </template>
  </q-breadcrumbs>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'
export default {
  props: {
    mobileLess: Boolean
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'index'
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item, index) {
      if (item.redirect === 'noredirect' || index === this.levelList.length - 1) {
        return
      }
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>
