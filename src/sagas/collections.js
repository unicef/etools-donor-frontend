import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import {
  getDonors,
  getGrants,
  getExternalGrants,
  getThemes,
  getStaticAssets,
  getOffices,
  getReports,
  getThematicReports,
  getUsGovReports
} from 'api';

import { propEq } from 'ramda';

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
import {
  selectDonorCode,
  selectIsUsGov,
  selectParamDonorId,
  selectUserProfile,
  selectUserGroup
} from 'selectors/ui-flags';
import { selectReportYear, selectTheme } from 'selectors/filter';
import { selectError } from 'selectors/errors';
import { waitFor, waitForLength } from './helpers';
import { selectDonors } from 'selectors/collections';
import { reportPageLoaded } from 'slices/donor';
import { UNICEF_USER_ROLE } from 'lib/constants';

function* handleFetchDonors() {
  try {
    yield put(setLoading(true));
    const donors = yield call(getDonors);
    yield put(setDonors(donors));
  } catch (err) {
    yield put(setError(err));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleFetchGrants({ payload }) {
  try {
    const grants = yield call(getGrants, payload);
    yield put(onReceiveGrants(grants));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchOffices() {
  try {
    const offices = yield call(getOffices);
    yield put(onReceiveOffices(offices));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchExternalGrants({ payload }) {
  try {
    const grants = yield call(getExternalGrants, payload);
    yield put(onReceiveExternalGrants(grants));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchThemes() {
  try {
    const themes = yield call(getThemes);
    yield put(onReceivethemes(themes));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchStatic() {
  try {
    const staticDropdowns = yield call(getStaticAssets);
    yield put(onReceiveStaticAssets(staticDropdowns));
  } catch (err) {
    yield put(setError(err));
  }
}

// Encapsulate logic for grabbing the current donor and persisting to state
// for easier access.Only UNICEF user can operate on any donor.
function* handleCurrentDonor(action) {
  const profile = yield select(selectUserProfile);
  const group = yield select(selectUserGroup);
  let donor;

  if (group === UNICEF_USER_ROLE) {
    yield call(waitForLength, selectDonors);
    const donors = yield select(selectDonors);
    donor = donors.find(propEq('id', Number(action.payload)));
  } else {
    donor = profile.donor;
  }

  yield put(reportPageLoaded(donor));
}

function* handleFetchReports(action) {
  // wait for donor api to return in case of race condition, donorName needed for reports filter call
  yield call(waitFor, selectDonorCode);
  yield call(fetchReports, action);
}

// Tricky business requirement to call differente endpoint based on donor property us_gov first,
// then whether theme or year were selected at report page
function* getCallerFunc(payload) {
  const donorCode = yield select(selectDonorCode);
  const isUsGov = yield select(selectIsUsGov);

  const reportYear = yield select(selectReportYear);
  const theme = yield select(selectTheme);

  let result = {
    params: {
      ...removeEmpties(payload),
      donor_code: donorCode
    },
    caller: null
  };

  if (isUsGov) {
    result.caller = getUsGovReports;
  } else if (theme) {
    result.caller = getThematicReports;
    result.arg = theme;
  } else {
    result.caller = getReports;
    result.arg = reportYear;
  }
  return result;
}

function* fetchReports({ payload }) {
  try {
    yield put(setLoading(true));

    const { caller, params, arg } = yield call(getCallerFunc, payload);

    const reports = yield call(caller, params, arg);

    yield put(onReceiveReports(reports));
  } catch (err) {
    const existingError = yield select(selectError);
    if (!existingError) {
      yield put(setError(err));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* donorsSaga() {
  yield takeLatest(initDonorsList.type, handleFetchDonors);
}

function* fetchFiltersCollections(action) {
  yield all([
    call(handleFetchGrants, action),
    call(handleFetchExternalGrants, action),
    call(handleFetchOffices),
    call(handleFetchThemes),
    call(handleFetchStatic),
    call(handleCurrentDonor, action)
  ]);
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
