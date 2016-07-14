import React from 'react';

export function shouldWarn(about) {
  console.error.expected.push(about); // eslint-disable-line no-console
}

// Work around React only warning once for each validation error.
export function getValidationKey() {
  return Math.random().toString(36).slice(2);
}

export function runValidator(validator, value, validationKey) {
  const propName = `prop${validationKey || getValidationKey()}`;
  const propTypes = {
    [propName]: validator,
  };

  const ValidatedComponent = () => null;
  ValidatedComponent.propTypes = propTypes;

  React.createElement(ValidatedComponent, { [propName]: value });
}
