import { getOwner } from '@ember/application';

import CloudFirestoreSerializer from 'ember-cloud-firestore-adapter/serializers/cloud-firestore';

export default CloudFirestoreSerializer.extend({
  /**
   * @override
   */
  serialize(snapshot, options) {
    const config = getOwner(this).resolveRegistration('config:environment');
    const json = this._super(snapshot, options);

    if (config.environment !== 'test') {
      for (const attribute of ['replyTo', 'root']) {
        if (json[attribute] && json[attribute].includes('followingComments')) {
          const id = json[attribute].split('/').pop();

          json[attribute] = `comments/${id}`;
        }
      }
    }

    return json;
  },
});
