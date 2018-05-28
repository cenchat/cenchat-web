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
    limit: 8,
  }),

  /**
   * @type {Array.<Model.Comment>}
   */
  approvedComments: hasMany('comment', {
    inverse: null,
    limit: 8,

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
        .orderBy('createdOn', 'desc');
    },
  }),

  /**
   * @type {Array.<Model.Comment>}
   */
  comments: hasMany('comment', {
    limit: 8,

    filter(reference) {
      return reference.orderBy('createdOn');
    },
  }),

  /**
   * @type {Array.<Model.Page>}
   */
  pages: hasMany('page', {
    limit: 8,

    filter(reference) {
      return reference.orderBy('createdOn', 'desc');
    },
  }),

  /**
   * @type {Array.<Model.Comment>}
   */
  rejectedComments: hasMany('comment', {
    inverse: null,
    limit: 8,

    buildReference(db) {
      return db.collection('comments');
    },

    filter(reference, record) {
      const db = reference.firestore;

      return reference
        .where('site', '==', db.collection('sites').doc(record.get('id')))
        .where('status', '==', 'rejected')
        .orderBy('createdOn', 'desc');
    },
  }),
});
