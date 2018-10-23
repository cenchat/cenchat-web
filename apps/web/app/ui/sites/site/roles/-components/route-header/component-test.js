import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/roles/-components/route-header', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('areThereAnyRoleChanges', true);
    this.set('onSaveRolesClick', () => {});
  });

  test('should disable save button when there are no role changes', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('areThereAnyRoleChanges', false);

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-header
        --areThereAnyRoleChanges=areThereAnyRoleChanges
        --onSaveRolesClick=(action onSaveRolesClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-route-header="save-button"]').isDisabled();
  });

  test('should enable save button when there are role changes', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/roles/-components/route-header
        --areThereAnyRoleChanges=areThereAnyRoleChanges
        --onSaveRolesClick=(action onSaveRolesClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-route-header="save-button"]').isNotDisabled();
  });

  test('should fire an external action when clicking save', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSaveRolesClick');

    await render(hbs`
      {{sites/site/roles/-components/route-header
        --areThereAnyRoleChanges=areThereAnyRoleChanges
        --onSaveRolesClick=(action onSaveRolesClick)
      }}
    `);

    // Act
    await click('[data-test-route-header="save-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
