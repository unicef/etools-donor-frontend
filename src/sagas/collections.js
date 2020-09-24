import {
  takeLatest,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';

import {
  getDonors,
  getGrants,
  getExternalGrants,
  getThemes,
  getStaticAssets,
  getOffices
} from 'api';

import {
  propEq,
  equals
} from 'ramda';

import {
  setError
} from 'slices/error';
import {
  setDonors
} from 'slices/donors';
import {
  initDonorsList,
  initCertifiedReportsPage,
  initThematicReportsPage,
  initSearchReportsPage
} from 'actions';
import {
  setLoading,
  onRouteChange
} from 'slices/ui';
import {
  onReceiveGrants
} from 'slices/grants';
import {
  onReceiveExternalGrants
} from 'slices/external-grants';
import {
  onReceivethemes
} from 'slices/themes';
import {
  onReceiveStaticAssets,
  staticAssetsInitialState
} from 'slices/static';
import {
  onReceiveOffices
} from 'slices/offices';
import {
  selectUserProfile,
  selectUserGroup
} from 'selectors/ui-flags';
import {
  waitForLength,
  maybeFetch
} from './helpers';
import {
  selectDonors,
  selectStaticAssets,
  selectThemeCollection,
  selectOffices
} from 'selectors/collections';
import {
  currentDonorSelected
} from 'slices/donor';
import {
  UNICEF_USER_ROLE
} from 'lib/constants';

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

function* handleFetchGrants({
  payload
}) {
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

function* handleFetchExternalGrants({
  payload
}) {
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
  const staticAssets = yield select(selectStaticAssets);

  if (!equals(staticAssets, staticAssetsInitialState)) {
    return;
  }

  try {
    const staticDropdowns = yield call(getStaticAssets);
    yield put(onReceiveStaticAssets(staticDropdowns));
  } catch (err) {
    yield put(setError(err));
  }
}

// Encapsulate logic for grabbing the current donor and persisting to state
// for easier access. Only UNICEF user or SuperUser can operate on any donor.
function* handleCurrentDonor({
  payload
}) {
  const profile = yield select(selectUserProfile);
  const group = yield select(selectUserGroup);
  let donor;

  if (group === UNICEF_USER_ROLE || profile.is_superuser) {
    yield call(waitForLength, selectDonors);
    const donors = yield select(selectDonors);
    donor = donors.find(propEq('id', Number(payload.donorId)));
  } else {
    donor = profile.donor;
  }

  yield put(currentDonorSelected(donor));
}

export function* donorsSaga() {
  yield takeLatest(initDonorsList.type, handleFetchDonors);
}

export function* currentDonorSaga() {
  yield takeLatest([onRouteChange.type], handleCurrentDonor);
}

function* fetchReportFilterCollections(action) {
  yield all([
    call(handleFetchGrants, action),
    call(handleFetchExternalGrants, action),
    call(handleFetchStatic),
    call(maybeFetch, handleFetchOffices, selectOffices)
  ]);
}

function* fetchThematicFilterCollections() {
  yield all([
    call(maybeFetch, handleFetchThemes, selectThemeCollection),
    call(handleFetchStatic),
    call(maybeFetch, handleFetchOffices, selectOffices)
  ]);
}

function* fetchSearchReportFilterCollections(action) {
  yield all([
    call(handleFetchGrants, action),
    call(handleFetchExternalGrants, action),
    call(handleFetchStatic),
    call(maybeFetch, handleFetchOffices, selectOffices)
  ]);
}

export function* filtersSaga() {
  yield takeLatest(initCertifiedReportsPage.type, fetchReportFilterCollections);
  yield takeLatest(initThematicReportsPage.type, fetchThematicFilterCollections);
  yield takeLatest(initSearchReportsPage.type, fetchSearchReportFilterCollections);
}

export default function* () {
  yield all([filtersSaga(), donorsSaga(), currentDonorSaga()]);
}
