import { camelize } from '@ember/string';
import Service from '@ember/service';

/**
 * @param {Object} context
 * @param {string} name
 * @param {Object} serviceProperties
 * @return {Ember.Service} Service
 */
export default function stubService(context, name, serviceProperties) {
  if (serviceProperties) {
    context.owner.register(`service:${name}`, Service.extend(serviceProperties));
  }

  return context.owner.lookup(`service:${name}`, { as: camelize(name) });
}
