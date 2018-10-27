import { getOwner } from '@ember/application';
import Component from '@ember/component';

/**
 * @class IndexRouteContent
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    const config = getOwner(this).resolveRegistration('config:environment');
    const embedElement = document.createElement('script');

    embedElement.src = `${config.widgetHost}/embeds/1.0.0/universal.js`;

    document.body.appendChild(embedElement);
  },
});
