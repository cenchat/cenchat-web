import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import { setupTestState, stubPromise } from '@cenchat/core/test-support';

module('Integration | Component | profile/settings/-components/linked-accounts-settings', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should show unlink facebook button when facebook account is linked', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{profile/settings/-components/linked-accounts-settings
          --firebase=firebase
          --session=session}}
    `);

    // Assert
    assert.dom('[data-test-linked-account-settings="unlink-fb-button"]').exists();
  });

  test('should unlink facebook account when clicking unlink facebook account', async function (assert) {
    assert.expect(5);

    // Arrange
    const unlinkStub = sinon.stub().returns(stubPromise(true));

    this.set('session.currentUser.unlink', unlinkStub);

    await render(hbs`
      {{profile/settings/-components/linked-accounts-settings
          --firebase=firebase
          --session=session}}
    `);

    // Act
    await click('[data-test-linked-account-settings="unlink-fb-button"]');

    // Assert
    assert.ok(unlinkStub.calledWithExactly('facebook.com'));
    assert.equal(this.session.get('model.photoUrl'), null);
    assert.equal(this.session.get('model.provider'), null);

    const facebookIdDocSnapshot = await this.db.doc('facebookIds/fb_user_a').get();

    assert.notOk(facebookIdDocSnapshot.exists);

    const userMetaDocSnapshot = await this.db.doc('userMetaInfos/user_a').get();

    assert.equal(userMetaDocSnapshot.get('accessToken'), null);
  });

  test('should show link facebook button when facebook account is not linked', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.currentUser.providerData', []);

    // Act
    await render(hbs`
      {{profile/settings/-components/linked-accounts-settings
          --firebase=firebase
          --session=session}}
    `);

    // Assert
    assert.dom('[data-test-linked-account-settings="link-fb-button"]').exists();
  });

  test('should link facebook account when clicking link facebook account', async function (assert) {
    assert.expect(5);

    // Arrange
    const linkWithPopupStub = sinon.stub().returns(stubPromise(true, {
      credential: { accessToken: 'fb_token_100' },
      user: {
        providerData: [
          {
            photoURL: 'fb_user_100.jpg',
            providerId: 'facebook.com',
            uid: 'fb_user_100',
          },
        ],
      },
    }));

    this.set('session.currentUser.providerData', []);
    this.set('session.currentUser.linkWithPopup', linkWithPopupStub);

    await render(hbs`
      {{profile/settings/-components/linked-accounts-settings
          --firebase=firebase
          --session=session}}
    `);

    // Act
    await click('[data-test-linked-account-settings="link-fb-button"]');

    // Assert
    assert.ok(linkWithPopupStub.calledOnce);
    assert.equal(this.session.get('model.photoUrl'), 'fb_user_100.jpg');
    assert.equal(this.session.get('model.provider.facebook'), 'fb_user_100');

    const facebookIdDocSnapshot = await this.db.doc('facebookIds/fb_user_100').get();

    assert.equal(facebookIdDocSnapshot.get('cloudFirestoreReference').id, 'user_a');

    const userMetaDocSnapshot = await this.db.doc('userMetaInfos/user_a').get();

    assert.equal(userMetaDocSnapshot.get('accessToken.facebook'), 'fb_token_100');
  });
});
