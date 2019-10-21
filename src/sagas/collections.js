import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  getDonors,
  getGrants,
  getExternalGrants,
  getThemes,
  getAdminDonors,
  getStaticAssets
} from 'api';

import { setError } from 'reducers/error';
import { setDonors } from 'reducers/donors';
import { initDonorsList, initDonorsFilter } from 'actions';
// import { REPORTS, USERS_PORTAL } from '../lib/constants';
import { setLoading } from 'reducers/ui';
import { onReceiveGrants } from 'reducers/grants';
import { onReceiveExternalGrants } from 'reducers/external-grants';
import { onReceivethemes } from 'reducers/themes';
import { onReceiveStaticAssets } from 'reducers/static';

// might be neded
// const PAGE_DONORS_API_MAP = {
//   [USERS_PORTAL]: getAdminDonors,
//   [REPORTS]: getDonors
// };

function* handleFetchDonors() {
  try {
    // const donorApi = PAGE_DONORS_API_MAP[payload];
    yield put(setLoading(true));
    const donors = yield call(getDonors);
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

function* handleFetchStatic() {
  try {
    const staticDropdowns = yield call(getStaticAssets);
    yield put(onReceiveStaticAssets(staticDropdowns));
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
  yield takeLatest(initDonorsFilter.type, handleFetchStatic);
}

export default function*() {
  yield all([filtersSaga(), donorsSaga()]);
}

//TODO: normalize state
