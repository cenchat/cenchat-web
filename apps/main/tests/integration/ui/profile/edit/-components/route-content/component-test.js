import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | profile/edit/-components/route content', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const user = await this.get('session.model');

    this.set('user', user);
    this.set('onProfileFormSubmit', () => {});
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show <ProfileForm />', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile/edit/-components/route-content/profile-form');

    // Act
    await render(hbs`
      {{profile/edit/-components/route-content
          --user=user
          --onProfileFormSubmit=(action onProfileFormSubmit)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      'user': 'instance',
      'onProfileFormSubmit': 'function',
    });
  });
});
