import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { initialize } from '@cenchat/core/initializers/promise-to-rsvp-promise';

module('Unit | Initializer | promise-to-rsvp-promise', (hooks) => {
  setupTest(hooks);

  test('nothing to test', (assert) => {
    assert.expect(1);

    initialize();

    assert.ok(true);
  });
});
