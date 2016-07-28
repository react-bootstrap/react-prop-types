import { shouldWarn, runValidator } from './helpers';

export default function describeChainableValidator(validator) {
  describe('chainable validator', () => {
    [null, undefined].forEach(value => {
      it(`should succeed on ${value} when not required`, () => {
        runValidator(validator, value);
      });

      it(`should fail on ${value} when required`, () => {
        shouldWarn('Required');
        runValidator(validator.isRequired, value);
      });
    });
  });
}
