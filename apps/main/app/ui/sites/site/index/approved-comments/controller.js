import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesSiteIndexApprovedComments
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @param {Model.Comment} comment
   * @function
   */
  async handleRejectCommentClick(comment) {
    comment.set('status', 'rejected');

    await comment.save();
    toast('Comment rejected');
  },
});
