<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
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
        <q-avatar class="q-logo">
          <img src="../assets/logo.svg" />
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

      </q-toolbar>
    </q-header>

    <q-page-container class="main-page-container">

      <q-drawer class="main-page-sidebar full-height"
        v-model="leftDrawerOpen"
        side="left"
        show-if-above
        :width="240"
        :mini-width="55"
        :mini="miniCheck"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :bordered="false"
        :breakpoint="500"
        :mini-to-overlay="miniToOverlay"
        content-class="bg-grey-3"
      >
        <div class="sidebar-body">
          <q-scroll-area class="fit">
            <q-list padding class="rounded-borders">
              <side-menu :menuList="leftSideMenus" :level="1"/>
              <q-expansion-item
                :content-inset-level="contentInsetLevel"
                group="topmenu"
                expand-separator
                default-opened
              >
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon color="purple" name="signal_wifi_off"/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>系统管理</q-item-label>
                    <q-item-label caption>5 unread emails</q-item-label>
                  </q-item-section>
                </template>

                <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>

                <q-expansion-item dense dense-toggle
                  :header-inset-level="headerInsetLevel"
                  :content-inset-level="contentInsetLevel" >
                  <template v-slot:header>

                    <q-item-section>
                      <q-item-label>今天管理</q-item-label>
                    </q-item-section>
                  </template>

                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                </q-expansion-item>

                <q-expansion-item dense dense-toggle :header-inset-level="headerInsetLevel" :content-inset-level="contentInsetLevel" >
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-icon color="purple" name="signal_wifi_off" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>昨天</q-item-label>
                    </q-item-section>
                  </template>

                  <q-item dense clickable tag="div"
                    active-class="left-side-menu-active"
                    :active="leftSideMenuActive==='baiduTest1'"
                    @click="leftSideMenuActive='baiduTest1'"
                  >
                    <q-item-section>百度测试1</q-item-section>
                  </q-item>
                  <q-item dense clickable tag="div"
                    active-class="left-side-menu-active"
                    :active="leftSideMenuActive==='baiduTest2'"
                    @click="leftSideMenuActive='baiduTest2'"
                  >
                    <q-item-section>百度测试2</q-item-section>
                  </q-item>
                </q-expansion-item>

                <q-expansion-item dense dense-toggle
                  :header-inset-level="headerInsetLevel"
                  :content-inset-level="contentInsetLevel" >
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-icon color="purple" name="signal_wifi_off" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>其他链接</q-item-label>
                    </q-item-section>
                  </template>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                  <q-item dense clickable tag="a" target="_blank" href="http://baidu.com">百度测试</q-item>
                </q-expansion-item>

              </q-expansion-item>

              <q-expansion-item group="topmenu"
                 :content-inset-level="contentInsetLevel" expand-separator>
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon color="purple" :name="mdiCallMade" />
                    <!-- <q-icon color="purple" :name="mdiCallMade" /> -->
                    <!-- <q-icon color="purple" name="img:img/logo.svg" /> -->
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>收件管理</q-item-label>
                  </q-item-section>
                </template>

                <q-expansion-item dense expand-separator :content-inset-level="0.5" icon="receipt" label="Receipts">

                  <q-expansion-item dense label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item dense label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Today" :content-inset-level="0.5">
                  </q-expansion-item>

                  <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                  </q-expansion-item>

                </q-expansion-item>

                <q-expansion-item :content-inset-level="0.5" expand-separator icon="schedule" label="Postponed">
                </q-expansion-item>

              </q-expansion-item>

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
            @click="leftDrawerMini = !leftDrawerMini"
            :icon="`${leftDrawerMini?'format_indent_increase':'format_indent_decrease'}`"
            aria-label="Menu"
            color="primary"
            size="sm"
          />
        </div>

      </q-drawer>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'
import SideMenu from 'components/SideMenu.vue'
// 演示引入其他图标
import { mdiCallMade } from '@quasar/extras/mdi-v5'

/*
 * title: 标题
 * caption: 副标题
 * icon: icon_name | img:image/path/image.png
 * icon_color: Color name for component from the Quasar Color Palette
 * link: 组件路径 | http://xxx.com/image.png
 * children: [{},{}]
 */
const menusData = [
  {
    title: 'Docs23',
    caption: 'quasar.dev',
    icon: 'school',
    icon_color: 'teal-10',
    children: [
      {
        title: 'Discord Chat Channel1',
        caption: 'chat.quasar.dev',
        icon: 'chat',
        link: 'https://chat.quasar.dev'
      },
      {
        title: 'Discord Chat Channel2',
        caption: 'chat.quasar.dev',
        icon: 'chat',
        link: 'https://chat.quasar.dev'
      }
    ]
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    icon_color: 'primary',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default {
  name: 'MainLayout',
  components: { SideMenu },
  data () {
    return {
      miniState: true,
      leftDrawerMini: false,
      leftDrawerOpen: true,
      leftSideMenuActive: '',
      contentInsetLevel: 0.7,
      headerInsetLevel: 0,
      leftSideMenus: menusData,
      mdiCallMade: mdiCallMade
    }
  },
  created () {
    // this.mdiCallMade = mdiCallMade
  },
  computed: {
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
  }
}
</script>

<style lang="scss" scoped>
  .left-side-menu-active {
    background-color: #d7d7d7;
    color: black;
  }
</style>

<style lang="sass" scoped>
.main-page-container
  position: absolute
  left: 0
  top: 50px
  right: 0
  bottom: 0
  overflow: hidden
  padding-top: 0px !important
.main-page-sidebar
  position: absolute
  border-right: 1px solid #eaebec
  background-color: #fff
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
.main-page-body
  position: absolute
  top: 0
  right: 0
  bottom: 0
  overflow-y: auto
  overflow-x: hidden
</style>
