import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | comment', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('hook: model', () => {
    test('should return comment', async function (assert) {
      assert.expect(2);

      // Arrange
      const findRecordStub = sinon.stub().returns(stubPromise(true, 'foo'));
      const route = this.owner.lookup('route:comments');

      route.set('store', { findRecord: findRecordStub });

      // Act
      const result = await route.model({ comment_id: 'comment_a' });

      // Assert
      assert.ok(findRecordStub.calledWithExactly('comment', 'comment_a'));
      assert.equal(result, 'foo');
    });
  });

  module('hook: afterModel', () => {
    test('should set headData', async function (assert) {
      assert.expect(5);

      // Arrange
      const model = await this.store.findRecord('comment', 'comment_b');
      const author = await model.get('author');

      author.set('facebookId', 'foobar');

      const route = this.owner.lookup('route:comments');

      // Act
      await route.afterModel(model);

      // Assert
      assert.equal(route.get('headData.title'), 'User B on Cenchat');
      assert.equal(route.get('headData.description'), 'Foobar');
      assert.equal(route.get('headData.url'), 'https://cenchat.com/comments/comment_b');
      assert.equal(
        route.get('headData.image'),
        'https://graph.facebook.com/foobar/picture?type=large',
      );
      assert.equal(route.get('headData.type'), 'article');
    });

    test('should preload relationships', async function (assert) {
      assert.expect(3);

      // Arrange
      const model = await this.store.findRecord('comment', 'comment_b');
      const route = this.owner.lookup('route:comments');

      // Act
      await route.afterModel(model);

      // Assert
      assert.equal(model.get('author.displayName'), 'User B');
      assert.ok(model.get('parsedAttachments.length') > 0);
      assert.equal(model.get('page.url'), 'http://site-a.com/foo/bar');
    });
  });
});
