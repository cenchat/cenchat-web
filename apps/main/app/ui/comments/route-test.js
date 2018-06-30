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
    test('should set headData of a non-text comment', async function (assert) {
      assert.expect(7);

      // Arrange
      const model = await this.store.findRecord('comment', 'comment_a');
      const route = this.owner.lookup('route:comments');

      // Act
      await route.afterModel(model);

      // Assert
      assert.equal(route.get('headData.title'), 'User A on Cenchat');
      assert.equal(route.get('headData.socialTitle'), 'User A on Cenchat');
      assert.equal(route.get('headData.description'), '&nbsp;');
      assert.equal(route.get('headData.image'), 'https://graph.facebook.com/fb_user_a/picture?type=large');
      assert.equal(route.get('headData.url'), 'https://cenchat.com/comments/comment_a');
      assert.equal(route.get('headData.type'), 'article');
      assert.equal(route.get('headData.author'), 'User A');
    });

    test('should set headData of a text comment', async function (assert) {
      assert.expect(7);

      // Arrange
      const model = await this.store.findRecord('comment', 'comment_b');
      const route = this.owner.lookup('route:comments');

      // Act
      await route.afterModel(model);

      // Assert
      assert.equal(route.get('headData.title'), 'Foobar');
      assert.equal(route.get('headData.socialTitle'), 'User B on Cenchat');
      assert.equal(route.get('headData.description'), 'Foobar');
      assert.equal(route.get('headData.image'), 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
      assert.equal(route.get('headData.url'), 'https://cenchat.com/comments/comment_b');
      assert.equal(route.get('headData.type'), 'article');
      assert.equal(route.get('headData.author'), 'User B');
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
