import { bind, cancel, later } from '@ember/runloop';
import RSVP from 'rsvp';

let toastElement;
let buttonElement;
let currentTeardownSchedule;
let currentScheduledAction;

/**
 * Shows a toast
 *
 * @param {string} text
 * @param {number} [duration=5000]
 * @param {Object} [buttonOptions={}]
 */
export default async function toast(text, duration = 5000, buttonOptions = {}) {
  toastElement = document.querySelector('.ce-toast');

  if (toastElement) {
    const toastTextElement = document.querySelector('.ce-toast__text');

    if (toastElement.hasAttribute('opened')) {
      cancel(currentTeardownSchedule);
      triggerScheduledAction();
      toastElement.removeAttribute('opened');
      await waitForToastElementTransition();
    }

    toastTextElement.innerHTML = text;
    teardownButtonElement();
    setupButtonElement(buttonOptions);
    toastElement.setAttribute('opened', true);
    currentScheduledAction = buttonOptions.scheduledAction;
    scheduleToastTeardown(duration);
  }
}

/**
 * Schedules a toast's teardown
 *
 * @param {number} duration
 */
function scheduleToastTeardown(duration) {
  currentTeardownSchedule = later(() => {
    toastElement.removeAttribute('opened');
    triggerScheduledAction();
    teardownButtonElement();
  }, duration);
}

/**
 * Waits for a toast element to finish it's transition
 *
 * @return {Promise} Resolves after the toast element's transition
 */
function waitForToastElementTransition() {
  return new RSVP.Promise((resolve) => {
    const onTransitionEnd = bind(this, (event) => {
      if (event.currentTarget === toastElement) {
        toastElement.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      }
    });

    toastElement.addEventListener('transitionend', onTransitionEnd);
  });
}

/**
 * Setup a toast's button element
 *
 * @param {Object} options
 */
function setupButtonElement(options) {
  if (options.hasOwnProperty('text')) {
    buttonElement = document.createElement('button');

    buttonElement.classList.add('ce-button');
    buttonElement.classList.add('ce-toast__button');

    const innerContainer = document.createElement('div');

    innerContainer.innerHTML = options.text;

    buttonElement.appendChild(innerContainer);
    buttonElement.addEventListener('click', bind(this, () => {
      options.action();
      cancel(currentTeardownSchedule);
      toastElement.removeAttribute('opened');
    }));

    toastElement.appendChild(buttonElement);
  }
}

/**
 * Removes the button element
 */
function teardownButtonElement() {
  if (buttonElement) {
    toastElement.removeChild(buttonElement);
    buttonElement = null;
  }
}

/**
 * Triggers the scheduled action
 */
function triggerScheduledAction() {
  if (currentScheduledAction) {
    currentScheduledAction();
  }
}
