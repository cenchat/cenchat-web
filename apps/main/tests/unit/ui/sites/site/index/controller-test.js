import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/site/index', function(hooks) {
  setupTest(hooks);

  module('function: handleVerifySiteClick', function() {
    test('should verify site', async function(assert) {
      assert.expect(2);

      // Arrange
      const saveStub = sinon.stub().returns(stubPromise(true));
      const model = EmberObject.create({ save: saveStub });
      const controller = this.owner.lookup('controller:sites/site/index');

      controller.set('model', model);

      // Act
      await controller.handleVerifySiteClick({ preventDefault: sinon.stub() });

      // Assert
      assert.equal(model.get('isVerified'), true);
      assert.ok(saveStub.calledWithExactly({
        adapterOptions: { onServer: true },
      }));
    });

    test('should rollback attributes when verifying fails', async function(assert) {
      assert.expect(3);

      // Arrange
      const rollbackAttributesStub = sinon.stub();
      const saveStub = sinon.stub().returns(stubPromise(false, {
        errors: [{ details: 'Foo' }],
      }));
      const model = EmberObject.create({
        rollbackAttributes: rollbackAttributesStub,
        save: saveStub,
      });
      const controller = this.owner.lookup('controller:sites/site/index');

      controller.set('model', model);

      // Act
      await controller.handleVerifySiteClick({ preventDefault: sinon.stub() });

      // Assert
      assert.equal(model.get('isVerified'), true);
      assert.ok(saveStub.calledWithExactly({
        adapterOptions: { onServer: true },
      }));
      assert.ok(rollbackAttributesStub.calledOnce);
    });
  });
});
