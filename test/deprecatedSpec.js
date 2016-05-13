/* eslint no-console: 0 */
import React from 'react';
import deprecated from '../src/deprecated';

export function shouldError(about) {
  console.error.called.should.be.true;
  console.error.calledWithMatch(about).should.be.true;
  console.error.reset();
}

describe('deprecated', function() {
  beforeEach(function() {
    deprecated._resetWarned();

    // because 'warning' package uses console.error instead of console.warn
    sinon.stub(console, 'error');
  });

  afterEach(function() {
    console.error.restore();
  });

  function validate(prop) {
    return deprecated(React.PropTypes.string, 'Read more at link')({pName: prop}, 'pName', 'ComponentName');
  }

  it('should warn about deprecation and validate OK', function() {
    const err = validate('value');
    shouldError('"pName" property of "ComponentName" has been deprecated.\nRead more at link');
    assert.notInstanceOf(err, Error);
  });

  it('should warn about deprecation and throw validation error when property value is not OK', function() {
    const err = validate({});
    shouldError('"pName" property of "ComponentName" has been deprecated.\nRead more at link');
    assert.instanceOf(err, Error);
    assert.include(err.message, 'Invalid undefined `pName` of type `object` supplied to `ComponentName`');
  });

  it('should not emit the same warning more than once', function() {
    validate('value');
    validate('value');
    console.error.should.have.been.calledOnce;
    shouldError('deprecated');
  });
});
