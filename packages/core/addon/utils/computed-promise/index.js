import { computed } from '@ember/object';
import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

/**
 * @param {Function} callback
 * @param {...string} keys
 * @return {Promise} Resolves to the promise array
 * @function
 */
export function promiseArray(callback, ...keys) {
  return computed(...keys, {
    get() {
      const PromiseArray = ArrayProxy.extend(PromiseProxyMixin);

      return PromiseArray.create({ promise: callback(this) });
    },
  });
}

/**
 * @param {Function} callback
 * @param {...string} keys
 * @return {Promise} Resolves to the promise object
 * @function
 */
export function promiseObject(callback, ...keys) {
  return computed(...keys, {
    get() {
      const PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

      return PromiseObject.create({ promise: callback(this) });
    },
  });
}
