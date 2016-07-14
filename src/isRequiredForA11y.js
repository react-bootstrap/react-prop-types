export default function isRequiredForA11y(validator) {
  return function validate(
    props, propName, componentName, location, propFullName, ...args
  ) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      return new Error(
        `The ${location} \`${propFullNameSafe}\` is required to make ` +
        `\`${componentNameSafe}\` accessible for users of assistive ` +
        'technologies such as screen readers.'
      );
    }

    return validator(
      props, propName, componentName, location, propFullName, ...args
    );
  };
}
