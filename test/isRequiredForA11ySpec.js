import React from 'react';
import isRequiredForA11y from '../src/isRequiredForA11y';

describe('isRequiredForA11y', function() {
  function validate(prop) {
    return isRequiredForA11y(React.PropTypes.string)({p: prop}, 'p', 'Component');
  }

  it('Should validate OK when property is provided', function() {
    const err = validate('aria-tag');
    assert.notInstanceOf(err, Error);
  });

  it('Should return custom error message when property is not provided', function() {
    const err = validate(null);
    assert.instanceOf(err, Error);
    assert.include(err.message, 'accessible for users using assistive technologies such as screen readers');
  });
});
