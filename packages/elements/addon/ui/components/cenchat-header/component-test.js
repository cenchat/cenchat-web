import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { stubService } from '@cenchat/utils/test-support';

module('Integration | Component | cenchat-header', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('router', stubService(this, 'router', { transitionTo() {}, urlFor() {} }));
  });

  test('should show yield', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{#cenchat-header responsive=true}}
        <div data-test="yield">Foo</div>
      {{/cenchat-header}}
    `);

    // Assert
    assert.dom('[data-test="yield"]').exists();
  });
});
