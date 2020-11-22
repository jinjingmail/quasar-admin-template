<template>
  <q-layout :view="sidebarTop?'lHh LpR lFf':'hHh LpR lFf'" class="layout-main">
    <q-header :reveal="!fixedHeader" :elevated="false" class="coadmin-header" :style="headerStyles">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="!$q.screen.gt.xs"
        />
        <template v-if="!sidebarTop || !$q.screen.gt.xs">
          <q-avatar class="q-logo">
            <img src="~assets/logo.svg" />
          </q-avatar>
          <q-toolbar-title
            shrink
            class="text-bold logo-text-primary"
            v-if="$q.screen.gt.xs"
          >
            {{title}}
            <span v-show="false"
              class="q-ml-xs"
              style="letter-spacing: 0.1em;font-size:12px;font-weight:500;"
            >v1.14.1</span>
          </q-toolbar-title>
        </template>

        <q-breadcrumbs active-color="white" v-if="!$q.screen.xs">
          <q-breadcrumbs-el label="Home" />
          <q-breadcrumbs-el label="Components" />
          <q-breadcrumbs-el label="Breadcrumbs" />
        </q-breadcrumbs>

        <!-- 右侧工具栏 -->
        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn dense flat icon="notifications">
            <q-badge color="red" text-color="white" floating>
              {{itemsMenu.length}}
            </q-badge>
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
          </q-btn>
          <q-btn flat dense :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" @click="$q.fullscreen.toggle()"/>
          <q-btn flat dense :icon="$q.dark.isActive ? 'brightness_high' : 'brightness_3'" @click="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
          <q-btn flat dense :label="username" @click="$refs.drawerRight.toggle()">
            <q-avatar size="md">
              <img src="~assets/boy-avatar.jpg">
            </q-avatar>
          </q-btn>
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      side="right"
      ref="drawerRight"
      :show-if-above="false"
      :overlay="false"
      :bordered="true"
      :elevated="false"
      :width="260"
      :breakpoint="599"
      class="non-selectable"
    >
        <div class="q-pa-sm fit">
          <q-bar class="transparent">
            <q-space/>
            <q-btn icon="close" round flat dense @click="$refs.drawerRight.toggle()"/>
          </q-bar>

          <div class="no-wrap">
            <div class="column items-center">
              <div class="text-h6 q-mb-xs">{{username}}</div>
              <q-avatar size="80px">
                <img src="~assets/boy-avatar.jpg">
              </q-avatar>

              <q-toolbar>
                <q-btn
                  color="primary"
                  label="个人设置"
                  push
                  size="sm"
                />
                <q-space/>
                <q-btn
                  color="primary"
                  label="退出登录"
                  push
                  size="sm"
                />
              </q-toolbar>
            </div>

            <q-separator inset class="q-my-sm" />

            <div class="column">
              <q-toggle :value="$q.dark.isActive" :val="true" label="DARK" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
              <div class="text-subtitle1 ">Settings</div>
              <q-toggle :value="tagsView" :val="true" label="显示Tab栏" @click.native="changeSetting({key:'tagsView', value: !tagsView})"/>
              <q-toggle :value="tagsViewTop" :val="true" label="顶部显示Tab栏" @click.native="changeSetting({key:'tagsViewTop', value: !tagsViewTop})"/>
              <q-toggle :value="fixedHeader" :val="true" label="锁定头部" @click.native="changeSetting({key:'fixedHeader', value: !fixedHeader})"/>
              <q-toggle :value="uniqueOpened" :val="true" label="只展开一个菜单" @click.native="changeSetting({key:'uniqueOpened', value: !uniqueOpened})"/>
              <q-toggle :value="sidebarTop" :val="true" label="菜单栏到顶" @click.native="changeSetting({key:'sidebarTop', value: !sidebarTop})"/>
              <q-toolbar class="no-padding">
                <div class="text-subtitle1 ">颜色</div>
                <q-space/>
                <q-toggle :value="$q.dark.isActive" :val="true" label="DARK" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
              </q-toolbar>
              <brand-color />

              <q-toolbar class="no-padding">
                  <div class="text-subtitle1 ">头部</div>
                  <q-space/>
                  <q-btn icon="restore" flat round color="primary">
                    <q-tooltip :delay="550" content-class="bg-amber text-black shadow-4">
                      恢复默认
                    </q-tooltip>
                    <q-popup-proxy>
                      <q-card class="my-card">
                        <q-card-section class="bg-primary text-white">
                          <div class="text-h6">恢复默认？</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-actions align="right">
                          <q-btn dense v-close-popup @click="restoreSetting('colorHeader')">好的</q-btn>
                          <q-btn dense v-close-popup flat>取消</q-btn>
                        </q-card-actions>
                      </q-card>
                    </q-popup-proxy>
                  </q-btn>
                  <q-toggle :value="$q.dark.isActive" :val="true" label="DARK" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
              </q-toolbar>
              <div class="row q-gutter-lg">
                <q-btn class="col-auto" size="sm" label="背景1" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorHeaderBg1" @change="value => changeSetting({key:'colorHeaderBg1', value: value})"/>
                  </q-popup-proxy>
                </q-btn>
                <q-btn class="col-auto" size="sm" label="背景2" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorHeaderBg2" @change="value => changeSetting({key:'colorHeaderBg2', value: value})"/>
                  </q-popup-proxy>
                </q-btn>
                <q-btn class="col-auto" size="sm" label="文字" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorHeaderText" @change="value => changeSetting({key:'colorHeaderText', value: value})"/>
                  </q-popup-proxy>
                </q-btn>
              </div>

              <q-toolbar class="no-padding">
                  <div class="text-subtitle1 ">菜单栏</div>
                  <q-space/>
                  <q-btn icon="restore" flat round color="primary">
                    <q-tooltip :delay="550" content-class="bg-amber text-black shadow-4">
                      恢复默认
                    </q-tooltip>
                    <q-popup-proxy>
                      <q-card class="my-card">
                        <q-card-section class="bg-primary text-white">
                          <div class="text-h6">恢复默认？</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-actions align="right">
                          <q-btn dense v-close-popup @click="restoreSetting('colorMenu')">好的</q-btn>
                          <q-btn dense v-close-popup flat>取消</q-btn>
                        </q-card-actions>
                      </q-card>
                    </q-popup-proxy>
                  </q-btn>
                  <q-toggle :value="$q.dark.isActive" :val="true" label="DARK" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
              </q-toolbar>
              <div class="row q-gutter-lg">
                <q-btn class="col-auto" size="sm" label="背景" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorMenuBg" @change="value => changeSetting({key:'colorMenuBg', value: value})"/>
                  </q-popup-proxy>
                </q-btn>
                <q-btn class="col-auto" size="sm" label="文字" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorMenuText" @change="value => changeSetting({key:'colorMenuText', value: value})"/>
                  </q-popup-proxy>
                </q-btn>
              </div>

            </div>

          </div>
        </div>
    </q-drawer>

    <q-drawer class="coadmin-sidebar main-page-sidebar non-selectable no-scroll"
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      elevated
      :mini="miniCheck"
      @mouseover="leftDrawerMouseOver"
      @mouseout="leftDrawerMouseOut"
      :mini-to-overlay="miniToOverlay"
      :width="260"
      :breakpoint="599"
      :bordered="false"
    >
      <div class="sidebar-body" :style="drawerStyles">
        <q-scroll-area class="fit">
          <q-list>
            <template v-if="sidebarTop || !$q.screen.gt.xs">
              <q-item>
                <q-item-section avatar>
                  <q-avatar class="q-logo">
                    <img src="~assets/logo.svg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-toolbar-title
                    shrink
                    class="text-bold logo-text-primary"
                    :style="drawerStylesFontColor"
                  >
                    {{title}}
                  </q-toolbar-title>

                </q-item-section>
              </q-item>
            </template>
            <side-menu ref="menu" v-for="(routeItem) in routes" :route-item="routeItem" :key="routeItem.path" base-path="" :level="1"/>
          </q-list>
        </q-scroll-area>
      </div>
      <div
        class="sidebar-footer row items-center"
        :style="drawerStyles"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerMiniClick"
          :icon="`${leftDrawerMini?'format_indent_increase':'format_indent_decrease'}`"
          aria-label="Menu"
          size="sm"
        />
      </div>
    </q-drawer>

    <q-page-container :style="stylesPageContainer">
      <q-page
        :style="(tagsView && tagsViewTop)?'padding-top: 36px;':((tagsView && !tagsViewTop)?'padding-bottom: 36px':'')"
      >
        <keep-alive :include="cachedViews">
          <router-view class="coadmin-page" />
        </keep-alive>

        <!-- place QPageSticky at end of page -->
        <q-page-sticky expand position="top" v-if="tagsView && tagsViewTop" style="z-index:5;">
          <page-tag-views :class="$q.dark.isActive ? 'pagetagviews-dark' : 'pagetagviews-normal'"/>
          <q-separator/>
        </q-page-sticky>
        <q-page-sticky expand position="bottom" v-if="tagsView && !tagsViewTop" style='z-index:5;'>
          <q-separator/>
          <page-tag-views switch-indicator :class="$q.dark.isActive ? 'pagetagviews-dark' : 'pagetagviews-normal'"/>
        </q-page-sticky>
        <!-- place QPageScroller at end of page -->
        <q-page-scroller position="bottom" :scroll-offset="150" :offset="fabPos" style="z-index:$z-fab;">
          <q-btn fab-mini icon="keyboard_arrow_up" color="primary" v-touch-pan.capture="moveFab" v-touch-pan.prevent.mouse="moveFab" :disable="draggingFab"/>
        </q-page-scroller>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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

      fabPos: [48, 58],
      draggingFab: false,

      scrollTarget: undefined,
      itemsMenu: [{}, {}, {}, {}, {}, {}, {}] // 通知项
    }
  },
  created () {
  },
  mounted () {
    this.menuOpen(this.menuFind(this.$refs.menu, this.$route.path))
  },
  watch: {
    $route (route) {
      this.menuOpen(this.menuFind(this.$refs.menu, route.path))
    }
  },
  computed: {
    drawerStyles () {
      return {
        backgroundColor: this.colorMenuBg,
        color: this.colorMenuText
      }
    },
    stylesPageContainer () {
      return {
        // backgroundColor: this.$q.dark.isActive ? '#000' : 'rgb(238 240 248 / 70%)'
      }
    },
    drawerStylesFontColor () {
      return {
        color: this.colorMenuText
      }
    },
    headerStyles () {
      return {
        background: 'linear-gradient(145deg, ' + this.colorHeaderBg1 + ' 15%, ' + this.colorHeaderBg2 + ' 70%)',
        color: this.colorHeaderText
      }
    },
    ...mapGetters('settings', [
      'title',
      'tagsView',
      'tagsViewTop',
      'fixedHeader',
      'uniqueOpened',
      'sidebarTop',
      'darkMode',
      'colorPrimary',
      'colorHeaderBg1',
      'colorHeaderBg2',
      'colorHeaderText',
      'colorMenuBg',
      'colorMenuText'
    ]),
    ...mapGetters('tagviews', [
      'cachedViews'
    ]),
    ...mapGetters('user', [
      'username'
    ]),
    routes () {
      return routes
    },
    /* cachedViews () {
      return this.$store.state.tagviews.cachedViews
    }, */
    // 20201109 发现一个问题：当noCache==false的页面在dev模式下更改了页面结构，会导致网页白屏，<router-view /> 不使用key就没这个问题
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
    ...mapActions('settings', [
      'changeSetting',
      'restoreSetting'
    ]),
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
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
.header_normal {
  background: linear-gradient(145deg, rgb(32, 106, 80) 15%, rgb(21, 57, 102) 70%);
}

.header_dark {
  background: linear-gradient(
    145deg,
    rgb(61, 14, 42) 15%,
    rgb(14, 43, 78) 70%);
}

.layout-main {
  background-image: url("~assets/index.svg");
  background-repeat: no-repeat;
  background-position: center 0px;
  background-size: 100%;
  // background-color: red;
}

.coadmin-sidebar.main-page-sidebar ::v-deep > .q-drawer {
  background-image: url("/img/sidebar-bg.jpg") !important;
  background-size: cover !important;
  background-repeat: no-repeat;
}
.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
  color: red;
}

.drawer_dark {
  background-color: rgba(1, 1, 1, 0.863);
  color: yellow;
}
.pagetagviews-normal {
  background-color: #eeeeee;  // $grey-3
  color: var(--q-color-primary);
  ::v-deep .q-tab--active {
    background-color: white;
  }
}
.pagetagviews-dark {
  background-color: #212121; // $grey-10
  color: var(--q-color-primary);
  // color: $grey-2;
  ::v-deep .q-tab--active {
    background-color: $grey-9;
  }
}
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
