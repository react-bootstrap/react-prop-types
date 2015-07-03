import React from 'react';
import {errMsg, createChainableTypeChecker} from './common';

/**
 * Checks whether a prop provides a type of element.
 *
 * The type of element can be provided in two forms:
 * - tag name (string)
 * - a return value of React.createClass(...)
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */

function validate(props, propName, componentName) {
  let errBeginning = errMsg(props, propName, componentName,
    '. Expected an Element `type`');

  if (typeof props[propName] !== 'function') {
    if (React.isValidElement(props[propName])) {
      return new Error(errBeginning + ', not an actual Element');
    }

    if (typeof props[propName] !== 'string') {
      return new Error(errBeginning +
        ' such as a tag name or return value of React.createClass(...)');
    }
  }
}

export default createChainableTypeChecker(validate);
