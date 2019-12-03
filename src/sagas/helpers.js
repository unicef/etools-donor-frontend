import { select, take } from 'redux-saga/effects';

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
