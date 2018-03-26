import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | docs/installation/-components/route content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    this.set('platform', 'Universal');
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show <BloggerGuide /> when platform is blogger', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('platform', 'Blogger');

    const spy = spyComponent(this, 'docs/installation/-components/route-content/blogger-guide');

    // Act
    await render(hbs`
      {{docs/installation/-components/route-content --platform=platform}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should show <UniversalGuide /> when platform is universal', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('platform', 'Universal');

    const spy = spyComponent(this, 'docs/installation/-components/route-content/universal-guide');

    // Act
    await render(hbs`
      {{docs/installation/-components/route-content --platform=platform}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
  });
});
