import { computed } from '@ember/object';
import Component from '@ember/component';

import moment from 'moment';

import layout from './template';

/**
 * @class ChatContentTimeGroupList
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: '',

  /**
   * @type {Array.<Object>}
   */
  sortedMessages: computed('args', {
    get() {
      return this.args.messages.sort((a, b) => a.createdOn - b.createdOn);
    },
  }),

  /**
   * @type {Array.<Object>}
   */
  groups: computed('args', {
    get() {
      const groups = [];

      if (Array.isArray(this.args.messages)) {
        this.sortedMessages.forEach((message) => {
          const { createdOn } = message;
          const groupByDayForMessage = groups.find((groupByDay) => {
            const startDate = moment(groupByDay.timestamp);
            const endDate = moment(groupByDay.timestamp).endOf('day');

            if (moment(createdOn).isBetween(startDate, endDate, null, '[]')) {
              return true;
            }

            return false;
          });

          if (groupByDayForMessage) {
            const { authors } = groupByDayForMessage;
            const lastAuthor = authors[authors.length - 1];

            if (lastAuthor.id === message.author.id) {
              lastAuthor.messages.push(message);
            } else {
              authors.push({
                id: message.author.id,
                displayName: message.author.displayName,
                photoUrl: message.author.photoUrl,
                messages: [message],
              });
            }
          } else {
            groups.push({
              timestamp: createdOn,
              authors: [
                {
                  id: message.author.id,
                  displayName: message.author.displayName,
                  photoUrl: message.author.photoUrl,
                  messages: [message],
                },
              ],
            });
          }
        });

        return groups;
      }

      return [];
    },
  }),
});
