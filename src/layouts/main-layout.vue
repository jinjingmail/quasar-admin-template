<template>
  <q-layout
    :view="sidebarTop?'lHh LpR lFf':'hHh LpR lFf'"
    :class="{'layout-main-bg-image':pageBgImage}"
    class="custom-page-bg">
    <co-dialog
      v-model="testDialog"
      title="效果预览"
      icon="colorize"
      seamless
      card-style="width:240px"
      >
      <q-card-section>
        <div class="text-body2">本对话框用于预览颜色设置效果</div>
      </q-card-section>
      <q-card-actions align="right">
        <co-btn label="关闭" flat v-close-popup />
      </q-card-actions>
    </co-dialog>
    <q-header :reveal="!fixedHeader" :reveal-offset="60" :elevated="elevatedHeader" :bordered="!elevatedHeader" class="co-header" :style="headerStyles">
      <q-toolbar>
        <template v-if="!sidebarTop || !$q.screen.gt.xs">
          <q-avatar class="q-logo" @click="leftDrawerOpen = !leftDrawerOpen">
            <img src="~assets/logo.svg" />
          </q-avatar>
          <q-toolbar-title
            shrink
            class="text-bold"
            v-if="$q.screen.gt.xs"
          >
            {{title}}
            <span v-show="false"
              class="q-ml-xs"
              style="letter-spacing: 0.1em;font-size:12px;font-weight:500;"
            >{{$q.version}}</span>
          </q-toolbar-title>
        </template>

        <q-btn
          v-if="sidebarTop && $q.screen.gt.xs"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <breadcrumb mobile-less/>

        <!-- 右侧工具栏 -->
        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <co-btn flat icon="notifications">
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
          </co-btn>
          <co-btn dense flat v-if="$q.screen.gt.xs" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" @click="$q.fullscreen.toggle()"/>
          <co-btn dense flat :icon="$q.dark.isActive ? 'wb_sunny' : 'brightness_3'" @click="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
          <co-btn dense flat :label="$q.screen.gt.xs?username:''" @click="$refs.drawerRight.toggle()" class="no-wrap">
            <q-avatar size="md" class="q-pl-xs">
              <img src="~assets/boy-avatar.jpg">
            </q-avatar>
          </co-btn>
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
      content-class="custom-other-bg"
    >
        <div class="q-pa-sm q-pb-xl">
          <q-toolbar class="transparent">
            <co-btn icon="close" round flat @click="$refs.drawerRight.toggle()"/>

            <q-space/>
            <co-btn flat :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" @click="$q.fullscreen.toggle()"/>
            <co-btn flat :icon="$q.dark.isActive ? 'wb_sunny' : 'brightness_3'" @click="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
          </q-toolbar>

          <div class="no-wrap">
            <div class="column items-center">
              <div class="text-body1 q-mb-xs">{{username}}</div>
              <q-avatar size="80px">
                <img src="~assets/boy-avatar.jpg">
              </q-avatar>

              <q-toolbar>
                <co-btn
                  color="primary"
                  label="个人设置"
                  flat
                  borderless
                />
                <q-space/>
                <co-btn
                  color="primary"
                  label="退出登录"
                  flat
                  borderless
                  @click="$store.dispatch('user/logout').then(()=>{$router.push('/user/login')})"
                />
              </q-toolbar>
            </div>

            <q-separator inset class="q-my-sm" />

            <div class="column">
              <co-checkbox style="margin:2px 4px" :value="$q.dark.isActive" :val="true" label="DARK模式" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
              <co-checkbox style="margin:2px 4px" :value="denseMode" :val="true" label="紧凑模式" @click.native="changeSettingDenseMode(!denseMode)"/>
              <co-checkbox style="margin:2px 4px" :value="tagsView" :val="true" label="Tab栏显示" @click.native="changeSetting({key:'tagsView', value: !tagsView})"/>
              <co-checkbox style="margin:2px 4px" :value="tagsViewTop" :val="true" label="Tab栏顶部显示" @click.native="changeSetting({key:'tagsViewTop', value: !tagsViewTop})"/>
              <co-checkbox style="margin:2px 4px" :value="fixedHeader" :val="true" label="顶部锁定" @click.native="changeSetting({key:'fixedHeader', value: !fixedHeader})"/>
              <co-checkbox style="margin:2px 4px" :value="elevatedHeader" :val="true" label="顶部阴影" @click.native="changeSetting({key:'elevatedHeader', value: !elevatedHeader})"/>
              <co-checkbox style="margin:2px 4px" :value="elevatedSidebar" :val="true" label="左侧菜单阴影" @click.native="changeSetting({key:'elevatedSidebar', value: !elevatedSidebar})"/>
              <co-checkbox style="margin:2px 4px" :value="sidebarTop" :val="true" label="左侧菜单到顶" @click.native="changeSetting({key:'sidebarTop', value: !sidebarTop})" v-if="$q.screen.gt.xs"/>
              <co-checkbox style="margin:2px 4px" :value="sidebarMini" :val="true" label="左侧菜单折叠（需刷新）" @click.native="changeSetting({key:'sidebarMini', value: !sidebarMini})" v-if="$q.screen.gt.xs"/>
              <co-checkbox style="margin:2px 4px" :value="uniqueOpened" :val="true" label="左侧菜单只展开一个" @click.native="changeSetting({key:'uniqueOpened', value: !uniqueOpened})"/>
              <co-input dense label="左侧菜单宽度" style="width:100px" :value="sidebarWidth" @input="val => changeSetting({key:'sidebarWidth', value: val})" type="number"/>

              <q-separator inset class="q-mt-md" />

              <q-toolbar class="no-padding">
                <div class="text-subtitle1 ">主色调</div>
                <q-space/>
                <co-toggle :value="$q.dark.isActive" :val="true" label="DARK" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
              </q-toolbar>
              <brand-color />

              <q-toolbar class="no-padding">
                  <div class="text-subtitle1 ">顶部</div>
                  <q-space/>
                  <q-btn icon="restore" flat round color="primary">
                    <q-tooltip :delay="550" content-class="bg-amber text-black shadow-4">
                      恢复默认
                    </q-tooltip>
                    <q-popup-proxy>
                      <co-card class="my-card" style="width:240px; ">
                        <q-card-section class="bg-secondary text-white">
                          <div class="text-subtitle1 text-no-wrap">恢复默认？</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-actions align="right" class="q-pa-md">
                          <q-btn v-close-popup flat>取消</q-btn>
                          <q-btn v-close-popup color="secondary" icon="check" @click="restoreSetting('colorHeader')">是的</q-btn>
                        </q-card-actions>
                      </co-card>
                    </q-popup-proxy>
                  </q-btn>
                  <co-toggle :value="$q.dark.isActive" :val="true" label="DARK" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
              </q-toolbar>
              <div class="row q-gutter-lg">
                <co-btn flat dense class="col-auto" label="背景1" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorHeaderBg1" @change="value => changeSetting({key:'colorHeaderBg1', value: value})"/>
                  </q-popup-proxy>
                </co-btn>
                <co-btn flat dense class="col-auto" label="背景2" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorHeaderBg2" @change="value => changeSetting({key:'colorHeaderBg2', value: value})"/>
                  </q-popup-proxy>
                </co-btn>
                <co-btn flat dense class="col-auto" label="文字" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorHeaderText" @change="value => changeSetting({key:'colorHeaderText', value: value})"/>
                  </q-popup-proxy>
                </co-btn>
              </div>

              <q-toolbar class="no-padding">
                  <div class="text-subtitle1 ">左侧菜单</div>
                  <q-space/>
                  <q-btn icon="restore" flat round color="primary">
                    <q-tooltip :delay="550" content-class="bg-amber text-black shadow-4">
                      恢复默认
                    </q-tooltip>
                    <q-popup-proxy>
                      <co-card class="my-card" style="width:240px; ">
                        <q-card-section class="bg-secondary text-white">
                          <div class="text-subtitle1 text-no-wrap">恢复默认？</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-actions align="right" class="q-pa-md">
                          <q-btn v-close-popup flat>取消</q-btn>
                          <q-btn v-close-popup color="secondary" icon="check" @click="restoreSetting('colorMenu')">是的</q-btn>
                        </q-card-actions>
                      </co-card>
                    </q-popup-proxy>
                  </q-btn>
                  <co-toggle :value="$q.dark.isActive" :val="true" label="DARK" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
              </q-toolbar>
              <div class="row q-gutter-lg">
                <co-btn flat dense class="col-auto" label="背景" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorMenuBg" @change="value => changeSetting({key:'colorMenuBg', value: value})"/>
                  </q-popup-proxy>
                </co-btn>
                <co-btn flat dense class="col-auto" label="文字" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorMenuText" @change="value => changeSetting({key:'colorMenuText', value: value})"/>
                  </q-popup-proxy>
                </co-btn>
                <co-btn flat dense class="col-auto" label="选中项" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorMenuBgActive" @change="value => changeSetting({key:'colorMenuBgActive', value: value})"/>
                  </q-popup-proxy>
                </co-btn>
              </div>

              <q-toolbar class="no-padding">
                  <div class="text-subtitle1 ">页面<q-icon name="help_outline"><q-tooltip>修改页面背景色</q-tooltip></q-icon></div>
                  <q-space/>
                  <q-btn icon="restore" flat round color="primary">
                    <q-tooltip :delay="550" content-class="bg-amber text-black shadow-4">
                      恢复默认
                    </q-tooltip>
                    <q-popup-proxy>
                      <co-card class="my-card" style="width:240px; ">
                        <q-card-section class="bg-secondary text-white">
                          <div class="text-subtitle1 text-no-wrap">恢复默认？</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-actions align="right" class="q-pa-md">
                          <q-btn v-close-popup flat>取消</q-btn>
                          <q-btn v-close-popup color="secondary" icon="check" @click="restoreSetting('colorPage')">是的</q-btn>
                        </q-card-actions>
                      </co-card>
                    </q-popup-proxy>
                  </q-btn>
                  <co-toggle :value="$q.dark.isActive" :val="true" label="DARK" @click.native="changeSetting({key:'darkMode', value: !$q.dark.isActive})"/>
              </q-toolbar>
              <div class="row q-gutter-sm">
                <co-btn flat dense class="col-auto" label="背景底色" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorPageBg" @change="value => changeSetting({key:'colorPageBg', value: value})"/>
                  </q-popup-proxy>
                </co-btn>
                <co-btn flat dense class="col-auto" label="表格背景" color="primary">
                  <q-popup-proxy>
                    <q-color :value="colorTableBg" @change="value => changeSetting({key:'colorTableBg', value: value})"/>
                  </q-popup-proxy>
                </co-btn>
                <co-btn flat dense class="col-auto" label="其它背景" color="primary" @click="testDialog=true">
                  <q-popup-proxy>
                    <q-color :value="colorOtherBg" @change="value => changeSetting({key:'colorOtherBg', value: value})"/>
                  </q-popup-proxy>
                </co-btn>
                <co-checkbox dense :value="pageBgImage" label="显示背景图" @click.native="changeSetting({key:'pageBgImage', value: !pageBgImage})"/>
              </div>

              <q-separator inset class="q-mt-md" />
              <div class="text-subtitle1 ">输入框样式</div>
              <div class="row q-gutter-sm">
                <co-select :value="inputDesignMode" class="col" :options="['default', 'standout', 'filled', 'outlined', 'borderless']" @input="value => changeSettingInputDesignMode(value)"/>
                <co-select :value="inputDesignCorner" class="col" :options="['default', 'square', 'rounded']" @input="value => changeSettingInputDesignCorner(value)"/>
              </div>

              <q-separator inset class="q-mt-md" />
              <div class="text-subtitle1 ">按钮样式</div>
              <div class="row q-gutter-sm">
                <co-select :value="btnDesignMode" class="col" :options="['default', 'flat', 'outline', 'push', 'unelevated']" @input="value => changeSettingBtnDesignMode(value)"/>
                <co-select :value="btnDesignCorner" class="col" :options="['default', 'square', 'rounded']" @input="value => changeSettingBtnDesignCorner(value)"/>
              </div>

            </div>

          </div>
        </div>
    </q-drawer>

    <q-drawer class="co-sidebar main-page-sidebar non-selectable no-scroll"
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      :mini="miniCheck"
      @mouseover="leftDrawerMouseOver"
      @mouseout="leftDrawerMouseOut"
      :mini-to-overlay="miniToOverlay"
      :width="parseInt(sidebarWidth)"
      :breakpoint="599"
      :elevated="elevatedSidebar"
      :bordered="false"
    >
      <div class="sidebar-body" :style="drawerStyles">
        <q-scroll-area class="fit" style="margin-top:5px">
          <q-list>
            <template v-if="sidebarTop || !$q.screen.gt.xs">
              <q-item>
                <q-item-section avatar v-if="sidebarLogo">
                  <q-avatar class="q-logo">
                    <img src="~assets/logo.svg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-toolbar-title
                    shrink
                    class="text-bold"
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
        <q-btn v-if="$q.screen.gt.xs"
          flat
          dense
          round
          @click="leftDrawerMiniClick"
          :icon="`${leftDrawerMini?'format_indent_increase':'format_indent_decrease'}`"
          aria-label="Menu"
          size="md"
        />
      </div>
    </q-drawer>

    <q-page-container :style="stylesPageContainer">
      <q-page
        :style="(tagsView && tagsViewTop)?'padding-top: 36px;':((tagsView && !tagsViewTop)?'padding-bottom: 36px':'')"
      >
        <keep-alive :include="cachedViews">
          <router-view class="co-page" :class="settingPageClass" :style="settingPageStyle" />
        </keep-alive>

        <!-- place QPageSticky at end of page -->
        <q-page-sticky expand position="top" v-if="tagsView && tagsViewTop" style="z-index:5;">
          <page-tag-views :style="'background-color:'+colorPageBg"/>
          <q-separator/>
        </q-page-sticky>
        <q-page-sticky expand position="bottom" v-if="tagsView && !tagsViewTop" style='z-index:5;'>
          <q-separator/>
          <page-tag-views :style="'background-color:'+colorPageBg" switch-indicator/>
        </q-page-sticky>
        <!-- place QPageScroller at end of page -->
        <q-page-scroller position="bottom" :scroll-offset="150" :offset="fabPos" style="z-index:6;">
          <q-btn fab-mini icon="keyboard_arrow_up" color="primary" v-touch-pan.capture="moveFab" v-touch-pan.prevent.mouse="moveFab" :disable="draggingFab"/>
        </q-page-scroller>

        <div class="text-body2" style="text-align:center" v-show="settingShowFooter">
          {{settingFooterTxt}} {{settingCaseNumber}}
        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Setting from '@/default-setting'
import SideMenu from 'pages/components/side-menu.vue'
import PageTagViews from 'pages/components/page-tag-views.vue'
import BrandColor from 'pages/components/brand-color.vue'
import Breadcrumb from 'pages/components/breadcrumb.vue'
import routes from '@/router/routes.js'

// 演示引入其他图标
import { mdiCallMade } from '@quasar/extras/mdi-v5'

export default {
  name: 'MainLayout',
  components: {
    SideMenu,
    PageTagViews,
    BrandColor,
    Breadcrumb
  },
  data () {
    return {
      testDialog: false,
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
    if (this.sidebarMini || !this.$q.screen.gt.sm) {
      this.leftDrawerMini = true
      this.miniState = true
    }
  },
  watch: {
    $route (route) {
      this.menuOpen(this.menuFind(this.$refs.menu, route.path))
    }
  },
  computed: {
    settingShowFooter() {
      return Setting.showFooter
    },
    settingFooterTxt() {
      return Setting.footerTxt
    },
    settingCaseNumber() {
      return Setting.caseNumber
    },
    settingPageClass () {
      if (this.$q.screen.gt.xs) {
        return Setting.pageClass
      } else {
        return Setting.pageClassMobile
      }
    },
    settingPageStyle () {
      if (this.$q.screen.gt.xs) {
        return Setting.pageStyle
      } else {
        return Setting.pageStyleMobile
      }
    },
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
      'elevatedHeader',
      'elevatedSidebar',
      'uniqueOpened',
      'sidebarTop',
      'sidebarLogo',
      'sidebarWidth',
      'sidebarMini',
      'darkMode',
      'denseMode',
      'inputDesignMode',
      'inputDesignCorner',
      'btnDesignMode',
      'btnDesignCorner',
      'pageBgImage',
      'colorPrimary',
      'colorHeaderBg1',
      'colorHeaderBg2',
      'colorHeaderText',
      'colorMenuBg',
      'colorMenuText',
      'colorMenuBgActive',
      'colorPageBg',
      'colorTableBg',
      'colorOtherBg'
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
    changeSettingDenseMode(mode) {
      this.changeSetting({ key: 'denseMode', value: mode })
      this.$nextTick(() => {
        this.$router.go(0)
      })
    },
    changeSettingInputDesignMode(mode) {
      console.log('mode=' + mode)
      this.changeSetting({ key: 'inputDesignMode', value: mode })
      this.$nextTick(() => {
        this.$router.go(0)
      })
    },
    changeSettingInputDesignCorner(mode) {
      this.changeSetting({ key: 'inputDesignCorner', value: mode })
      this.$nextTick(() => {
        this.$router.go(0)
      })
    },
    changeSettingBtnDesignMode(mode) {
      this.changeSetting({ key: 'btnDesignMode', value: mode })
      this.$nextTick(() => {
        this.$router.go(0)
      })
    },
    changeSettingBtnDesignCorner(mode) {
      this.changeSetting({ key: 'btnDesignCorner', value: mode })
      this.$nextTick(() => {
        this.$router.go(0)
      })
    },
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
.co-sidebar .sidebar-body  ::v-deep .q-separator {
  background: rgb(165 165 165 / 41%);
}

.layout-main-bg-image {
  background-image: url("~assets/index.svg");
  background-repeat: no-repeat;
  background-position: center 0px;
  background-size: 100%;
}

.body--dark .layout-main-bg-image {
}

.co-sidebar.main-page-sidebar ::v-deep > .q-drawer {
  background-image: url("~assets/sidebar-bg.jpg") !important;
  background-size: cover !important;
  background-repeat: no-repeat;
}
.xpagetagviews-normal {
  background-color: #eeeeee;  // $grey-3
  color: var(--q-color-primary);
  ::v-deep .q-tab--active {
    background-color: white;
  }
}
.xpagetagviews-dark {
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
    padding-left: 11px
</style>
