import { computed } from '@ember/object';
import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

/**
 * @param {string} type
 * @param {string} name
 * @param {Function} callback
 * @param {...string} keys
 * @return {Ember.ComputedProperty} Resolves to the computed property
 * @function
 */
export function computedPromise(type, name, callback, ...keys) {
  const underscorePrefixedName = `_${name}`;

  return computed(...keys, {
    get() {
      callback(this).then(value => this.set(name, value));

      if (!this[underscorePrefixedName]) {
        if (type === 'array') {
          this.set(underscorePrefixedName, []);
        } else if (type === 'object') {
          this.set(underscorePrefixedName, {});
        }
      }

      return this[underscorePrefixedName];
    },

    set(key, value) {
      this.set(underscorePrefixedName, value);

      return value;
    },
  });
}

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
