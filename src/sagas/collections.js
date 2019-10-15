import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getDonors, getGrants, getExternalGrants, getThemes, getAdminDonors } from 'api';
import { setError } from 'reducers/error';
import { setDonors } from 'reducers/donors';
import { initDonorsList, initDonorsFilter } from 'actions';
import { onReceiveGrants, onReceiveExternalGrants, onReceivethemes } from 'reducers/collections';
import { REPORTS, USERS_PORTAL } from '../constants';
import { setLoading } from 'reducers/ui';

const PAGE_DONORS_API_MAP = {
  [USERS_PORTAL]: getAdminDonors,
  [REPORTS]: getDonors
};

function* handleFetchDonors({ payload }) {
  try {
    const donorApi = PAGE_DONORS_API_MAP[payload];
    yield put(setLoading(true));
    const donors = yield call(donorApi);
    yield put(setDonors(donors));
  } catch (err) {
    yield put(setError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleFetchGrants({ payload }) {
  try {
    const grants = yield call(getGrants, payload);
    yield put(onReceiveGrants(grants));
  } catch (err) {
    yield put(setError(err.message));
  }
}

function* handleFetchExternalGrants({ payload }) {
  try {
    const grants = yield call(getExternalGrants, payload);
    yield put(onReceiveExternalGrants(grants));
  } catch (err) {
    yield put(setError(err.message));
  }
}

function* handleFetchThemes() {
  try {
    const themes = yield call(getThemes);
    yield put(onReceivethemes(themes));
  } catch (err) {
    yield put(setError(err.message));
  }
}

export function* donorsSaga() {
  yield takeLatest(initDonorsList.type, handleFetchDonors);
}

export function* filtersSaga() {
  yield takeLatest(initDonorsFilter.type, handleFetchGrants);
  yield takeLatest(initDonorsFilter.type, handleFetchExternalGrants);
  yield takeLatest(initDonorsFilter.type, handleFetchThemes);
}

export default function*() {
  yield all([donorsSaga(), filtersSaga()]);
}
