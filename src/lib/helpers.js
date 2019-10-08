import { any, compose, equals, prop } from 'ramda';
export const setValueFromEvent = setter => ({ target: { value } }) => setter(value);
export const oneIsEmpty = (...items) =>
  any(
    compose(
      equals(0),
      prop('length')
    )
  )(items);
