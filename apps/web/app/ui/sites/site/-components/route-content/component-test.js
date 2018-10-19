import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | sites/site/-components/route-content', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('site', await this.store.get('site', 'site_a'));
    this.set('onVerifySiteClick', () => false);
  });

  test('should show <VerifySite /> when site is not verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', false);

    const spy = spyComponent(this, 'sites/site/-components/route-content/verify-site');

    // Act
    await render(hbs`
      {{sites/site/-components/route-content
        --site=site
        --onVerifySiteClick=(action onVerifySiteClick)
      }}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { site: 'object', onVerifySiteClick: 'function' });
  });

  test('should hide <VerifySite /> when site is verified', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/-components/route-content/verify-site');

    // Act
    await render(hbs`
      {{sites/site/-components/route-content
        --site=site
        --onVerifySiteClick=(action onVerifySiteClick)
      }}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show docs when site is verified', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/-components/route-content
        --site=site
        --onVerifySiteClick=(action onVerifySiteClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-route-content="docs"]').exists();
  });

  test('should hide docs when site is not verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', false);

    // Act
    await render(hbs`
      {{sites/site/-components/route-content
        --site=site
        --onVerifySiteClick=(action onVerifySiteClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-route-content="docs"]').doesNotExist();
  });
});
