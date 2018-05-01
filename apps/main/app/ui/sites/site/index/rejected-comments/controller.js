import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesSiteIndexRejectedComments
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @param {Model.Comment} comment
   * @function
   */
  async handleApproveCommentClick(comment) {
    comment.set('status', 'approved');

    await comment.save();
    toast('Comment approved');
  },
});
