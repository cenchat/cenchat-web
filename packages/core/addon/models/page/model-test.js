import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';

import { getFixtureData } from '@cenchat/core/test-support';

module('Unit | Model | page', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    mockFirebase(this.owner, getFixtureData());
  });

  module('getter/setter: decodedSlug', () => {
    test('should return the decoded slug', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('page', {
        id: 'new__page',
        slug: '%2Ffoo%2Fbar',
      }));

      // Act
      const result = model.decodedSlug;

      // Arrange
      assert.equal(result, '/foo/bar');
    });
  });

  module('getter/setter: shortId', () => {
    test('should return the value after the double underscore of the ID', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('page', {
        id: 'new__page',
      }));

      // Act
      const result = model.shortId;

      // Arrange
      assert.equal(result, 'page');
    });
  });

  module('getter/setter: url', () => {
    test('should return the url', async function (assert) {
      assert.expect(1);

      // Arrange
      const store = this.owner.lookup('service:store');
      const site = await run(() => store.findRecord('site', 'site_a'));
      const model = run(() => (
        store.createRecord('page', { site, id: 'new__page', slug: '%2Ffoo%2Fbar' })
      ));

      // Act
      const result = model.url;

      // Arrange
      assert.equal(result, 'http://site-a.com/foo/bar');
    });
  });

  module('function: loadFilteredComments', () => {
    test('should return all comments', async function (assert) {
      assert.expect(2);

      // Arrange
      const model = await run(() => this.owner.lookup('service:store').findRecord(
        'page',
        'site_a__page_a',
      ));

      // Act
      const result = await model.loadFilteredComments('all');

      // Arrange
      assert.equal(result.firstObject.id, 'comment_a');
      assert.equal(result.lastObject.id, 'comment_b');
    });

    test('should return relevant comments', async function (assert) {
      assert.expect(2);

      // Arrange
      const model = await run(() => this.owner.lookup('service:store').findRecord(
        'page',
        'site_a__page_a',
      ));

      model.set('session', EmberObject.create({
        model: { id: 'user_a' },
      }));

      // Act
      const result = await model.loadFilteredComments('relevant');

      // Arrange
      assert.equal(result.firstObject.id, 'comment_b');
      assert.equal(result.lastObject.id, 'comment_d');
    });
  });
});
