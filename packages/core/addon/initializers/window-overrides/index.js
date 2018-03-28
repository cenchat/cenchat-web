import RSVP from 'rsvp';

import fetch from 'fetch';

/**
 * Overrides some window APIs
 *
 * For Promise, see: https://github.com/emberjs/rfcs/issues/175
 */
export function initialize() {
  window.Promise = RSVP.Promise;
  window.fetch = fetch;
}

export default {
  initialize,
};
