import RSVP from 'rsvp';

/**
 * Overrides some window APIs
 *
 * For Promise, see: https://github.com/emberjs/rfcs/issues/175
 */
export function initialize() {
  window.Promise = RSVP.Promise;
}

export default {
  initialize,
};
