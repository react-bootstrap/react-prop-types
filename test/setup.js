import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

beforeEach(() => {
  /* eslint-disable no-console */
  sinon.stub(console, 'error', msg => {
    let expected = false;

    console.error.expected.forEach(about => {
      if (msg.indexOf(about) !== -1) {
        console.error.warned[about] = true;
        expected = true;
      }
    });

    if (expected) {
      return;
    }

    console.error.threw = true;
    throw new Error(msg);
  });

  console.error.expected = [];
  console.error.warned = Object.create(null);
  console.error.threw = false;
  /* eslint-enable no-console */
});

afterEach(() => {
  /* eslint-disable no-console */
  if (!console.error.threw && console.error.expected.length) {
    expect(console.error.warned).to.have.keys(console.error.expected);
  }

  console.error.restore();
  /* eslint-enable no-console */
});
