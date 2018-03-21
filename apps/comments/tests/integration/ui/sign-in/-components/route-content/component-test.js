import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | sign-in/-components/route content', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    this.set('pageUrl', 'http://foobar.com');
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show <SignInForm />', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sign-in-form');

    // Act
    await render(hbs`
      {{sign-in/-components/route-content --pageUrl=pageUrl}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {});
  });
});
