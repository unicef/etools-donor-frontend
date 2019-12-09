import { takeLatest, all } from 'redux-saga/effects';
import { redirectToLogin } from 'actions';

function* handleRedirect() {
  let url = window.location.origin;
  if (url.includes('localhost')) {
    window.location.href = `${url}/admin/login/`;
    return;
  }

  window.location.href = `${url}/sociallogin/unicef-azuread-b2c-oauth2/`;
  yield null;
}

export default function*() {
  yield all([takeLatest(redirectToLogin.type, handleRedirect)]);
}
