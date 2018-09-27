// import { belongsTo } from 'ember-data/relationships';
// import { computed } from '@ember/object';
// import { inject } from '@ember/service';
// import Model from 'ember-data/model';
// import attr from 'ember-data/attr';

// /**
//  * @class Page
//  * @namespace Model
//  * @extends DS.Model
//  */
// export default Model.extend({
//   /**
//    * @type {Date}
//    */
//   createdOn: attr('timestamp'),

//   /**
//    * @type {string}
//    */
//   description: attr('string'),

//   /**
//    * @type {string}
//    */
//   imageUrl: attr('string'),

//   /**
//    * @type {string}
//    */
//   slug: attr('string'),

//   /**
//    * @type {string}
//    */
//   title: attr('string'),

//   /**
//    * @type {Model.Site}
//    */
//   site: belongsTo('site'),

//   /**
//    * @type {Ember.Service}
//    */
//   session: inject(),

//   /**
//    * @type {string}
//    */
//   decodedSlug: computed('slug', {
//     get() {
//       return decodeURIComponent(this.slug);
//     },
//   }),

//   /**
//    * @type {string}
//    */
//   shortId: computed('id', {
//     get() {
//       return this.id.split('__')[1];
//     },
//   }),

//   /**
//    * @type {string}
//    */
//   url: computed('site.hostname', {
//     get() {
//       const hostname = this.get('site.hostname');

//       return hostname ? `http://${hostname}${this.decodedSlug}` : null;
//     },
//   }),

//   /**
//    * @param {string} filterBy
//    * @return {Promise} Comments
//    * @function
//    */
//   loadFilteredComments(filterBy) {
//     const { id: pageId } = this;

//     if (filterBy === 'all') {
//       return this.store.query('comment', {
//         queryId: `${pageId}_all_comments`,
//         limit: 2,

//         filter(reference) {
//           const db = reference.firestore;

//           return reference
//             .where('page', '==', db.collection('pages').doc(pageId))
//             .where('status', '==', 'approved')
//             .orderBy('createdOn');
//         },
//       });
//     }

//     const { id: currentUserId } = this.session.get('model');

//     return this.store.query('comment', {
//       queryId: `${pageId}_${currentUserId}_relevant_comments`,
//       limit: 2,

//       buildReference(db) {
//         return db
//           .collection('users')
//           .doc(currentUserId)
//           .collection('followingComments');
//       },

//       filter(reference) {
//         const db = reference.firestore;
//         return reference
//           .where('page', '==', db.collection('pages').doc(pageId))
//           .where('status', '==', 'approved')
//           .orderBy('createdOn');
//       },
//     });
//   },
// });

import { Model } from 'ember-daux/daux';

/**
 * @class Page
 * @namespace Model
 * @extends Daux.Core.Model
 */
export default class Page extends Model {
  /**
   * @override
   */
  static get attributes() {
    return [
      'createdOn',
      'description',
      'imageUrl',
      'slug',
      'title',
    ];
  }

  /**
   * @override
   */
  static get relationship() {
    return {
      chats: {
        type: 'chat',
        kind: 'hasMany',
        inverse: 'page',
      },
      site: {
        type: 'site',
        kind: 'belongsTo',
        inverse: 'pages',
      },
    };
  }

  /**
   * @override
   */
  static deserialize(record) {
    if (typeof record === 'object' && record !== null && record.data) {
      if (record.exists) {
        const page = record.data();
        const createdOn = page.createdOn.toDate ? page.createdOn.toDate() : page.createdOn;

        return {
          ...page,
          createdOn,
          id: record.id,
          site: page.site.id,
        };
      }

      return null;
    }

    return record;
  }
}
