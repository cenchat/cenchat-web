import firebase from 'firebase';

/**
 * @param {Object} chat
 * @param {firebase.firestore.DocumentReference} messageDocRef
 * @param {string} content
 * @param {string} type
 * @param {string} currentUserId
 * @param {firebase.firestore} db
 * @param {firebase.firestore.WriteBatch} batch
 * @return {Object} Message
 * @function
 */
function batchCreateMessage(chat, messageDocRef, content, type, currentUserId, db, batch) {
  const message = {
    media: type !== 'text' ? { type, id: content } : null,
    text: type === 'text' ? content : null,
  };

  batch.set(messageDocRef, {
    ...message,
    author: db.doc(`users/${currentUserId}`),
    chat: db.doc(`chats/${chat.id}`),
    createdOn: firebase.firestore.FieldValue.serverTimestamp(),
  });

  return {
    ...message,
    id: messageDocRef.id,
    author: currentUserId,
    chat: chat.id,
    createdOn: new Date(),
  };
}

/**
 * @param {Object} chat
 * @param {firebase.firestore.DocumentReference} messageDocRef
 * @param {string} currentUserId
 * @param {firebase.firestore} db
 * @param {firebase.firestore.WriteBatch} batch
 * @return {Object} Chat
 * @function
 */
function batchCreateChat(chat, messageDocRef, currentUserId, db, batch) {
  const chatDocRef = db.doc(`chats/${chat.page.id}__${currentUserId}`);

  batch.set(chatDocRef, {
    creator: db.doc(`users/${currentUserId}`),
    isPublicized: chat.isPublicized,
    lastActivityTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    lastMessage: messageDocRef,
    page: db.doc(`pages/${chat.page.id}`),
    publicizedTitle: chat.publicizedTitle,
    site: db.doc(`sites/${chat.site.id}`),
  }, { merge: true });

  return {
    ...chat,
    id: chatDocRef.id,
    creator: currentUserId,
    lastActivityTimestamp: new Date(),
    lastMessage: messageDocRef.id,
    page: chat.page.id,
    site: chat.site.id,
  };
}

/**
 * @param {Object} chat
 * @param {Object} message
 * @param {Ember.Service} store
 * @function
 */
function updateChatAndMessageStates(chat, message, store) {
  const batch = store.batch();

  if (chat) {
    batch.set('chat', chat);
  }

  if (message) {
    batch.set('message', message);
  }

  batch.commit();
}

/**
 * @param {Object} chat
 * @param {string} content
 * @param {string} type
 * @param {string} currentUserId
 * @param {firebase.firestore} db
 * @param {Ember.Service} store
 * @function
 */
export default async function createChatMessage(chat, content, type, currentUserId, db, store) {
  const batch = db.batch();
  const messageDocRef = db.collection('messages').doc();
  const newChat = batchCreateChat(chat, messageDocRef, currentUserId, db, batch);
  const message = batchCreateMessage(
    newChat,
    messageDocRef,
    content,
    type,
    currentUserId,
    db,
    batch,
  );

  await batch.commit();
  updateChatAndMessageStates(newChat, message, store);
}
