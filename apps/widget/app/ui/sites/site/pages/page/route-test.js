import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/pages/page', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should return page as model when it exists', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page');

    sinon.stub(route, 'modelFor').withArgs('sites.site').returns({ id: 'site_a' });

    // Act
    const result = await route.model({ page_postfix_id: 'page_a' });

    // Assert
    assert.equal(result.id, 'site_a__page_a');
  });

  test('should return create page and return it as model when it does not exist', async function (assert) {
    assert.expect(1);

    // Arrange
    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-stg.cloudfunctions.net/app/pages',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    const route = this.owner.lookup('route:sites/site/pages/page');

    sinon.stub(route, 'paramsFor').returns({ slug: '/slug' });
    sinon.stub(route, 'modelFor').withArgs('sites.site').returns({ id: 'site_a' });

    // Act
    const result = await route.model({ page_postfix_id: 'page_100' });

    // Assert
    assert.equal(result.id, 'site_a__page_100');
  });

  test('should return nothing when page and slug does not exist', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page');

    sinon.stub(route, 'modelFor').withArgs('sites.site').returns({ id: 'site_a' });

    // Act
    const result = await route.model({ page_postfix_id: 'page_100' });

    // Assert
    assert.equal(result, null);
  });

  test('should redirect to sites.site.pages.page.my-chat when model is available and transition target is sites.site.pages.page.index', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    // Act
    route.redirect({ id: 'site_a__page_a' }, { targetName: 'sites.site.pages.page.index' });

    // Assert
    assert.ok(transitionToStub.calledWithExactly('sites.site.pages.page.my-chat'));
  });

  test('should not redirect to sites.site.pages.page.my-chat when model is unavailable', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    // Act
    route.redirect();

    // Assert
    assert.ok(transitionToStub.notCalled);
  });

  test('should redirect to sites.site.pages.page.my-chat when transition target is not sites.site.pages.page.index', function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    // Act
    route.redirect({ id: 'site_a__page_a' }, { targetName: 'sites.site.pages.page.my-chat.index' });

    // Assert
    assert.ok(transitionToStub.notCalled);
  });
});
