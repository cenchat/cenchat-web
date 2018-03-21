import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | profile/-components/route-content/missing info', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('user', { missingInfo: ['username'] });
    this.set('onUsernameSubmit', () => {});
  });

  test('should show <MissingInfoUsername /> when username is missing', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile/-components/route-content/missing-info/missing-info-username');

    // Act
    await render(hbs`
      {{profile/-components/route-content/missing-info
          --user=user
          --onUsernameSubmit=(action onUsernameSubmit)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      'onUsernameSubmit': 'function',
    });
  });

  test('should hide <MissingInfoUsername /> when username is not missing', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('user.missingInfo', []);

    const spy = spyComponent(this, 'profile/-components/route-content/missing-info/missing-info-username');

    // Act
    await render(hbs`
      {{profile/-components/route-content/missing-info
          --user=user
          --onUsernameSubmit=(action onUsernameSubmit)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });
});
