import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/new', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should create site', async function (assert) {
    assert.expect(3);

    // Arrange
    const controller = this.owner.lookup('controller:sites/new');

    sinon.stub(controller, 'transitionToRoute');

    // Act
    await controller.handleSiteFormSubmit({
      brandColor: '#000',
      displayName: 'Foo',
      hostname: 'foo.com',
      theme: 'light',
    }, {
      preventDefault: sinon.stub(),
    });

    // Assert
    const siteQuerySnapshot = await this.db
      .collection('sites')
      .where('hostname', '==', 'foo.com')
      .get();

    assert.equal(siteQuerySnapshot.size, 1);
    assert.deepEqual(siteQuerySnapshot.docs[0].data(), {
      brandColor: '#000',
      displayName: 'Foo',
      hostname: 'foo.com',
      imageUrl: null,
      isVerified: false,
      name: 'foo',
      theme: 'light',
    });
    assert.notEqual(await this.store.get('site', siteQuerySnapshot.docs[0].id), null);
  });
});
