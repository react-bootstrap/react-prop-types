import React from 'react';

import createChainableTypeChecker from './utils/createChainableTypeChecker';

function elementType(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const propType = typeof propValue;

  if (React.isValidElement(propValue)) {
    return new Error(
      `Invalid ${location} \`${propFullName}\` of type ReactElement ` +
      `supplied to \`${componentName}\`, expected an element type (a string ` +
      'or a ReactClass).'
    );
  }

  if (propType !== 'function' && propType !== 'string') {
    return new Error(
      `Invalid ${location} \`${propFullName}\` of value \`${propValue}\` ` +
      `supplied to \`${componentName}\`, expected an element type (a string ` +
      'or a ReactClass).'
    );
  }

  return null;
}

export default createChainableTypeChecker(elementType);
