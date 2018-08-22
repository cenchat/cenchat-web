import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

import { setupTestState } from '@cenchat/core/test-support';

module('Unit | Route | sites/site/index', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should redirect to sites.site.pages.page with the page ID when querying for page is successful', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/index');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    sinon.stub(route, 'paramsFor').returns({ slug: '/foo/bar' });
    sinon.stub(route, 'modelFor').withArgs('sites.site').returns({ id: 'site_a' });

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(transitionToStub.calledWithExactly('sites.site.pages.page', 'page_a'));
  });

  test('should redirect to sites.site.pages.page with the new page ID when creating a new page succeeds', async function (assert) {
    assert.expect(1);

    // Arrange
    const server = sinon.fakeServer.create();

    server.respondImmediately = true;

    server.respondWith(
      'POST',
      'https://us-central1-cenchat-stg.cloudfunctions.net/app/pages',
      [200, { 'Content-Type': 'application/json' }, ''],
    );

    const route = this.owner.lookup('route:sites/site/index');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    sinon.stub(route, 'paramsFor').returns({ slug: '/slug' });
    sinon.stub(route, 'modelFor').withArgs('sites.site').returns({ id: 'site_a' });

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(transitionToStub.calledWith('sites.site.pages.page'));
  });

  test('should not redirect to sites.site.pages.page when slug is unavailable', async function (assert) {
    assert.expect(1);

    // Arrange
    const route = this.owner.lookup('route:sites/site/index');
    const transitionToStub = sinon.stub(route, 'transitionTo');

    // Act
    await route.beforeModel();

    // Assert
    assert.ok(transitionToStub.notCalled);
  });
});
