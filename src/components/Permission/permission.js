import { Store } from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    if (value && value instanceof Array && value.length > 0) {
      const roles = Store.getters['user/roles']
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      // throw new Error(`使用方式： v-permission="['admin','editor']"`)
      // eslint-disable-next-line quotes
      console.error(`need roles! Like v-permission="['admin','editor']"`)
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
