import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import {
  getDonors,
  getGrants,
  getExternalGrants,
  getThemes,
  getStaticAssets,
  getOffices,
  getReports
} from 'api';

import { setError } from 'reducers/error';
import { setDonors } from 'reducers/donors';
import { initDonorsList, initDonorsFilter, onFetchReports } from 'actions';
// import { REPORTS, USERS_PORTAL } from '../lib/constants';
import { setLoading } from 'reducers/ui';
import { onReceiveGrants } from 'reducers/grants';
import { onReceiveExternalGrants } from 'reducers/external-grants';
import { onReceivethemes } from 'reducers/themes';
import { onReceiveStaticAssets } from 'reducers/static';
import { onReceiveOffices } from 'reducers/offices';
import { onReceiveReports } from 'reducers/reports';
import { removeEmpties } from 'lib/helpers';
import { selectDonorName } from 'selectors/ui-flags';

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

function* handleFetchOffices() {
  try {
    const offices = yield call(getOffices);
    yield put(onReceiveOffices(offices));
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

function* handleFetchReports({ payload }) {
  try {
    // omit until property names align with backend and profile
    // const donorName = yield select(selectDonorName);

    const params = {
      ...removeEmpties(payload)
      // donor__contains: donorName
    };

    yield put(setLoading(true));
    const reports = yield call(getReports, params);

    yield put(onReceiveReports(reports));
  } catch (err) {
    yield put(setError(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* donorsSaga() {
  yield takeLatest(initDonorsList.type, handleFetchDonors);
}

function* fetchFiltersCollections(action) {
  yield call(handleFetchGrants, action);
  yield call(handleFetchExternalGrants, action);
  yield call(handleFetchOffices);
  yield call(handleFetchThemes);
  yield call(handleFetchStatic);
}

export function* filtersSaga() {
  yield takeLatest(initDonorsFilter.type, fetchFiltersCollections);
}

export function* reportsSaga() {
  yield takeLatest(onFetchReports.type, handleFetchReports);
}

export default function*() {
  yield all([filtersSaga(), donorsSaga(), reportsSaga()]);
}

//TODO: normalize state
