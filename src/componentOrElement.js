import React from 'react';

import createChainableTypeChecker from './utils/createChainableTypeChecker';

function validate(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const propType = typeof propValue;

  if (React.isValidElement(propValue)) {
    return new Error(
      `Invalid ${location} \`${propFullName}\` of type ReactElement ` +
      `supplied to \`${componentName}\`, expected a ReactComponent or a ` +
      'DOMElement. You can usually obtain a ReactComponent or DOMElement ' +
      'from a ReactElement by attaching a ref to it.'
    );
  }

  if (
    (propType !== 'object' || typeof propValue.render !== 'function') &&
    propValue.nodeType !== 1
  ) {
    return new Error(
      `Invalid ${location} \`${propFullName}\` of value \`${propValue}\` ` +
      `supplied to \`${componentName}\`, expected a ReactComponent or a ` +
      'DOMElement.'
    );
  }

  return null;
}

export default createChainableTypeChecker(validate);
