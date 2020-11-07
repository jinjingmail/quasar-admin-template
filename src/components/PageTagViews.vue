<template>
  <q-tabs
    v-model="currentTab"
    dense
    align="left"
    inline-label
    class="bg-white text-teal"
  >
    <q-tab
      v-for="(tab,index) in visitedViews"
      ref="tag"
      :key="index"
      :name="tab.path"
      :class="{'bg-blue-1 text-primary':isActive(tab)}"
    >
      <div class="row items-center">
        <span class="q-mr-xs">{{tab.title}}</span>
        <q-btn v-if="!isAffix(tab)" @click.stop="closeTab(tab.path)" icon="close" flat size="8px" round/>
      </div>
    </q-tab>
  </q-tabs>
</template>

<script>
import path from 'path'
import routes from '../router/routes.js'

export default {
  name: 'PageTagViews',
  data () {
    return {
      currentTab: 'index'
    }
  },
  mounted () {
    this.initTags()
    this.addTags()
    this.moveToCurrentTag()
  },
  watch: {
    $route () {
      this.addTags()
      this.moveToCurrentTag()
    },
    currentTab (value) {
      console.log('watch.currentTab:' + value)
      if (!value) {
        return
      }
      if (this.$route.path !== value) {
        this.$router.push({ path: value })
      }
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagviews.visitedViews
    },
    routes () {
      return routes
    }
  },
  methods: {
    initTags () {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagviews/addVisitedView', tag)
        }
      }
    },
    addTags () {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagviews/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag () {
      this.currentTab = this.$route.path
    },
    closeTab (path) {
      this.$q.notify({
        type: 'warning',
        title: '提示',
        message: '待续'
      })
    },
    isActive (tab) {
      return tab.path === this.$route.path
    },
    isAffix (tab) {
      return tab.affix
    },
    filterAffixTags (routes, basePath = '/') {
      console.log('filterAffixTags:' + basePath)
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            // fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children && route.children.length >= 1) {
          const tempTags = this.filterAffixTags(route.children, path.resolve(basePath, route.path))
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    }
  }
}
</script>
