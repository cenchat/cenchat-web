import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupTest } from 'ember-qunit';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';

import { getFixtureData } from '@cenchat/core/test-support';

module('Unit | Model | notification', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    mockFirebase(this.owner, getFixtureData());
  });

  module('function: getCommentTagVisitLink', function() {
    test('should return the page url where the comment belongs', async function(assert) {
      assert.expect(1);

      // Arrange
      const store = this.owner.lookup('service:store');
      const model = await run(() => {
        return store.findRecord('notification', 'notification_b');
      });

      // Act
      const result = await run(() => {
        return model.getCommentTagVisitLink();
      });

      // Assert
      assert.equal(
        result,
        'http://site-a.com/foo/bar?cenchat_comment=comment_a',
      );
    });
  });
});
