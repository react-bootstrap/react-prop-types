import './setup';

import React from 'react';

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

  it('should fail on ReactElement', () => {
    shouldWarn('of type ReactElement');
    shouldWarn('expected a ReactComponent or a DOMElement');

    validate(React.createElement('span'));
  });

  // Fake these values here instead of pulling in a DOM just for this test.
  [
    ['DOMElement', { nodeType: 1 }],
    ['ReactComponent', { render: () => null }],
  ].forEach(([label, value]) => {
    it(`should succeed on ${label}`, () => {
      validate(value);
    });
  });
});
