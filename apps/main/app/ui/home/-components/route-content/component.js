import { getOwner } from '@ember/application';
import { inject } from '@ember/service';
import Component from '@ember/component';

/**
 * @class HomeRouteContent
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  fastboot: inject(),

  /**
   * @override
   */
  tagName: '',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set(
      'config',
      getOwner(this).resolveRegistration('config:environment'),
    );
  },

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    const embedElement = document.createElement('script');

    embedElement.src = `${this.get('config.commentsHost')}/embeds/1.0.0/universal.js`;

    document.body.appendChild(embedElement);
  },
});
