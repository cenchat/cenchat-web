import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/index/new/-components/route content', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const user = await this.get('session.model');

    this.set('user', user);
    this.set('onSiteFormSubmit', () => {});
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show <SiteForm />', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/index/new/-components/route-content/site-form');

    // Act
    await render(hbs`
      {{sites/index/new/-components/route-content
          --user=user
          --onSiteFormSubmit=(action onSiteFormSubmit)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      'onSiteFormSubmit': 'function',
    });
  });
});
