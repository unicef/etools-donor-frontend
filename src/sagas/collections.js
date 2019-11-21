import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import {
  getDonors,
  getGrants,
  getExternalGrants,
  getThemes,
  getStaticAssets,
  getOffices,
  getReports,
  getThematicReports
} from 'api';

import { setError } from 'slices/error';
import { setDonors } from 'slices/donors';
import { initDonorsList, initDonorsFilter, onFetchReports } from 'actions';
import { setLoading } from 'slices/ui';
import { onReceiveGrants } from 'slices/grants';
import { onReceiveExternalGrants } from 'slices/external-grants';
import { onReceivethemes } from 'slices/themes';
import { onReceiveStaticAssets } from 'slices/static';
import { onReceiveOffices } from 'slices/offices';
import { onReceiveReports } from 'slices/reports';
import { removeEmpties } from 'lib/helpers';
import { selectDonorName } from 'selectors/ui-flags';
import { selectReportYear, selectTheme } from 'selectors/filter';

function* handleFetchDonors() {
  try {
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
    const donorName = yield select(selectDonorName);

    const params = {
      ...removeEmpties(payload),
      donor__contains: donorName
    };

    yield put(setLoading(true));

    const reportYear = yield select(selectReportYear);
    const theme = yield select(selectTheme);
    let reports;

    if (theme) {
      reports = yield call(getThematicReports, params, theme);
    } else {
      reports = yield call(getReports, params, reportYear);
    }

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
