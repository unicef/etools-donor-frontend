import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import {
  getDonors,
  getGrants,
  getExternalGrants,
  getThemes,
  getStaticAssets,
  getOffices
} from 'api';

import { propEq } from 'ramda';

import { setError } from 'slices/error';
import { setDonors } from 'slices/donors';
import { initDonorsList, initDonorsFilter } from 'actions';
import { setLoading } from 'slices/ui';
import { onReceiveGrants } from 'slices/grants';
import { onReceiveExternalGrants } from 'slices/external-grants';
import { onReceivethemes } from 'slices/themes';
import { onReceiveStaticAssets } from 'slices/static';
import { onReceiveOffices } from 'slices/offices';
import { selectUserProfile, selectUserGroup } from 'selectors/ui-flags';
import { waitForLength } from './helpers';
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

export default function*() {
  yield all([filtersSaga(), donorsSaga()]);
}
