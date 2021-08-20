import { req } from '../common'
import { unwrap } from '../utils/common'

/**
 * Check if value is below a threshold.
 * @param {Number | Ref<Number> | Ref<String>} max
 * @returns {function(*=): boolean}
 */
export default function (value, max) {
  return !req(value) ||
    ((!/\s/.test(value) || value instanceof Date) && +value <= +unwrap(max))
}
