import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { settled } from '@ember/test-helpers';
import { setupTest } from 'ember-qunit';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';
import sinon from 'sinon';

import {
  getFixtureData,
  stubPromise,
  stubSession,
} from '@cenchat/core/test-support';

module('Unit | Model | comment', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    mockFirebase(this.owner, getFixtureData());
    stubSession(this);
  });

  module('getter/setter: isMessageValid', () => {
    test('should return true if text is available', function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        text: 'Foo',
      }));

      // Act
      const result = model.get('isMessageValid');

      // Assert
      assert.equal(result, true);
    });

    test('should return true if attachments is available', function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        attachments: ['Foo'],
      }));

      // Act
      const result = model.get('isMessageValid');

      // Assert
      assert.equal(result, true);
    });

    test('should return false if attachments and text are unavailable', function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {}));

      // Act
      const result = model.get('isMessageValid');

      // Assert
      assert.equal(result, false);
    });
  });

  module('getter/setter: isFromFollowing', () => {
    test('should return true when comment is from a following', async function (assert) {
      assert.expect(2);

      // Arrange
      const isFollowingStub = sinon.stub().returns(stubPromise(true, true));
      const author = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user_a',
      }));
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        author,
        session: { model: { isFollowing: isFollowingStub } },
      }));

      // Act
      await model.get('isFromFollowing');

      return settled().then(() => {
        // Assert
        assert.ok(isFollowingStub.calledWithExactly('user_a'));
        assert.equal(model.get('isFromFollowing'), true);
      });
    });

    test('should return false when comment isn\'t from a following', async function (assert) {
      assert.expect(2);

      // Arrange
      const isFollowingStub = sinon.stub().returns(stubPromise(true, false));
      const author = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user_a',
      }));
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        author,
        session: { model: { isFollowing: isFollowingStub } },
      }));

      // Act
      await model.get('isFromFollowing');

      return settled().then(() => {
        // Assert
        assert.ok(isFollowingStub.calledWithExactly('user_a'));
        assert.equal(model.get('isFromFollowing'), false);
      });
    });

    test('should return false when session model is unavailable', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        session: { model: null },
      }));

      // Act
      const result = await model.get('isFromFollowing');

      // Assert
      assert.equal(result, false);
    });
  });

  module('getter/setter: isAskMeAnythingAllowed', () => {
    test('should return true the author is a site admin', function (assert) {
      assert.expect(1);

      // Arrange
      const author = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user',
      }));
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        author,
      }));

      author.set('isSiteAdmin', sinon.stub().returns(stubPromise(true, true)));

      // Act
      model.get('isAskMeAnythingAllowed');

      return settled().then(() => {
        // Arrange
        assert.equal(model.get('isAskMeAnythingAllowed'), true);
      });
    });

    test('should return false the author isn\'t a site admin', function (assert) {
      assert.expect(1);

      // Arrange
      const author = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user',
      }));
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        author,
      }));

      author.set('isSiteAdmin', sinon.stub().returns(stubPromise(true, false)));

      // Act
      model.get('isAskMeAnythingAllowed');

      return settled().then(() => {
        // Arrange
        assert.equal(model.get('isAskMeAnythingAllowed'), false);
      });
    });
  });

  module('getter/setter: isTextAllowed', () => {
    test('should return true when comment already has a text', function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        text: 'Foobar',
      }));

      // Act
      const result = model.get('isTextAllowed');

      // Arrange
      assert.equal(result, true);
    });

    test('should return true when replying to an is ask me anything type comment', function (assert) {
      assert.expect(1);

      // Arrange
      const replyTo = run(() => this.owner.lookup('service:store').createRecord('comment', {
        id: 'comment_a',
        isAskMeAnything: true,
      }));
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        replyTo,
      }));

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
      const author = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user',
      }));
      const replyTo = run(() => this.owner.lookup('service:store').createRecord('comment', {
        id: 'comment_a',
        author,
      }));
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        author,
        replyTo,
      }));

      author.set('hasFollower', () => stubPromise(true, true));

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
      const author = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user',
      }));
      const replyTo = run(() => this.owner.lookup('service:store').createRecord('comment', {
        author,
      }));
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        author,
        replyTo,
      }));

      author.set('hasFollower', () => stubPromise(true, false));
      author.set('isSiteAdmin', () => stubPromise(true, true));

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
      const author = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user',
      }));
      const replyTo = run(() => this.owner.lookup('service:store').createRecord('comment', {
        author,
      }));
      const model = run(() => this.owner.lookup('service:store').createRecord('comment', {
        author,
        replyTo,
      }));

      author.set('hasFollower', () => stubPromise(true, false));
      author.set('isSiteAdmin', () => stubPromise(true, false));

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
      const store = this.owner.lookup('service:store');
      const sticker = run(() => store.createRecord('sticker', { id: 'sticker_a' }));
      const model = run(() => store.createRecord('comment', {
        store: {
          findRecord: sinon.stub().returns(stubPromise(true, sticker)),
        },

        attachments: [{ id: 'sticker_a', type: 'sticker' }],
      }));

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
                    tinygif: { url: 'http://example.com/image.gif' },
                  },
                ],
                title: 'wow',
                id: 12345,
              },
            ],
          }),
        ],
      );

      const store = this.owner.lookup('service:store');
      const model = run(() => store.createRecord('comment', {
        attachments: [{ id: 'gif_a', type: 'tenor_gif' }],
      }));

      // Act
      const result = await model.get('parsedAttachments');

      // Assert
      assert.deepEqual(result, [
        {
          id: 12345,
          description: 'wow',
          imageUrl: 'http://example.com/image.gif',
          type: 'tenor_gif',
        },
      ]);
    });
  });

  module('getter/setter: parsedTaggedEntities', () => {
    test('should return the model equivalent for tagged user entities', async function (assert) {
      assert.expect(1);

      // Arrange
      const store = this.owner.lookup('service:store');
      const user = run(() => store.createRecord('user', { id: 'user_a' }));
      const model = run(() => store.createRecord('comment', {
        store: {
          findRecord: sinon.stub().returns(stubPromise(true, user)),
        },

        taggedEntities: { user_a: 'user' },
      }));

      // Act
      await model.get('parsedTaggedEntities');

      // Assert
      return settled().then(() => {
        assert.deepEqual(model.get('parsedTaggedEntities'), [user]);
      });
    });
  });

  module('getter/setter: replies', () => {
    test('should return directReplies when root is available', async function (assert) {
      assert.expect(1);

      // Arrange
      const store = this.owner.lookup('service:store');
      const model = await run(() => store.findRecord('comment', 'comment_b'));

      // Act
      const result = model.get('replies');

      // Assert
      assert.deepEqual(result, model.get('directReplies'));
    });

    test('should return rootReplies when root is unavailable', async function (assert) {
      assert.expect(1);

      // Arrange
      const store = this.owner.lookup('service:store');
      const model = await run(() => store.findRecord('comment', 'comment_a'));

      // Act
      const result = model.get('replies');

      // Assert
      assert.deepEqual(result, model.get('rootReplies'));
    });
  });
});
