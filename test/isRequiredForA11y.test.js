import './setup';

import React from 'react';

import isRequiredForA11y from '../src/isRequiredForA11y';

import { runValidator, shouldWarn } from './helpers';

function validate(value) {
  runValidator(isRequiredForA11y(React.PropTypes.string), value);
}

describe('isRequiredForA11y', () => {
  it('should fail when value is missing', () => {
    shouldWarn('accessible for users of assistive technologies');

    validate(undefined);
  });

  it('should succeed when value is present', () => {
    validate('foo');
  });
});
