import { any, compose, equals, prop, last } from 'ramda';
export const setValueFromEvent = setter => ({ target: { value } }) => setter(value);
export const oneIsEmpty = (...items) =>
  any(
    compose(
      equals(0),
      prop('length')
    )
  )(items);

export const donorIdFromLocation = location => last(location.pathname.split('/'));
