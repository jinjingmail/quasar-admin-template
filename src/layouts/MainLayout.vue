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

        <!-- 右侧工具栏 -->
        <q-space ></q-space>
        <q-btn flat round dense icon="search" class="q-mr-xs" />
        <q-tabs
          :breakpoint="0"
          align="justify"
          indicator-color="transparent"
          outside-arrows
        >
          <q-tab
            name="notifications"
            icon="notifications"
            v-if="$q.screen.gt.sm"
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
          id="toolbar-user"
          flat
          dense
          no-caps
          stretch
          no-icon-animation
        >
          <template v-slot:label>
            <div class='text-center'>系统管理员</div>
            &nbsp;
            <q-avatar size="md">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </template>

          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
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

    <q-page-container class="main-page-container">

      <q-drawer class="main-page-sidebar full-height"
        v-model="leftDrawerOpen"
        side="left"
        show-if-above
        :width="240"
        :mini-width="50"
        :mini="miniCheck"
        @mouseover="leftDrawerMouseOver"
        @mouseout="leftDrawerMouseOut"
        :bordered="true"
        :breakpoint="500"
        :mini-to-overlay="miniToOverlay"
        content-class="#fff"
      >
        <div class="sidebar-body">
          <q-scroll-area class="fit">
            <q-list padding class="rounded-borders">
              <side-menu ref="menu" v-for="(item) in leftSideMenus" :item="item" :key="item.title" :level="1"/>
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

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
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
    link: '/',
    children: ''
  },
  {
    title: '子菜单1',
    icon: 'img:img/logo.svg',
    icon_color: 'teal-10',
    children: [
      {
        title: '子菜单11',
        icon: 'chat',
        link: 'https://chat.quasar.dev'
      },
      {
        title: '子菜单12',
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
            title: 'Page1',
            icon: 'chat',
            link: '/page1'
          }
        ]
      },
      {
        title: '子菜单22',
        icon: 'chat',
        children: [
          {
            title: 'Page2',
            icon: 'chat',
            link: '/page2'
          },
          {
            title: 'Page3',
            link: '/page3'
          }
        ]
      },
      {
        title: 'PageNotExist',
        icon: 'chat',
        link: '/page_not_exist'
      },
      {
        title: 'pageTableNormal',
        icon: 'star',
        link: '/pageTableNormal'
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
    icon: 'code',
    icon_color: 'primary',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
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
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: '其他菜单1',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: '其他菜单12',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: '其他菜单13',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: '其他菜单14',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: '其他菜单15',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: '其他菜单16',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: '其他菜单17',
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
      miniState: false,
      leftDrawerMini: false,
      leftDrawerOpen: false,
      leftSideMenus: menusData,
      mdiCallMade: mdiCallMade,

      scrollTarget: undefined,
      itemsMenu: [{}, {}, {}, {}, {}, {}, {}]
    }
  },
  created () {
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
