import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent, stubService } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/index/-components/route content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const user = await this.get('session.model');

    this.set('router', stubService(this, 'router'));
    this.set('user', user);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show <SiteCollection /> for sites as admin', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/index/-components/route-content/site-collection');

    // Act
    await render(hbs`
      {{sites/index/-components/route-content --router=router --user=user}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      router: 'instance',
      sites: 'instance',
    });
  });
});
