export default function all(...propTypes) {
  if (propTypes === undefined) {
    throw new Error('No validations provided');
  }

  if (propTypes.some(propType => typeof propType !== 'function')) {
    throw new Error('Invalid arguments, must be functions');
  }

  if (propTypes.length === 0) {
    throw new Error('No validations provided');
  }

  return function validate(props, propName, componentName) {
    for (let i = 0; i < propTypes.length; i++) {
      const result = propTypes[i](props, propName, componentName);

      if (result !== undefined && result !== null) {
        return result;
      }
    }
  };
}
