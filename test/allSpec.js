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
});
