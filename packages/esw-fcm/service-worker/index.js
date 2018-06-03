import { firebaseVersion, messagingSenderId } from '@cenchat/esw-fcm/service-worker/config';

importScripts(`https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-app.js`);
importScripts(`https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-messaging.js`);

firebase.initializeApp({ messagingSenderId });
firebase.messaging();
