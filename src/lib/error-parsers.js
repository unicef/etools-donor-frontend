import { pathOr } from 'ramda';

export function parseFormError(err) {
  const errorFields = pathOr(null, ['response', 'data']);
  return errorFields(err) || err.message;
}

export function getErrorState(err, ...fields) {
  return err
    ? fields.reduce((hasError, field) => {
        return Boolean(err[field]) || hasError;
      }, false)
    : false;
}
