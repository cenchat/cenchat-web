import { helper } from '@ember/component/helper';

/**
 * @param {Object} param0
 * @return {string} Photo URL
 */
export function getUserPhoto([user]) {
  if (user && user.photoUrl) {
    return user.photoUrl;
  }

  return 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114';
}

/**
 * @param {Function} getUserPhoto
 * @function
 */
export default helper(getUserPhoto);
