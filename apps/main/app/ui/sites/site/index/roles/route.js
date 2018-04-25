import RSVP from 'rsvp';
import Route from '@ember/routing/route';

/**
 * @class SitesSiteIndexRoles
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model() {
    const site = this.modelFor('sites.site.index');

    return RSVP.hash({ site, admins: site.get('admins') });
  },

  /**
   * @override
   */
  setupController(controller, model) {
    this._super(controller, model);

    controller.set('usersWithRole', model.admins);
  },
});
