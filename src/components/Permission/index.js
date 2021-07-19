import permission from './permission'

const install = function(Vue) {
  Vue.directive('permission', permission)
}

if (window.Vue) {
  // eslint-disable-next-line dot-notation
  window['permission'] = permission
  // eslint-disable-next-line no-undef
  Vue.use(install)
}

permission.install = install
export default permission
