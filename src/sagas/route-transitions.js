import { takeLatest, all } from 'redux-saga/effects';
import { redirectToLogin } from 'actions';

function* handleRedirect() {
  let url = window.location.origin;
  window.location.href = `${url}/landing/`;
  yield null;
}

export default function*() {
  yield all([takeLatest(redirectToLogin.type, handleRedirect)]);
}
