import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Route | profile/edit', (hooks) => {
  setupTest(hooks);

  test('should return profile route model as the model', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:profile/edit');

    route.set('modelFor', sinon.stub().withArgs('profile').returns('foo'));

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result, 'foo');
  });
});
