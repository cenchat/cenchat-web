import { module, test } from 'qunit';
import { settled } from '@ember/test-helpers';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

import { setupTestState, stubPromise } from '@cenchat/core/test-support';

module('Unit | Model | comment', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('getter/setter: authorOrAnonymous', () => {
    test('should return author when available', function (assert) {
      assert.expect(2);

      // Arrange
      const author = this.store.createRecord('user', { displayName: 'Foo', provider: {} });
      const model = this.store.createRecord('comment', { author });

      // Act
      const result = model.authorOrAnonymous;

      // Assert
      assert.equal(result.get('displayName'), 'Foo');
      assert.equal(result.get('avatarUrl'), 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
    });

    test('should return anonymous author when author is not available', function (assert) {
      assert.expect(2);

      // Arrange
      const model = this.store.createRecord('comment', {});

      // Act
      const result = model.authorOrAnonymous;

      // Assert
      assert.equal(result.displayName, 'Anonymous');
      assert.equal(result.avatarUrl, 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
    });
  });

  module('getter/setter: isMessageValid', () => {
    test('should return true if text is available', function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('comment', { text: 'Foo' });

      // Act
      const result = model.isMessageValid;

      // Assert
      assert.equal(result, true);
    });

    test('should return true if attachments is available', function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('comment', { attachments: ['Foo'] });

      // Act
      const result = model.isMessageValid;

      // Assert
      assert.equal(result, true);
    });

    test('should return false if attachments and text are unavailable', function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('comment', {});

      // Act
      const result = model.isMessageValid;

      // Assert
      assert.equal(result, false);
    });
  });

  module('getter/setter: isFromFollowing', () => {
    test('should return true when comment is from a following', async function (assert) {
      assert.expect(2);

      // Arrange
      const isFollowingStub = sinon.stub().returns(stubPromise(true, true));
      const author = this.store.createRecord('user', { id: 'user_100' });
      const model = this.store.createRecord('comment', {
        author,
        session: {
          model: { isFollowing: isFollowingStub },
        },
      });

      // Act
      await model.get('isFromFollowing');

      return settled().then(() => {
        // Assert
        assert.ok(isFollowingStub.calledWithExactly('user_100'));
        assert.equal(model.get('isFromFollowing'), true);
      });
    });

    test('should return false when comment isn\'t from a following', async function (assert) {
      assert.expect(2);

      // Arrange
      const isFollowingStub = sinon.stub().returns(stubPromise(true, false));
      const author = this.store.createRecord('user', { id: 'user_100' });
      const model = this.store.createRecord('comment', {
        author,
        session: {
          model: { isFollowing: isFollowingStub },
        },
      });

      // Act
      await model.get('isFromFollowing');

      return settled().then(() => {
        // Assert
        assert.ok(isFollowingStub.calledWithExactly('user_100'));
        assert.equal(model.get('isFromFollowing'), false);
      });
    });

    test('should return false when comment does not have an author', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('comment', {
        session: {
          model: {},
        },
      });

      // Act
      await model.get('isFromFollowing');

      return settled().then(() => {
        // Assert
        assert.equal(model.get('isFromFollowing'), false);
      });
    });

    test('should return false when session model is unavailable', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('comment', {
        session: { model: null },
      });

      // Act
      const result = await model.get('isFromFollowing');

      // Assert
      assert.equal(result, false);
    });
  });

  module('getter/setter: isLetMeKnowAllowed', () => {
    test('should return true the author is a site admin', function (assert) {
      assert.expect(1);

      // Arrange
      const author = this.store.createRecord('user', { id: 'user_100' });
      const model = this.store.createRecord('comment', { author });

      author.set('isSiteAdmin', sinon.stub().returns(stubPromise(true, true)));

      // Act
      model.get('isLetMeKnowAllowed');

      return settled().then(() => {
        // Arrange
        assert.equal(model.get('isLetMeKnowAllowed'), true);
      });
    });

    test('should return false the author isn\'t a site admin', function (assert) {
      assert.expect(1);

      // Arrange
      const author = this.store.createRecord('user', { id: 'user_100' });
      const model = this.store.createRecord('comment', { author });

      author.set('isSiteAdmin', sinon.stub().returns(stubPromise(true, false)));

      // Act
      model.get('isLetMeKnowAllowed');

      return settled().then(() => {
        // Arrange
        assert.equal(model.get('isLetMeKnowAllowed'), false);
      });
    });
  });

  module('getter/setter: isTextAllowed', () => {
    test('should return true when comment already has a text', function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('comment', { text: 'Foobar' });

      // Act
      const result = model.get('isTextAllowed');

      // Arrange
      assert.equal(result, true);
    });

    test('should return true when replying to an is let me know type comment', function (assert) {
      assert.expect(1);

      // Arrange
      const replyTo = this.store.createRecord('comment', {
        id: 'comment_100',
        isLetMeKnow: true,
      });
      const model = this.store.createRecord('comment', { replyTo });

      // Act
      model.get('isTextAllowed');

      return settled().then(() => {
        // Arrange
        assert.equal(model.get('isTextAllowed'), true);
      });
    });

    test('should return true when replying to a follower', function (assert) {
      assert.expect(1);

      // Arrange
      const author = this.store.createRecord('user', { id: 'user_100' });

      author.set('hasFollower', () => stubPromise(true, true));

      const replyTo = this.store.createRecord('comment', { id: 'comment_100', author });
      const model = this.store.createRecord('comment', { author, replyTo });

      // Act
      model.get('isTextAllowed');

      return settled().then(() => {
        // Arrange
        assert.equal(model.get('isTextAllowed'), true);
      });
    });

    test('should return true when not replying to a follower and is a site admin', function (assert) {
      assert.expect(1);

      // Arrange
      const author = this.store.createRecord('user', { id: 'user_100' });

      author.set('hasFollower', () => stubPromise(true, false));
      author.set('isSiteAdmin', () => stubPromise(true, true));

      const replyTo = this.store.createRecord('comment', { author });
      const model = this.store.createRecord('comment', { author, replyTo });

      // Act
      model.get('isTextAllowed');

      return settled().then(() => {
        // Arrange
        assert.equal(model.get('isTextAllowed'), true);
      });
    });

    test('should return false when not replying to a follower and not a site admin', function (assert) {
      assert.expect(1);

      // Arrange
      const author = this.store.createRecord('user', { id: 'user_100' });

      author.set('hasFollower', () => stubPromise(true, false));
      author.set('isSiteAdmin', () => stubPromise(true, false));

      const replyTo = this.store.createRecord('comment', { author });
      const model = this.store.createRecord('comment', { author, replyTo });

      // Act
      model.get('isTextAllowed');

      return settled().then(() => {
        // Arrange
        assert.equal(model.get('isTextAllowed'), false);
      });
    });

    test('should return false when replying to has not author', function (assert) {
      assert.expect(1);

      // Arrange
      const author = this.store.createRecord('user', { id: 'user_100' });
      const replyTo = this.store.createRecord('comment', { id: 'comment_100' });
      const model = this.store.createRecord('comment', { author, replyTo });

      // Act
      model.get('isTextAllowed');

      return settled().then(() => {
        // Arrange
        assert.equal(model.get('isTextAllowed'), false);
      });
    });
  });

  module('getter/setter: parsedAttachments', () => {
    test('should return the model equivalent for attachments', async function (assert) {
      assert.expect(1);

      // Arrange
      const sticker = this.store.createRecord('sticker', { id: 'sticker_a' });
      const model = this.store.createRecord('comment', {
        store: {
          findRecord: sinon.stub().returns(stubPromise(true, sticker)),
        },

        attachments: [{ id: 'sticker_a', type: 'sticker' }],
      });

      // Act
      const result = await model.get('parsedAttachments');

      // Assert
      assert.deepEqual(result, [sticker]);
    });

    test('should return the model equivalent for tenor gifs', async function (assert) {
      assert.expect(1);

      // Arrange
      const server = sinon.fakeServer.create();

      server.autoRespond = true;
      server.autoRespondAfter = 0;

      server.respondWith(
        'GET',
        'https://api.tenor.com/v1/gifs?ids=gif_a&key=OZ2DM5UOGY8A&media_filter=minimal',
        [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            results: [
              {
                media: [
                  {
                    tinygif: {
                      dims: [120, 100],
                      url: 'http://example.com/image.gif',
                    },
                  },
                ],
                title: 'wow',
                id: 12345,
              },
            ],
          }),
        ],
      );

      const model = this.store.createRecord('comment', {
        attachments: [{ id: 'gif_a', type: 'tenor_gif' }],
      });

      // Act
      const result = await model.get('parsedAttachments');

      // Assert
      assert.deepEqual(result, [
        {
          id: 12345,
          description: 'wow',
          height: 100,
          imageUrl: 'http://example.com/image.gif',
          type: 'tenor_gif',
          width: 120,
        },
      ]);
    });
  });

  module('getter/setter: parsedTaggedEntities', () => {
    test('should return the model equivalent for tagged user entities', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = this.store.createRecord('user', { id: 'user_100' });
      const model = this.store.createRecord('comment', {
        store: {
          findRecord: sinon.stub().returns(stubPromise(true, user)),
        },

        taggedEntities: { user_a: 'user' },
      });

      // Act
      const result = await model.get('parsedTaggedEntities');

      // Assert
      assert.deepEqual(result, [user]);
    });
  });

  module('getter/setter: replies', () => {
    test('should return directReplies when root is available', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = await this.store.findRecord('comment', 'comment_b');

      // Act
      const result = model.get('replies');

      // Assert
      assert.deepEqual(result, model.get('directReplies'));
    });

    test('should return rootReplies when root is unavailable', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = await this.store.findRecord('comment', 'comment_a');

      // Act
      const result = model.get('replies');

      // Assert
      assert.deepEqual(result, model.get('rootReplies'));
    });
  });
});
