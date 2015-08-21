export default function isRequiredForA11y(propType) {
  return function validate(props, propName, componentName) {
    if (props[propName] === null) {
      return new Error(
        `The prop '${propName}' is required to make '${componentName}' accessible` +
        ` for users using assistive technologies such as screen readers`
      );
    }

    return propType(props, propName, componentName);
  };
}
