import { any, compose, equals, prop, last, isEmpty, filter, not } from 'ramda';
import { useRef, useEffect } from 'react';
export const setValueFromEvent = setter => ({ target: { value } }) => setter(value);
export const oneIsEmpty = (...items) =>
  any(
    compose(
      equals(0),
      prop('length')
    )
  )(items);

export const donorIdFromLocation = location => last(location.pathname.split('/'));
export const hasValue = val => !isEmpty(val) && Boolean(val);

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function removeEmpties(obj) {
  if (!obj) {
    return obj;
  }
  return filter(
    compose(
      not,
      isEmpty
    ),
    obj
  );
}
