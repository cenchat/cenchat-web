import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

module('Unit | Route | profile/followings', function(hooks) {
  setupTest(hooks);

  module('hook: model', function() {
    test('should return profile followings', async function(assert) {
      assert.expect(1);

      // Arrange
      const followings = [];
      const modelForProfile = EmberObject.create({ followings, id: 'user_a' });
      const route = this.owner.lookup('route:profile/followings');

      route.set('session', {
        model: { id: 'user_a' },
      });
      route.set('modelFor', sinon.stub().returns(modelForProfile));

      // Act
      const result = await route.model();

      // Assert
      assert.deepEqual(result, followings);
    });
  });
});
