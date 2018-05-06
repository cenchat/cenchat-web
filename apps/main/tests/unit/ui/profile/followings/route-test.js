import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

module('Unit | Route | profile/followings', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should return followings of profile route model', async function (assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:profile/followings');

      route.set('modelFor', sinon.stub().withArgs('profile').returns({
        user: EmberObject.create({ followings: 'foo' }),
      }));

      // Act
      const result = await route.model();

      // Assert
      assert.equal(result, 'foo');
    });
  });
});
