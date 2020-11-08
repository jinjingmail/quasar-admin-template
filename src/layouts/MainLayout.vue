<template>
  <q-layout view="hHh Lpr lFf">
    <q-header reveal :elevated="false" class="coadmin-header">
      <q-toolbar class="">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="!$q.screen.gt.xs"
        />
        <q-avatar class="q-logo">
          <img src="~assets/logo.svg" />
        </q-avatar>
        <q-toolbar-title
          shrink
          class="text-bold logo-text-primary"
        >
          5G管理系统
          <span
            class="q-ml-xs"
            style="letter-spacing: 0.1em;font-size:12px;font-weight:500;"
          >v1.14.1</span>
        </q-toolbar-title>

        <q-separator vertical inset/>

        <q-breadcrumbs active-color="white" v-if="!$q.screen.xs">
          <q-breadcrumbs-el label="Home" icon="home" />
          <q-breadcrumbs-el label="Components" icon="widgets" />
          <q-breadcrumbs-el label="Breadcrumbs" />
        </q-breadcrumbs>

        <!-- 右侧工具栏 -->
        <q-space ></q-space>

        <q-separator vertical inset/>
        <q-tabs
          :breakpoint="0"
          align="justify"
          indicator-color="transparent"
          outside-arrows
        >
          <q-tab
            name="notifications"
            icon="notifications"
            v-if="!$q.screen.xs"
          >
            <q-badge
              color="red"
              floating
            >{{itemsMenu.length}}</q-badge>
            <q-tooltip class="bg-blue">通知</q-tooltip>
            <q-menu
              fit
              anchor="bottom left"
              self="top middle"
              :offset="[93, 0]"
              @show="scrollTarget = $refs.scrollTargetRef"
            >
              <q-item-label header>
                我的消息
              </q-item-label>
              <q-list
                ref="scrollTargetRef"
                class="scroll"
                style="max-height: 250px; width:300px;"
              >
                <q-infinite-scroll
                  @load="onLoadMenu"
                  :offset="250"
                  :scroll-target="scrollTarget"
                >

                  <q-item
                    clickable
                    v-ripple
                    v-for="(item, index) in itemsMenu"
                    :key="index"
                  >
                    <!-- <q-item-section>
                        <q-item-label>Content filtering {{ index + 1 }}</q-item-label>
                        <q-item-label caption>
                          Set the content filtering level to restrict
                          apps that can be downloaded
                        </q-item-label>
                      </q-item-section> -->
                    <q-item-section avatar>
                      <q-avatar
                        color="primary"
                        text-color="white"
                      >
                        R{{ index + 1 }}
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Ruddy Jedrzej {{ index + 1 }}</q-item-label>
                      <q-item-label
                        caption
                        lines="1"
                      >rjedrzej0@discuz{{ index + 1 }}.net</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-icon
                        name="chat_bubble"
                        color="green"
                      />
                    </q-item-section>
                  </q-item>

                  <template v-slot:loading>
                    <div class="text-center q-my-md">
                      <q-spinner-dots
                        color="primary"
                        size="40px"
                      />
                    </div>
                  </template>
                </q-infinite-scroll>
              </q-list>
            </q-menu>
          </q-tab>
        </q-tabs>
        <q-btn-dropdown
          class="btn-dropdown-hide-droparrow"
          flat
          dense
          no-caps
          stretch
          no-icon-animation
          auto-close
        >
          <template v-slot:label>
            <div class='text-center'>系统管理员</div>
            &nbsp;
            <q-avatar size="md">
              <img src="~assets/boy-avatar.jpg">
            </q-avatar>
          </template>

          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <!-- <q-toggle v-model="$q.dark.isActive" label="Dark模式"/> -->
              <q-btn @click="$q.dark.toggle()" label="Dark模式" color="primary"/>
              <brand-color />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="~assets/boy-avatar.jpg">
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

              <q-btn
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer class="coadmin-sidebar main-page-sidebar non-selectable no-scroll"
      v-model="leftDrawerOpen"
      show-if-above
      side="left"

      :mini="miniCheck"
      @mouseover="leftDrawerMouseOver"
      @mouseout="leftDrawerMouseOut"
      :mini-to-overlay="miniToOverlay"

      :width="240"
      :breakpoint="599"
      bordered
    >
      <div class="sidebar-body">
        <q-scroll-area class="fit">
          <q-list>
            <side-menu ref="menu" v-for="(routeItem) in routes" :route-item="routeItem" :key="routeItem.path" base-path="" :level="1"/>
          </q-list>
        </q-scroll-area>
      </div>
      <div
        class="sidebar-footer row items-center"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerMiniClick"
          :icon="`${leftDrawerMini?'format_indent_increase':'format_indent_decrease'}`"
          aria-label="Menu"
          color="primary"
          size="sm"
        />
      </div>
    </q-drawer>

    <q-page-container v-if="pageTagViewPosition === 'top'">
      <q-layout container style="height: calc(100vh - 50px);">
        <q-header reveal class="coadmin-header bg-white text-primary">
          <page-tag-views />
          <q-separator v-if="!$q.dark.isActive"/>
        </q-header>
        <q-page-container>
          <keep-alive :include="cachedViews">
            <router-view :key="key" />
          </keep-alive>
        </q-page-container>
      </q-layout>
    </q-page-container>
    <q-page-container v-else>
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </q-page-container>

    <q-footer reveal v-if="pageTagViewPosition === 'bottom'" class="coadmin-footer bg-white text-primary">
      <q-separator v-if="!$q.dark.isActive"/>
      <page-tag-views switch-indicator/>
    </q-footer>

  </q-layout>
</template>

<script>
import SideMenu from 'components/SideMenu.vue'
import PageTagViews from 'components/PageTagViews.vue'
import BrandColor from 'components/BrandColor.vue'
import routes from '../router/routes.js'

// 演示引入其他图标
import { mdiCallMade } from '@quasar/extras/mdi-v5'

export default {
  name: 'MainLayout',
  components: {
    SideMenu,
    PageTagViews,
    BrandColor
  },
  data () {
    return {
      miniState: false,
      leftDrawerMini: false,
      leftDrawerOpen: false,
      mdiCallMade: mdiCallMade,

      scrollTarget: undefined,
      itemsMenu: [{}, {}, {}, {}, {}, {}, {}], // 通知项
      pageTagViewPosition: 'top' // 页面Tab栏位置（top、bottom、none）
    }
  },
  created () {
    console.log('routes:', routes)
  },
  mounted () {
    console.log('route:', this.$route.path)
    this.menuOpen(this.menuFind(this.$refs.menu, this.$route.path))
  },
  watch: {
    $route (route) {
      console.log('watch.route change:', route.path)
      this.menuOpen(this.menuFind(this.$refs.menu, route.path))
    }
  },
  computed: {
    routes () {
      return routes
    },
    cachedViews () {
      return this.$store.state.tagviews.cachedViews
    },
    key () {
      return this.$route.path
    },
    miniCheck: function () {
      if (this.leftDrawerMini) {
        return this.miniState
      } else {
        return false
      }
    },
    miniToOverlay: function () {
      if (this.leftDrawerMini) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    menuFind (array, path) {
      if (array === undefined || array.length === 0) {
        return undefined
      }
      for (const a of array) {
        if (a.$refs['route-' + path]) {
          return a
        }
        const ret = this.menuFind(a.$refs.menu, path)
        if (ret !== undefined) {
          return ret
        }
      }
      return undefined
    },
    menuOpen (menu) {
      if (this.$q.screen.lt.sm) {
        return
      }
      if (menu !== undefined && menu !== this) {
        this.menuOpen(menu.$parent)
        if (menu.show) {
          menu.show()
        }
      }
    },
    leftDrawerMouseOver (evt) {
      this.miniState = false
    },
    leftDrawerMouseOut (evt) {
      this.miniState = true
    },
    leftDrawerMiniClick () {
      this.leftDrawerMini = !this.leftDrawerMini
      if (this.leftDrawerMini) {
        this.miniState = true
      } else {
        this.miniState = false
      }
    },
    onLoadMenu (index, done) {
      if (index > 1) {
        setTimeout(() => {
          if (this.itemsMenu) {
            this.itemsMenu.push({}, {}, {}, {}, {}, {}, {})
            done()
          }
        }, 2000)
      } else {
        setTimeout(() => {
          done()
        }, 200)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<style lang="sass" scoped>
.main-page-sidebar
  & .sidebar-body
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 45px
  & .sidebar-footer
    position: absolute
    left: 0
    right: 0
    bottom: 0
    height: 45px
    padding-left: 13.5px
</style>
