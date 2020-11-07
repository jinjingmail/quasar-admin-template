/* Layout */
import MainLayout from 'layouts/MainLayout.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu(default is false)
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    （不支持）roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view (default is false)
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('pages/Index.vue'),
        meta: { title: '首页', icon: 'index', affix: true }
      }
    ]
  }, {
    path: '/hiddenMenu',
    component: MainLayout,
    hidden: true
  }, {
    path: '/hiddenMenu2',
    component: MainLayout,
    children: [
      {
        path: 'index',
        name: 'hiddenMenu2',
        hidden: true,
        component: () => import('pages/PageIcons.vue'),
        meta: { title: '隐藏页面', icon: 'add' }
      }
    ]
  }, {
    path: '/hiddenMenu3',
    component: MainLayout,
    children: [
      {
        path: 'index1',
        name: 'hiddenMenu31',
        hidden: true,
        component: () => import('pages/PageIcons.vue'),
        meta: { title: '隐藏页面', icon: 'add' }
      },
      {
        path: 'index2',
        name: 'hiddenMenu32',
        hidden: true,
        component: () => import('pages/PageIcons.vue'),
        meta: { title: '隐藏页面', icon: 'add' }
      }
    ]
  }, {
    path: '/pageIcon',
    component: MainLayout,
    name: 'PageIcon',
    alwaysShow: false,
    meta: { title: '应用图标' },
    children: [
      {
        path: 'index',
        name: 'PageIconShow',
        component: () => import('pages/PageIcons.vue'),
        meta: { title: '图标', icon: 'add' }
      }
    ]
  }, {
    path: '/page',
    component: MainLayout,
    name: 'Page',
    meta: { title: '页面展示', icon: 'menu' },
    children: [
      {
        path: 'page1',
        name: 'Page1',
        component: () => import('pages/Page1.vue'),
        meta: { title: 'Page1', icon: 'add' }
      }, {
        path: 'page2',
        name: 'page2',
        hidden: true,
        component: () => import('pages/page2.vue'),
        meta: { title: 'page2', icon: 'add' }
      }, {
        path: 'page3',
        name: 'page3',
        component: () => import('pages/page3.vue'),
        meta: { title: 'page3', icon: 'add' }
      }, {
        path: 'pageTable',
        name: 'PageTable',
        component: () => import('pages/PageTable.vue'),
        meta: { title: 'PageTable', icon: 'add' }
      }, {
        path: 'pageTree',
        name: 'PageTree',
        component: () => import('pages/PageTree.vue'),
        meta: { title: 'PageTree', icon: 'add', noCache: true }
      }
    ]
  }, {
    path: '/nested',
    component: MainLayout,
    name: 'Nested',
    meta: { title: '嵌套页面' },
    children: [
      {
        path: 'nested1',
        component: () => import('pages/nested/Layout.vue'),
        name: 'Nested1',
        meta: { title: '嵌套1' },
        children: [
          {
            path: 'page1',
            name: 'NestedPage1',
            component: () => import('pages/nested/Page1.vue'),
            meta: { title: '嵌套页1', icon: 'add' }
          }, {
            path: 'page2',
            name: 'NestedPage2',
            component: () => import('pages/nested/Page2.vue'),
            meta: { title: '嵌套页2', icon: 'add', affix: false }
          }
        ]
      },
      {
        path: 'nested2',
        name: 'Nested2',
        component: () => import('pages/nested/Page1.vue'),
        meta: { title: '嵌套2', icon: 'add' }
      }
    ]
  }, {
    path: 'http://baidu.com',
    component: MainLayout,
    meta: { title: '百度', icon: 'link' }
  }, {
    path: 'external-link2',
    component: MainLayout,
    children: [
      {
        path: 'http://baidu.com',
        meta: { title: '百度', icon: 'link' }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: MainLayout,
    children: [
      { path: '', component: () => import('pages/Error404.vue') }
    ]
  }
]

export default routes
