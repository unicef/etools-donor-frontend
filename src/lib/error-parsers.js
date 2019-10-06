import { pathOr } from 'ramda';

export function parseFormError(err) {
  const errorFields = pathOr(null, ['response', 'data']);
  return errorFields(err) || err.message;
}

export function getErrorState(err, field) {
  return err ? Boolean(err[field]) : false;
}
