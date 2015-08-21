import {errMsg, createChainableTypeChecker} from './common';

/**
 * Checks whether a prop matches a key of an associated object
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */
export default function keyOf(obj) {
  function validate(props, propName, componentName) {
    const propValue = props[propName];
    if (!obj.hasOwnProperty(propValue)) {
      const valuesString = JSON.stringify(Object.keys(obj));
      return new Error(
        errMsg(props, propName, componentName, `, expected one of ${valuesString}.`)
      );
    }
  }
  return createChainableTypeChecker(validate);
}
