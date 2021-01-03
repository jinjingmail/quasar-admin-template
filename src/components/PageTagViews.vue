<template>
  <q-tabs
    v-model="currentTab"
    dense
    align="left"
    class="full-width"
    xxxxcontent-class="custom-table-bg"
    :breakpoint="0"
    :inline-label="true"
    outside-arrows
    :mobile-arrows="false"
    :switch-indicator="switchIndicator"
  >
    <q-tab
      v-for="(tab,index) in visitedViews"
      ref="tag"
      no-caps
      :key="index"
      :name="tab.path"
      @click.middle.native="!isAffix(tab)?closeTab(tab):''"
    >
      <div class="row items-center no-wrap">
        <span class="q-mr-xs">{{tab.title}}</span>
        <q-btn v-if="!isAffix(tab)" @click.stop="closeTab(tab)" icon="close" flat size="8px" round/>
      </div>
    </q-tab>
  </q-tabs>
</template>

<script>
import path from 'path'
import routes from '../router/routes.js'

export default {
  name: 'PageTagViews',
  props: {
    switchIndicator: {
      type: Boolean,
      default: false
    }
  },
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
    closeTab (tab) {
      let newPath = ''
      if (this.$route.path === tab.path) {
        const tabs = this.visitedViews
        tabs.forEach((item, index) => {
          if (this.$route.path === item.path) {
            if (index + 1 < tabs.length) {
              newPath = tabs[index + 1].path
            } else if (index - 1 >= 0) {
              newPath = tabs[index - 1].path
            } else {
              // nothing
            }
          }
        })
      }
      this.$store.dispatch('tagviews/delView', tab)
      if (newPath) {
        this.$router.push({ path: newPath })
      }
    },
    isActive (tab) {
      return tab.path === this.$route.path
    },
    isAffix (tab) {
      return tab.affix
    },
    filterAffixTags (routes, basePath = '/') {
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
