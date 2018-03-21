import Component from '@ember/component';

/**
 * Converts all components that doesn't have an explicitly defined
 * `tagName`, `classNames`, and `elementId` to a fragment (tag-less).
 * With this, we can structure our app with template only components.
 *
 * Note: This will be removed once template only components lands.
 * See: https://github.com/emberjs/rfcs/blob/master/text/0278-template-only-components.md
 */
export function initialize() {
  Component.reopen({
    init(...args) {
      this._super(...args);

      if (
        this.get('tagName') === null
        && this.get('classNames').length === 0
        && this.get('elementId').startsWith('ember')
      ) {
        this.set('tagName', '');
        this.set('elementId', null);
      }
    },
  });
}

export default {
  initialize,
};
