import Component from '@ember/component';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitePageRouteContentPageComments
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean} True if viewing app in iOS Safari Webview. Otherwise false.
   */
  get isInIosUiWebView() {
    const isStandalone = window.navigator.standalone;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isSafari = /safari/.test(userAgent);
    const isIos = /iphone|ipod|ipad/.test(userAgent);

    return isIos && !isStandalone && !isSafari;
  },

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    if (
      this.get('--comments.length') === 0
      && this.get('--filterCommentsBy') === 'relevance'
    ) {
      this.get('--onFilterCommentsClick')('all');
    }
  },

  /**
   * Handles the load more comments click event
   *
   * @param {number} newLimit
   * @return {Promise} Resolves when the comments query has been updated
   */
  async handleLoadMoreCommentsClick(newLimit) {
    const pageId = await this.get('--comments.firstObject.page.id');

    this.get('--comments').set('query.filter', (reference) => {
      const db = reference.firestore;

      return reference
        .where('page', '==', db.collection('pages').doc(pageId))
        .orderBy('createdOn')
        .limit(newLimit);
    });

    return this.get('--comments').update();
  },

  /**
   * Shows open in safari toast
   */
  showOpenInSafariToast() {
    toast('Open this page in Safari to sign in');
  },
});
