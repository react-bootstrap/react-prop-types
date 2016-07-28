import './setup';

import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';

import deprecated from '../src/deprecated';

import { getValidationKey, runValidator, shouldWarn } from './helpers';

function validate(value, validationKey) {
  const validatorSpy = sinon.spy(
    deprecated(React.PropTypes.string, 'error 1')
  );
  runValidator(validatorSpy, value, validationKey);

  return validatorSpy;
}

describe('deprecated', () => {
  beforeEach(() => {
    deprecated._resetWarned(); // eslint-disable-line no-underscore-dangle
  });

  it('should warn and succeed on valid deprecated value', () => {
    shouldWarn('deprecated');
    shouldWarn('error 1');

    const validatorSpy = validate('foo');

    expect(validatorSpy).to.have.returned(null);
  });

  it('should warn and succeed on valid deprecated value', () => {
    shouldWarn('deprecated');
    shouldWarn('error 1');
    shouldWarn('expected `string`');

    const validatorSpy = validate(3);

    expect(validatorSpy).to.not.have.returned(null);
  });

  it('should not emit the same warning more than once', () => {
    shouldWarn('deprecated');

    const validationKey = getValidationKey();

    validate('foo', validationKey);
    validate('bar', validationKey);

    expect(console.error).to.have.been.calledOnce; // eslint-disable-line no-console
  });
});
