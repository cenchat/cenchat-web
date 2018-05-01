import { hasMany } from 'ember-data/relationships';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * @class Site
 * @namespace Model
 * @extends DS.Model
 */
export default Model.extend({
  /**
   * @type {string}
   */
  hostname: attr('string'),

  /**
   * @type {string}
   */
  imageUrl: attr('string'),

  /**
   * @type {boolean}
   */
  isVerified: attr('boolean'),

  /**
   * @type {string}
   */
  name: attr('string'),

  /**
   * @type {string}
   */
  theme: attr('string'),

  /**
   * @type {Array.<Model.User>}
   */
  admins: hasMany('user', {
    inverse: 'sitesAsAdmin',

    filter(reference) {
      return reference.limit(8);
    },
  }),

  /**
   * @type {Array.<Model.Comment>}
   */
  approvedComments: hasMany('comment', {
    inverse: null,

    buildReference(db) {
      return db.collection('comments');
    },

    filter(reference, record) {
      const db = reference.firestore;

      return reference
        .where('site', '==', db.collection('sites').doc(record.get('id')))
        .where('status', '==', 'approved')
        .where('text', '>', '')
        .orderBy('text')
        .orderBy('createdOn', 'desc')
        .limit(8);
    },
  }),

  /**
   * @type {Array.<Model.Comment>}
   */
  comments: hasMany('comment', {
    filter(reference) {
      return reference.orderBy('createdOn').limit(8);
    },
  }),

  /**
   * @type {Array.<Model.Page>}
   */
  pages: hasMany('page', {
    filter(reference) {
      return reference.orderBy('createdOn', 'desc').limit(8);
    },
  }),

  /**
   * @type {Array.<Model.Comment>}
   */
  rejectedComments: hasMany('comment', {
    inverse: null,

    buildReference(db) {
      return db.collection('comments');
    },

    filter(reference, record) {
      const db = reference.firestore;

      return reference
        .where('site', '==', db.collection('sites').doc(record.get('id')))
        .where('status', '==', 'rejected')
        .orderBy('createdOn', 'desc')
        .limit(8);
    },
  }),
});
