import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | sign in form', function(hooks) {
  setupTest(hooks);

  test('nothing to test', async function(assert) {
    assert.expect(1);

    const factory = this.owner.factoryFor('component:sign-in-form');
    const component = await factory.create();

    assert.ok(component);
  });
});
