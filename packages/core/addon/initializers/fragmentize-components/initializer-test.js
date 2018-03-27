import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { initialize } from '@cenchat/core/initializers/fragmentize-components';

module('Unit | Initializer | fragmentize-components', (hooks) => {
  setupTest(hooks);

  test('nothing to test', (assert) => {
    assert.expect(1);

    initialize();

    assert.ok(true);
  });
});
