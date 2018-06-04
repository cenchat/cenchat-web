/**
 * @param {Application} appInstance
 * @function
 */
export function initialize(appInstance) {
  const fastboot = appInstance.lookup('service:fastboot');
  const config = appInstance.resolveRegistration('config:environment');

  if (
    fastboot
    && !fastboot.get('isFastBoot')
    && 'serviceWorker' in navigator
    && config.environment !== 'test'
  ) {
    navigator.serviceWorker.ready.then((registration) => {
      const firebase = appInstance.lookup('service:firebase');
      const messaging = firebase.messaging();

      messaging.useServiceWorker(registration);
      messaging.usePublicVapidKey(config.firebase.publicVapidKey);
    });
  }
}

export default {
  initialize,
};
