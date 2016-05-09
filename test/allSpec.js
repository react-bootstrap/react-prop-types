import all from '../src/all';

describe('all', function() {
  let validators;
  const props = {
    key: 'value'
  };
  const propName = 'key';
  const componentName = 'TestComponent';

  beforeEach(function() {
    validators = [
      sinon.stub(),
      sinon.stub(),
      sinon.stub()
    ];
  });

  it('with no arguments provided', function() {
    expect(() => {
      all();
    }).to.throw(Error, /No validations provided/);
  });

  it('with invalid arguments provided', function() {
    expect(() => {
      all(1);
    }).to.throw(Error, /Invalid arguments, must be functions/);
  });

  it('validates each validation', function() {
    const allValidator = all(...validators);

    const result = allValidator(props, propName, componentName);
    expect(result).to.equal(undefined);

    validators.forEach(x => {
      x.should.have.been.calledOnce
        .and.calledWith(props, propName, componentName);
    });
  });

  it('returns first validation failure', function() {
    const err = new Error('Failure');
    validators[1].returns(err);
    const allValidator = all(...validators);

    const result = allValidator(props, propName, componentName);
    expect(result).to.equal(err);

    validators[0].should.have.been.calledOnce
      .and.calledWith(props, propName, componentName);

    validators[1].should.have.been.calledOnce
      .and.calledWith(props, propName, componentName);

    validators[2].should.not.have.been.called;
  });

  it('always fails when prop value is missing and isRequired is used', function() {
    const missingPropName = 'missing';
    const allValidator = all(...validators).isRequired;
    const expectedErr = new Error(
      `Required prop '${missingPropName}' was not specified in '${componentName}'.`
    );

    const result = allValidator(props, missingPropName, componentName);
    expect(result.toString()).to.equal(expectedErr.toString()); // cannot compare values, as we got different Error instances here.

    validators[0].should.not.have.been.called;
    validators[1].should.not.have.been.called;
    validators[2].should.not.have.been.called;
  });
});
