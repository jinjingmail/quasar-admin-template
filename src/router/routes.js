
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'page1', component: () => import('pages/Page1.vue') },
      { path: 'page2', component: () => import('pages/Page2.vue') },
      { path: 'page3', component: () => import('pages/Page3.vue') },
      { path: 'pageTable', component: () => import('pages/PageTable.vue') },
      { path: 'pageTree', component: () => import('pages/PageTree.vue') },
      { path: 'pageIcons', component: () => import('pages/PageIcons.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Error404.vue') }
    ]
  }
]

export default routes
