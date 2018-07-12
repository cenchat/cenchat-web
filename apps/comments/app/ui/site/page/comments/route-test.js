import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | site/page/comments', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', function () {
    hooks.beforeEach(async function () {
      const page = await this.store.findRecord('page', 'site_a__page_a');

      this.set('modelFor', sinon.stub().withArgs('site.page').returns({ page }));
    });

    test('should fetch all types of comments limited by 2 when filter is not provided', async function (assert) {
      assert.expect(2);

      // Arrange
      const comment = await this.store.findRecord('comment', 'comment_a');
      const route = this.owner.lookup('route:site/page/comments');

      route.set('modelFor', this.modelFor);

      // Act
      const result = await route.model({});

      // Assert
      assert.deepEqual(result.firstObject, comment);
      assert.deepEqual(result.length, 2);
    });

    test('should fetch relevant comments limited by 2 when filtering by relevance', async function (assert) {
      assert.expect(2);

      // Arrange
      const comment = await this.store.findRecord('comment', 'comment_b');
      const route = this.owner.lookup('route:site/page/comments');

      route.set('modelFor', this.modelFor);

      // Act
      const result = await route.model({ filter: 'relevance' });

      // Assert
      assert.deepEqual(result.firstObject, comment);
      assert.deepEqual(result.length, 2);
    });
  });

  module('hook: redirect', function () {
    test('should transition to same route without a filter when available, visiting route for the first time, and model is empty', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:site/page/comments');

      route.set('paramsFor', sinon.stub().returns({ filter: 'relevance' }));
      route.set('transitionTo', transitionToStub);

      // Act
      await route.redirect(EmberObject.create({ length: 0 }));

      // Assert
      assert.ok(transitionToStub.calledWithExactly('site.page.comments', {
        queryParams: { filter: null },
      }));
    });

    test('should not transition to same route without a filter when not available', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:site/page/comments');

      route.set('paramsFor', sinon.stub().returns({ filter: null }));
      route.set('transitionTo', transitionToStub);

      // Act
      await route.redirect(EmberObject.create({ length: 0 }));

      // Assert
      assert.ok(transitionToStub.notCalled);
    });

    test('should not transition to same route without a filter when not visiting for the first time', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:site/page/comments');

      route.set('isFirstVisit', false);
      route.set('paramsFor', sinon.stub().returns({ filter: 'relevance' }));
      route.set('transitionTo', transitionToStub);

      // Act
      await route.redirect(EmberObject.create({ length: 0 }));

      // Assert
      assert.ok(transitionToStub.notCalled);
    });

    test('should not transition to same route without a filter when model is not empty', async function (assert) {
      assert.expect(1);

      // Arrange
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:site/page/comments');

      route.set('paramsFor', sinon.stub().returns({ filter: 'relevance' }));
      route.set('transitionTo', transitionToStub);

      // Act
      await route.redirect(EmberObject.create({ length: 5 }));

      // Assert
      assert.ok(transitionToStub.notCalled);
    });
  });
});
