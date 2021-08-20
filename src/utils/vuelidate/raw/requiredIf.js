import { req } from './core'
import { unwrap } from '../common'

const validate = (prop, val) => prop ? req(val) : true
/**
 * Returns required if the passed property is truthy
 * @param {Boolean | String | function(any): Boolean | Ref<string | boolean>} propOrFunction
 * @return {function(value: *, parentVM: object): Boolean}
 */
export default function requiredIf (value, propOrFunction) {
  if (typeof propOrFunction !== 'function') {
    return validate(unwrap(propOrFunction), value)
  }
  const result = propOrFunction.call(this, value)
  return validate(result, value)
}
