/**
 * Checks if only one of the listed properties is in use. An error is given
 * if multiple have a value
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */
 export default function createSinglePropFromChecker(arrOfProps) {
  function validate(props, propName, componentName) {
    const usedPropCount = arrOfProps
      .map(listedProp => props[listedProp])
      .reduce((acc, curr) => acc + (curr !== undefined ? 1 : 0), 0);

    if (usedPropCount > 1) {
      const [first, ...others] = arrOfProps;
      const message = `${others.join(', ')} and ${first}`;
      return new Error(
        `Invalid prop '${propName}', only one of the following ` +
        `may be provided: ${message}`
      );
    }
  }
  return validate;
}
