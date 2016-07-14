import './setup';

import React from 'react';

import elementType from '../src/elementType';

import describeChainableValidator from './describeChainableValidator';
import { runValidator, shouldWarn } from './helpers';

function validate(value) {
  runValidator(elementType, value);
}

describe('elementType', () => {
  describeChainableValidator(elementType);

  it('should fail on non-element-type value', () => {
    shouldWarn('expected an element type');

    validate({});
  });

  it('should fail on ReactElement', () => {
    shouldWarn('of type ReactElement');
    shouldWarn('expected an element type');

    validate(React.createElement('span'));
  });

  it('should succeed on component class', () => {
    validate(() => null);
  });

  it('should succeed on component tag', () => {
    validate('span');
  });
});
