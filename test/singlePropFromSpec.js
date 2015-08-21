import singlePropFrom from '../src/singlePropFrom';

describe('singlePropFrom', function() {
  function validate(testProps) {
    const propList = ['children', 'value'];

    return singlePropFrom(propList)(testProps, 'value', 'Component');
  }

  it('Should validate OK if only one listed prop in used', function() {
    const testProps = {value: 5};

    assert.isUndefined(validate(testProps));
  });

  it('Should return error if multiple of the listed properties have values', function() {
    const err = validate({value: 5, children: 5});
    assert.instanceOf(err, Error);
    assert.include(err.message, 'only one of the following may be provided: value and children');
  });
});
