import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';

import createChatMessage from 'widget/utils/create-chat-message';

module('Unit | Utility | create-chat-message', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should create chat with gif as the first message when sending a gif', async function (assert) {
    assert.expect(12);

    // Arrange
    const model = {
      creator: null,
      description: null,
      isPublicized: false,
      lastActivityTimestamp: null,
      name: null,
      page: { id: 'site_100__page_100' },
      publicizedTitle: null,
      site: { id: 'site_100' },
    };

    // Act
    await createChatMessage(
      model,
      'gif_a',
      'tenor_gif',
      this.session.get('model.id'),
      this.db,
      this.store,
    );

    // Assert
    const chatDocSnapshot = await this.db.doc('chats/site_100__page_100__user_a').get();
    const chat = chatDocSnapshot.data();
    const userDocSnapshot = this.db.doc(`users/${this.session.get('model.id')}`);

    assert.equal(chat.isPublicized, false);
    assert.ok(chat.lastActivityTimestamp.toDate() instanceof Date);
    assert.equal(chat.publicizedTitle, null);
    assert.deepEqual(chat.creator, userDocSnapshot);
    assert.deepEqual(chat.page, this.db.doc('pages/site_100__page_100'));
    assert.deepEqual(chat.site, this.db.doc('sites/site_100'));

    const chatDocRef = this.db.doc(`chats/${chatDocSnapshot.id}`);
    const messagesQuerySnapshot = await this.db.collection('messages').where(
      'chat',
      '==',
      chatDocRef,
    ).get();
    const message = messagesQuerySnapshot.docs[0].data();

    assert.notEqual(message.createdOn, null);
    assert.deepEqual(message.media, { id: 'gif_a', type: 'tenor_gif' });
    assert.equal(message.text, null);
    assert.deepEqual(message.author, this.db.doc(`users/${this.session.get('model.id')}`));
    assert.deepEqual(message.chat, chatDocRef);
    assert.notEqual(this.store.get('message', messagesQuerySnapshot.docs[0].id), null);
  });

  test('should create chat with sticker as the first message when sending a sticker', async function (assert) {
    assert.expect(12);

    // Arrange
    const model = {
      creator: null,
      description: null,
      isPublicized: false,
      lastActivityTimestamp: null,
      name: null,
      page: { id: 'site_100__page_100' },
      publicizedTitle: null,
      site: { id: 'site_100' },
    };

    // Act
    await createChatMessage(
      model,
      'sticker_a1',
      'sticker',
      this.session.get('model.id'),
      this.db,
      this.store,
    );

    // Assert
    const chatDocSnapshot = await this.db.doc('chats/site_100__page_100__user_a').get();
    const chat = chatDocSnapshot.data();
    const userDocSnapshot = this.db.doc(`users/${this.session.get('model.id')}`);

    assert.equal(chat.isPublicized, false);
    assert.ok(chat.lastActivityTimestamp.toDate() instanceof Date);
    assert.equal(chat.publicizedTitle, null);
    assert.deepEqual(chat.creator, userDocSnapshot);
    assert.deepEqual(chat.page, this.db.doc('pages/site_100__page_100'));
    assert.deepEqual(chat.site, this.db.doc('sites/site_100'));

    const chatDocRef = this.db.doc(`chats/${chatDocSnapshot.id}`);

    const messagesQuerySnapshot = await this.db.collection('messages').where(
      'chat',
      '==',
      chatDocRef,
    ).get();
    const message = messagesQuerySnapshot.docs[0].data();

    assert.notEqual(message.createdOn, null);
    assert.deepEqual(message.media, { id: 'sticker_a1', type: 'sticker' });
    assert.equal(message.text, null);
    assert.deepEqual(message.author, this.db.doc(`users/${this.session.get('model.id')}`));
    assert.deepEqual(message.chat, chatDocRef);
    assert.notEqual(this.store.get('message', messagesQuerySnapshot.docs[0].id), null);
  });

  test('should create chat with text as the first message when sending a text', async function (assert) {
    assert.expect(12);

    // Arrange
    const model = {
      creator: null,
      description: null,
      isPublicized: false,
      lastActivityTimestamp: null,
      name: null,
      page: { id: 'site_100__page_100' },
      publicizedTitle: null,
      site: { id: 'site_100' },
    };

    // Act
    await createChatMessage(
      model,
      'foo',
      'text',
      this.session.get('model.id'),
      this.db,
      this.store,
    );

    // Assert
    const chatDocSnapshot = await this.db.doc('chats/site_100__page_100__user_a').get();
    const chat = chatDocSnapshot.data();
    const userDocSnapshot = this.db.doc(`users/${this.session.get('model.id')}`);

    assert.equal(chat.isPublicized, false);
    assert.ok(chat.lastActivityTimestamp.toDate() instanceof Date);
    assert.equal(chat.publicizedTitle, null);
    assert.deepEqual(chat.creator, userDocSnapshot);
    assert.deepEqual(chat.page, this.db.doc('pages/site_100__page_100'));
    assert.deepEqual(chat.site, this.db.doc('sites/site_100'));

    const chatDocRef = this.db.doc(`chats/${chatDocSnapshot.id}`);

    const messagesQuerySnapshot = await this.db.collection('messages').where(
      'chat',
      '==',
      chatDocRef,
    ).get();
    const message = messagesQuerySnapshot.docs[0].data();

    assert.notEqual(message.createdOn, null);
    assert.deepEqual(message.media, null);
    assert.equal(message.text, 'foo');
    assert.deepEqual(message.author, this.db.doc(`users/${this.session.get('model.id')}`));
    assert.deepEqual(message.chat, chatDocRef);
    assert.notEqual(this.store.get('message', messagesQuerySnapshot.docs[0].id), null);
  });

  test('should send gif message', async function (assert) {
    assert.expect(6);

    // Arrange
    const model = await this.store.get('chat', 'site_c__page_a__user_a');

    // Act
    await createChatMessage(
      model,
      'gif_a',
      'tenor_gif',
      this.session.get('model.id'),
      this.db,
      this.store,
    );

    // Assert
    const chatDocRef = this.db.doc('chats/site_c__page_a__user_a');
    const messagesQuerySnapshot = await this.db.collection('messages').where(
      'chat',
      '==',
      chatDocRef,
    ).get();
    const message = messagesQuerySnapshot.docs[messagesQuerySnapshot.docs.length - 1].data();

    assert.notEqual(message.createdOn, null);
    assert.deepEqual(message.media, { id: 'gif_a', type: 'tenor_gif' });
    assert.equal(message.text, null);
    assert.deepEqual(message.author, this.db.doc(`users/${this.session.get('model.id')}`));
    assert.deepEqual(message.chat, chatDocRef);
    assert.notEqual(this.store.get('message', messagesQuerySnapshot.docs[0].id), null);
  });

  test('should send sticker message', async function (assert) {
    assert.expect(6);

    // Arrange
    const model = await this.store.get('chat', 'site_c__page_a__user_a');

    // Act
    await createChatMessage(
      model,
      'sticker_a1',
      'sticker',
      this.session.get('model.id'),
      this.db,
      this.store,
    );

    // Assert
    const chatDocRef = this.db.doc('chats/site_c__page_a__user_a');
    const messagesQuerySnapshot = await this.db.collection('messages').where(
      'chat',
      '==',
      chatDocRef,
    ).get();
    const message = messagesQuerySnapshot.docs[messagesQuerySnapshot.docs.length - 1].data();

    assert.notEqual(message.createdOn, null);
    assert.deepEqual(message.media, { id: 'sticker_a1', type: 'sticker' });
    assert.equal(message.text, null);
    assert.deepEqual(message.author, this.db.doc(`users/${this.session.get('model.id')}`));
    assert.deepEqual(message.chat, chatDocRef);
    assert.notEqual(this.store.get('message', messagesQuerySnapshot.docs[0].id), null);
  });

  test('should send text message', async function (assert) {
    assert.expect(6);

    // Arrange
    const model = await this.store.get('chat', 'site_c__page_a__user_a');

    // Act
    await createChatMessage(
      model,
      'foo',
      'text',
      this.session.get('model.id'),
      this.db,
      this.store,
    );

    // Assert
    const chatDocRef = this.db.doc('chats/site_c__page_a__user_a');
    const messagesQuerySnapshot = await this.db.collection('messages').where(
      'chat',
      '==',
      chatDocRef,
    ).get();
    const message = messagesQuerySnapshot.docs[messagesQuerySnapshot.docs.length - 1].data();

    assert.notEqual(message.createdOn, null);
    assert.deepEqual(message.media, null);
    assert.equal(message.text, 'foo');
    assert.deepEqual(message.author, this.db.doc(`users/${this.session.get('model.id')}`));
    assert.deepEqual(message.chat, chatDocRef);
    assert.notEqual(this.store.get('message', messagesQuerySnapshot.docs[0].id), null);
  });
});
