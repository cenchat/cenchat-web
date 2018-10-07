import { helper } from '@ember/component/helper';

/**
 * @param {Object} param0
 * @return {string} Photo URL
 */
export function getSiteImage([site]) {
  if (site && site.imageUrl) {
    return site.imageUrl;
  }

  return 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114';
}

/**
 * @param {Function} getSiteImage
 * @function
 */
export default helper(getSiteImage);
