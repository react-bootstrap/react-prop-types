import './setup';

import { expect } from 'chai';
import sinon from 'sinon';

import all from '../src/all';

import describeChainableValidator from './describeChainableValidator';
import { getValidationKey, runValidator, shouldWarn } from './helpers';

function validate(validators, value) {
  const validatorSpy = sinon.spy(all(...validators));
  runValidator(validatorSpy, value);

  return validatorSpy;
}

describe('all', () => {
  describeChainableValidator(all());

  it('should pass if no validators are provided', () => {
    const validatorSpy = validate([], 'foo');
    expect(validatorSpy).to.have.been.calledOnce.and.to.have.returned(null);
  });

  it('should run each validator in order', () => {
    const validators = [
      sinon.stub().returns(null),
      sinon.stub().returns(null),
      sinon.stub().returns(null),
    ];

    const validatorSpy = validate(validators, 'foo');
    expect(validatorSpy).to.have.been.calledOnce.and.to.have.returned(null);

    validators.forEach(validator => {
      expect(validator).to.have.been.calledOnce;
    });

    expect(validators[1]).to.have.been.calledAfter(validators[0]);
    expect(validators[2]).to.have.been.calledAfter(validators[1]);
  });

  it('should fail with the first failing validation error', () => {
    const validators = [
      sinon.stub().returns(null),
      sinon.stub().returns(new Error(`${getValidationKey()} error 1`)),
      sinon.stub().returns(new Error('error 2')),
    ];

    shouldWarn('error 1');

    validate(validators, 'foo');
  });
});
