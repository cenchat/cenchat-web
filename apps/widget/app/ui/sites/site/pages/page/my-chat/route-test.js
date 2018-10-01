import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/pages/page/my-chat', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should redirect to sites.site.pages.page.chats when current user is a site admin', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page/my-chat');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    sinon.stub(route, 'modelFor').withArgs('sites.site').returns({ admins: [{ id: 'user_a' }] });

    // Act
    route.beforeModel();

    // Assert
    assert.ok(transitionToStub.calledWithExactly('sites.site.pages.page.chats'));
  });

  test('should not redirect to sites.site.pages.page.chats when current user is not a site admin', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page/my-chat');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    sinon.stub(route, 'modelFor').withArgs('sites.site').returns({ admins: [] });

    // Act
    route.beforeModel();

    // Assert
    assert.ok(transitionToStub.notCalled);
  });

  test('should return chat of current user as the model if it exists', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page/my-chat');

    sinon.stub(route, 'modelFor').withArgs('sites.site.pages.page').returns({
      id: 'site_c__page_a',
    });

    // Act
    const result = await route.model();

    // Assert
    assert.equal(result.id, 'site_c__page_a__user_a');
  });

  test('should return an empty as the model if chat for current user does not exist', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page/my-chat');

    sinon.stub(route, 'modelFor').withArgs('sites.site.pages.page').returns({
      id: 'site_100__page_100',
      site: { id: 'site_100' },
    });

    // Act
    const result = await route.model();

    // Assert
    assert.deepEqual(result, {
      creator: null,
      isPublicized: false,
      lastActivityTimestamp: null,
      lastMessage: null,
      page: {
        id: 'site_100__page_100',
        site: { id: 'site_100' },
      },
      publicizedTitle: null,
      site: { id: 'site_100' },
    });
  });

  test('should redirect to sites.site.pages.page.my-chat.messages when chat of current user exists', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page/my-chat');
    const transitionToStub = sinon.stub(route, 'transitionTo');
    const model = await this.store.get('chat', 'site_c__page_a__user_a');

    // Act
    await route.redirect(model);

    // Assert
    assert.ok(transitionToStub.calledWithExactly('sites.site.pages.page.my-chat.messages'));
  });

  test('should not redirect to sites.site.pages.page.my-chat.messages when chat of current user does not exist', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page/my-chat');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    // Act
    route.redirect({
      creator: null,
      description: null,
      isPublicized: false,
      lastActivityTimestamp: null,
      name: null,
      page: {
        id: 'site_100__page_100',
        site: { id: 'site_100' },
      },
      publicizedTitle: null,
      site: { id: 'site_100' },
    });

    // Assert
    assert.ok(transitionToStub.notCalled);
  });
});
