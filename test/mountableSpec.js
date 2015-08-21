import React from 'react'; // eslint-disable-line no-unused-vars
import ReactTestUtils from 'react/lib/ReactTestUtils';
import mountable from '../src/mountable';
import {isChainableAndUndefinedOK} from './helpers.js';

describe('mountable', function() {
  function validate(prop) {
    return mountable({p: prop}, 'p', 'Component');
  }

  isChainableAndUndefinedOK(mountable);

  it('Should return error with non mountable values', function() {
    const err = validate({});
    assert.instanceOf(err, Error);
    assert.include(err.message, 'expected a DOM element or an object that has a `render` method');
  });

  it('Should return undefined with mountable values', function() {
    assert.isUndefined(validate(document.createElement('div')));
    assert.isUndefined(validate(document.body));
    assert.isUndefined(validate(ReactTestUtils.renderIntoDocument(<div />)));
  });
});
