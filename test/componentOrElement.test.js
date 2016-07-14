import './setup';

import componentOrElement from '../src/componentOrElement';

import describeChainableValidator from './describeChainableValidator';
import { runValidator, shouldWarn } from './helpers';

function validate(value) {
  runValidator(componentOrElement, value);
}

describe('componentOrElement', () => {
  describeChainableValidator(componentOrElement);

  it('should fail on non-componentOrElement values', () => {
    shouldWarn('expected a ReactComponent or a DOMElement');

    validate({});
  });

  // It makes no sense to pull in a DOM dependency just to run this test, so
  // fake the two values here.
  [
    ['DOMElement', { nodeType: 1 }],
    ['ReactComponent', { render: () => null }],
  ].forEach(([label, value]) => {
    it(`should succeed on ${label}`, () => {
      validate(value);
    });
  });
});
