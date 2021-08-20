import { req } from './core'
import { unwrap } from '../utils/common'

/**
 * Check if a numeric value is between two values.
 * @param {Ref<Number> | Number} min
 * @param {Ref<Number> | Number} max
 * @return {function(*=): boolean}
 */
export default function (value, min, max) {
  return !req(value) ||
    ((!/\s/.test(value) || value instanceof Date) &&
      +unwrap(min) <= +value &&
      +unwrap(max) >= +value)
}
