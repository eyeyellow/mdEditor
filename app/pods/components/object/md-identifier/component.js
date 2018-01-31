import Ember from 'ember';
import {
  once
} from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
// import {
//   formatCitation
// } from '../md-citation/component';

const {
  Component,
  computed,
  set,
  getWithDefault
} = Ember;

const Validations = buildValidations({
  'identifier': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

const theComp = Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = getWithDefault(this, 'model', {}) || {};

    once(this, function () {
      set(model, 'authority', getWithDefault(model, 'authority',
        {}));
    });
  },

  classNames: ['md-identifier'],
  attributeBindings: ['data-spy'],

  /**
   * The identifier object to render
   *
   * @property model
   * @type {object}
   * @required
   */

  /**
   * Render short form of the identifier template, i.e. no authority
   *
   * @property short
   * @type {Boolean}
   */

  /**
   * Determines whether to render identifier field with confirmation button
   *
   * @property confirmIdentifier
   * @type {Boolean}
   */

  identifier: computed.alias('model.identifier')
});

export {
  Validations,
  theComp as
  default
};
