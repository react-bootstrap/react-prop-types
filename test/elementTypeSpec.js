import React from 'react';
import elementType from '../src/elementType';
import {isChainableAndUndefinedOK} from './helpers.js';

describe('elementType', function () {
  function validate(prop) {
    return elementType({p: prop}, 'p', 'TestComponent');
  }

  isChainableAndUndefinedOK(elementType);

  it('Should validate OK with elementType values', function() {
    assert.isUndefined(validate('span'));
    assert.isUndefined(validate(function(){}));
  });

  it('Should return error with not a string or function values', function() {
    let err = validate({});
    assert.instanceOf(err, Error);
    assert.include(err.message, 'Expected an Element `type` such as a tag name or return value of React.createClass(...)');
  });

  it('Should return error with react element', function() {
    let err = validate(React.createElement('span'));
    assert.instanceOf(err, Error);
    assert.include(err.message, 'Expected an Element `type`, not an actual Element');
  });
});
