import { helper } from '@ember/component/helper';

/**
 * @param {Object} param0
 * @return {string} Photo URL
 */
export function getUserDisplayName([user]) {
  if (user && user.displayName) {
    return user.displayName;
  }

  return 'Anonymous';
}

/**
 * @param {Function} getUserDisplayName
 * @function
 */
export default helper(getUserDisplayName);
