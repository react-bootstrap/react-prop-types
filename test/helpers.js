export function isChainableAndUndefinedOK(validatorUnderTest) {
  it('Should validate OK with undefined or null values', function() {
    assert.isUndefined(validatorUnderTest({}, 'p', 'Component'));
    assert.isUndefined(validatorUnderTest({p: null}, 'p', 'Component'));
  });

  it('Should be able to chain', function() {
    const err = validatorUnderTest.isRequired({}, 'p', 'Component');
    assert.instanceOf(err, Error);
    assert.include(err.message, 'Required prop');
    assert.include(err.message, 'was not specified in');
  });
}
