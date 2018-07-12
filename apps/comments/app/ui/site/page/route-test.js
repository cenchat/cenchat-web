import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { setupTestState, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | site/page', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', function () {
    test('should fetch page', async function (assert) {
      assert.expect(2);

      // Arrange
      const stub = sinon.stub().returns(stubPromise(true, ('foo')));
      const site = EmberObject.create({ id: 'site_a' });
      const route = this.owner.lookup('route:site/page');

      route.set('store', { findRecord: stub });
      route.set('modelFor', sinon.stub().returns(site));

      // Act
      const result = await route.model({ page_id: 'page_a' });

      // Assert
      assert.ok(stub.calledWithExactly('page', 'site_a__page_a'));
      assert.deepEqual(result, { page: 'foo' });
    });

    test('should fetch comment when available in the params', async function (assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub();

      stub.withArgs('comment', 'comment_a').returns(stubPromise(true, 'foo'));
      stub.withArgs('page', 'site_a__page_a').returns(stubPromise(true, 'bar'));

      const site = EmberObject.create({ id: 'site_a' });
      const route = this.owner.lookup('route:site/page');

      route.set('store', { findRecord: stub });
      route.set('modelFor', sinon.stub().returns(site));

      // Act
      const result = await route.model({
        comment: 'comment_a',
        page_id: 'page_a',
      });

      // Assert
      assert.deepEqual(result, { comment: 'foo', page: 'bar' });
    });

    test('should create new page and use it as the model when it does not exist', async function (assert) {
      assert.expect(3);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true, ('foo')));
      const createRecordStub = sinon.stub().returns({ save: saveStub });
      const site = EmberObject.create({ id: 'site_a' });
      const route = this.owner.lookup('route:site/page');

      route.set('store', {
        createRecord: createRecordStub,
        findRecord: sinon.stub().returns(stubPromise(false)),
      });
      route.set('modelFor', sinon.stub().returns(site));
      route.set('paramsFor', sinon.stub().returns({ slug: '/slug' }));

      // Act
      const result = await route.model({ page_id: 'page_a' });

      // Assert
      assert.ok(createRecordStub.calledWithExactly(
        'page',
        {
          site,
          id: 'site_a__page_a',
          slug: '%2Fslug',
        },
      ));
      assert.ok(saveStub.calledWithExactly({ adapterOptions: { onServer: true } }));
      assert.deepEqual(result, { page: 'foo' });
    });

    test('should not create a new page when page doesn\'t exist and slug is unavailable', async function (assert) {
      assert.expect(2);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true, ('foo')));
      const createRecordStub = sinon.stub().returns({ save: saveStub });
      const site = EmberObject.create({ id: 'site_a' });
      const route = this.owner.lookup('route:site/page');

      route.set('store', {
        createRecord: createRecordStub,
        findRecord: sinon.stub().returns(stubPromise(false)),
      });
      route.set('modelFor', sinon.stub().returns(site));
      route.set('paramsFor', sinon.stub().returns({ slug: null }));

      // Act
      const result = await route.model({ page_id: 'page_a' });

      // Assert
      assert.ok(createRecordStub.notCalled);
      assert.deepEqual(result, { page: null });
    });
  });

  module('hook: redirect', function () {
    test('should redirect to site.page.comments with relevance filter when in index route and is authenticated', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:site/page');

      route.set('session.isAuthenticated', true);
      route.set('transitionTo', transitionToStub);

      // Act
      await route.redirect(null, { targetName: 'site.page.index' });

      // Assert
      assert.ok(transitionToStub.calledWithExactly('site.page.comments', {
        queryParams: { filter: 'relevance' },
      }));
    });

    test('should redirect to site.page.comments with no filter when in index route and is unauthenticated', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:site/page');

      route.set('session.isAuthenticated', false);
      route.set('transitionTo', transitionToStub);

      // Act
      await route.redirect(null, { targetName: 'site.page.index' });

      // Assert
      assert.ok(transitionToStub.calledWithExactly('site.page.comments', {
        queryParams: { filter: null },
      }));
    });
  });
});
