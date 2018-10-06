import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | profile/-components/route-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('user', this.session.get('model'));
  });

  test('should show <UserInfo />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile/-components/route-content/user-info');

    // Act
    await render(hbs`{{profile/-components/route-content --user=user}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, { user: 'object' });
  });
});
