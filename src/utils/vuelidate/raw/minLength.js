import { req, len } from './core'
import { unwrap } from '../utils/common'

/**
 * Check if value is above a threshold.
 * @param {Number | Ref<Number>} length
 * @returns {function(Array|Object|String): boolean}
 */
export default function (value, length) {
  return !req(value) || len(value) >= unwrap(length)
}
