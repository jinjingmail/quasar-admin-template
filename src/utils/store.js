import { Store } from '@/store'

/**
 * 查询字典值对应的label
 */
export function getDictLabel(dict, value) {
  const dicts = Store.getters['permission/dict']
  return dicts.label[dict][value]
}
