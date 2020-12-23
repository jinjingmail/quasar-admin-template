/* Layout */
import MainLayout from 'layouts/MainLayout.vue'
import BlankLayout from 'layouts/BlankLayout.vue'

/**
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu(default is false)
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if set noredirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)（必须跟'page.vue'中的name完全一致，包括大小写，才能正确keep-alive）
 * meta : {
    （不支持）roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    caption: '副标题'             可选
    icon: 'name|img:path|base64' the icon show in the sidebar
    icon_color: 'text-gray'      不填默认primary
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
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('pages/Index.vue'),
        meta: { title: '首页', icon: 'home', affix: true, noCache: true }
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
    path: '/user',
    component: () => import('layouts/LoginLayout.vue'),
    meta: { title: '用户', icon: 'account_circle' },
    children: [
      {
        path: 'login',
        name: 'user-login',
        component: () => import('pages/user/Login.vue'),
        meta: { title: '登录', icon: 'add', noCache: true }
      },
      {
        path: 'register',
        name: 'user-register',
        component: () => import('pages/user/Register.vue'),
        meta: { title: '注册', icon: 'add', noCache: true }
      }
    ]
  }, {
    path: '/needLogin',
    component: MainLayout,
    children: [
      {
        path: 'index',
        name: 'PageNeedLogin',
        component: () => import('pages/PageNeedLogin.vue'),
        meta: { auth: true, title: '登录后才能访问', icon: 'how_to_reg' }
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
        meta: { title: '图标', icon: 'insert_emoticon' }
      }
    ]
  }, {
    path: '/crud',
    component: MainLayout,
    name: 'CRUD',
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: 'CRUD', icon: 'add', caption: '通用crud' },
    children: [
      {
        path: 'pageCrud',
        name: 'PageCrud',
        component: () => import('pages/crud/PageCrud.vue'),
        meta: { title: 'PageCrud', icon: 'add', caption: '通用crud' }
      },
      {
        path: 'pageCrudCustom',
        name: 'PageCrudCustom',
        component: () => import('pages/crud/PageCrudCustom.vue'),
        meta: { title: 'PageCrudCustom', icon: 'add' }
      },
      {
        path: 'pageCrudCustom2',
        name: 'PageCrudCustom2',
        component: () => import('pages/crud/PageCrudCustom2.vue'),
        meta: { title: 'PageCrudCustom2', icon: 'add' }
      },
      {
        path: 'pageCrudCustom3',
        name: 'PageCrudCustom3',
        component: () => import('pages/crud/PageCrudCustom3.vue'),
        meta: { title: 'PageCrudCustom3', icon: 'add' }
      },
      {
        path: 'pageCrudCustom4',
        name: 'PageCrudCustom4',
        component: () => import('pages/crud/PageCrudCustom4.vue'),
        meta: { title: 'PageCrudCustom4', icon: 'add' }
      },
      {
        path: 'pageCrudDict',
        name: 'PageCrudDict',
        component: () => import('pages/crud/PageCrudDict.vue'),
        meta: { title: 'PageCrudDict', icon: 'add' }
      }
    ]
  }, {
    path: '/page',
    component: MainLayout,
    name: 'Page',
    redirect: 'noredirect',
    meta: { title: '页面展示', icon: 'web' },
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
        meta: { title: 'PageTable', icon: 'add', icon_color: 'yellow' }
      }, {
        path: 'pageSearchPopup',
        name: 'PageSearchPopup',
        component: () => import('pages/PageSearchPopup.vue'),
        meta: { title: 'PageSearchPopup', icon: 'add' }
      }, {
        path: 'pageSearchDialog',
        name: 'PageSearchDialog',
        component: () => import('pages/PageSearchDialog.vue'),
        meta: { title: 'PageSearchDialog', icon: 'add' }
      }, {
        path: 'pageTableNoData',
        name: 'pageTableNoData',
        component: () => import('pages/PageTableNoData.vue'),
        meta: { title: 'pageTableNoData', icon: 'add', noCache: true }
      }, {
        path: 'pageTreeTable',
        name: 'PageTreeTable',
        component: () => import('pages/PageTreeTable.vue'),
        meta: { title: 'pageTreeTable', icon: 'add', noCache: false }
      }, {
        path: 'pageTreeTable2',
        name: 'PageTreeTable2',
        component: () => import('pages/PageTreeTable2.vue'),
        meta: { title: 'pageTreeTable2', icon: 'add' }
      }, {
        path: 'pageSelect',
        name: 'PageSelect',
        component: () => import('pages/PageSelect.vue'),
        meta: { title: 'PageSelect', icon: 'add' }
      }, {
        path: 'pageTreeSelect',
        name: 'PageTreeSelect',
        component: () => import('pages/PageTreeSelect.vue'),
        meta: { title: 'PageTreeSelect', icon: 'add' }
      }
    ]
  }, {
    path: '/nested',
    component: MainLayout,
    name: 'Nested',
    redirect: 'noredirect',
    meta: { title: '嵌套页面', icon: 'clear_all' },
    children: [
      {
        path: 'nested1',
        component: BlankLayout,
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
            meta: { title: '嵌套页2很长的一个菜单标题', icon: 'add', affix: false }
          }
        ]
      },
      {
        path: 'nested2',
        name: 'Nested2',
        component: () => import('pages/nested/Page1.vue'),
        meta: { title: '嵌套2' }
      }
    ]
  }, {
    path: '/sales',
    component: MainLayout,
    name: 'Sales',
    children: [
      {
        path: 'invoices',
        name: 'SalesInvoices',
        component: () => import('pages/sales_invoices.vue'),
        meta: { title: 'SalesInvoices', icon: 'account_balance_wallet' }
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
        path: 'http://taobao.com',
        meta: { title: '淘宝', icon: 'link' }
      }
    ]
  }, {
    path: '/401',
    component: MainLayout,
    hidden: true,
    children: [
      { path: '', component: () => import('pages/Error401.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: MainLayout,
    hidden: true,
    children: [
      { path: '', component: () => import('pages/Error404.vue') }
    ]
  }
]

export default routes
