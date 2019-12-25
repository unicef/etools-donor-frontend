import { select, take, call } from 'redux-saga/effects';
import { isEmpty } from 'ramda';
export function* waitFor(selector) {
  if (yield select(selector)) {
    return;
  }
  while (true) {
    yield take('*');
    if (yield select(selector)) {
      return;
    }
  }
}

export function* waitForLength(selector) {
  let list = yield select(selector);
  if (list.length) {
    return;
  }
  while (true) {
    yield take('*');
    list = yield select(selector);
    if (list.length) {
      return;
    }
  }
}

export function* checkExisting(selector) {
  const existing = yield select(selector);
  if (!isEmpty(existing)) {
    return true;
  }
  return false;
}

export function* maybeFetch(handler, selector, action) {
  if (yield call(checkExisting, selector)) {
    return;
  }
  yield call(handler, action);
}
