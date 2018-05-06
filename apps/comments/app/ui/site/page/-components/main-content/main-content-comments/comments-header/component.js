import Component from '@ember/component';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitePageMainContentCommentsHeader
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  get isInIosUiWebView() {
    const isStandalone = window.navigator.standalone;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isSafari = /safari/.test(userAgent);
    const isIos = /iphone|ipod|ipad/.test(userAgent);

    return isIos && !isStandalone && !isSafari;
  },

  /**
   * @function
   */
  showOpenInSafariToast() {
    toast('Open this page in Safari to sign in');
  },
});
