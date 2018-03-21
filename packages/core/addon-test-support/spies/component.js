/* eslint ember/no-attrs-in-components: off */
/* eslint ember/no-attrs-snapshot: off */

import { typeOf } from '@ember/utils';
import Component from '@ember/component';

import sinon from 'sinon';

/**
 * Spies on a component
 *
 * @param {Object} context
 * @param {string} name
 * @return {Object} Spy
 */
export default function spyComponent(context, name) {
  const spy = sinon.spy();
  const componentArgsType = {};
  const owner = context.owner;

  if (!owner.hasRegistration(`component:${name}`)) {
    owner.register(`component:${name}`, Component.extend({ tagName: '' }));
  }

  const RegisteredComponent = owner.resolveRegistration(`component:${name}`);

  RegisteredComponent.reopen({
    didReceiveAttrs(...args) {
      this._super(...args);

      for (const key in this.attrs) {
        if (key.startsWith('--')) {
          const keyWithoutPrefix = key.slice(2);

          componentArgsType[keyWithoutPrefix] = typeOf(this.get(key));
        }
      }

      spy();
    },
  });

  spy.componentArgsType = componentArgsType;

  return spy;
}
