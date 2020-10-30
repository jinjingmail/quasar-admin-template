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
        :mini-width="50"
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
              <side-menu v-for="(item) in leftSideMenus" :item="item" :key="item.title" :level="1"/>
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
    title: '首页',
    caption: null,
    icon: 'code',
    icon_color: 'primary',
    link: 'xhttps://github.com/quasarframework',
    children: ''
  },
  {
    title: '子菜单1',
    caption: 'quasar.dev',
    icon: 'img:img/logo.svg',
    icon_color: 'teal-10',
    children: [
      {
        title: '子菜单11',
        caption: 'chat.quasar.dev',
        icon: 'chat',
        link: 'https://chat.quasar.dev'
      },
      {
        title: '子菜单12',
        caption: 'chat.quasar.dev',
        icon: 'chat',
        link: 'https://chat.quasar.dev'
      }
    ]
  },
  {
    title: '子菜单2',
    caption: 'quasar.dev',
    icon: 'menu',
    icon_color: 'teal-10',
    children: [
      {
        title: '子菜单21',
        icon: 'chat',
        children: [
          {
            title: '子菜单211',
            icon: 'chat',
            link: 'report_1'
          }
        ]
      },
      {
        title: '子菜单22',
        icon: 'chat',
        children: [
          {
            title: '子菜单221',
            icon: 'chat',
            link: 'report_2'
          },
          {
            title: '子菜单222',
            link: 'report_3'
          }
        ]
      },
      {
        title: '子菜单23',
        icon: 'chat',
        link: 'https://chat.quasar.dev'
      },
      {
        title: '子菜单24',
        icon: 'chat',
        link: 'https://chat.quasar.dev'
      }
    ]
  },
  {
    title: '子菜单3',
    icon: 'school',
    icon_color: 'teal-10',
    children: [
      {
        title: '子菜单31',
        icon: 'chat',
        link: 'https://chat.quasar.dev'
      },
      {
        title: '子菜单32',
        link: 'https://chat.quasar.dev'
      },
      {
        title: '子菜单33',
        icon: 'chat',
        children: [
          {
            title: '子子菜单331',
            link: 'https://chat.quasar.dev'
          },
          {
            title: '子子菜单332',
            link: 'https://chat.quasar.dev'
          }
        ]
      },
      {
        title: '子菜单34',
        caption: 'chat.quasar.dev',
        icon: 'chat',
        children: [
          {
            title: '子子菜单341',
            link: 'https://chat.quasar.dev'
          },
          {
            title: '子子菜单342',
            link: 'https://chat.quasar.dev'
          }
        ]
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
    title: '其他菜单1',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: '其他菜单2',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: '其他菜单3',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: '其他菜单4',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: '其他菜单5',
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
