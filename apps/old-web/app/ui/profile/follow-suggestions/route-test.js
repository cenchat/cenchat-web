import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Route | profile/follow-suggestions', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should return following suggestions for profile route model', async function (assert) {
      assert.expect(1);

      // Arrange
      const route = this.owner.lookup('route:profile/follow-suggestions');

      route.set('modelFor', sinon.stub().withArgs('profile').returns({
        user: {
          getUnfollowedFacebookFriends: sinon.stub().returns('foo'),
        },
      }));

      // Act
      const result = await route.model();

      // Assert
      assert.equal(result, 'foo');
    });
  });
});
