import warning from 'warning';

let warned = {};

export default function deprecated(validator, reason) {
  return function validate(
    props, propName, componentName, location, propFullName, ...args
  ) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    if (props[propName] != null) {
      const messageKey = `${componentName}.${propName}`;

      warning(warned[messageKey],
        `The ${location} \`${propFullNameSafe}\` of ` +
        `\`${componentNameSafe}\` is deprecated. ${reason}.`
      );

      warned[messageKey] = true;
    }

    return validator(
      props, propName, componentName, location, propFullName, ...args
    );
  };
}

/* eslint-disable no-underscore-dangle */
function _resetWarned() {
  warned = {};
}

deprecated._resetWarned = _resetWarned;
/* eslint-enable no-underscore-dangle */
