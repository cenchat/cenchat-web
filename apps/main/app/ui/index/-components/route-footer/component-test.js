import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { stubService } from '@cenchat/utils/test-support';

module('Integration | Component | index/-components/route-footer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('router', stubService(this, 'router', { transitionTo() {}, urlFor() {} }));
  });

  test('nothing to test so far', async function (assert) {
    assert.expect(1);

    await render(hbs`{{index/-components/route-footer}}`);
    assert.ok(true);
  });
});
