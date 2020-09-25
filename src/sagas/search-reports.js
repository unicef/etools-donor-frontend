import {
  takeLatest,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';
import {
  selectDonorCode,
  selectError,
  selectCurrentlyLoadedDonor
} from 'selectors/ui-flags';
import {
  selectReportYear
} from 'selectors/filter';
import {
  removeEmpties
} from 'lib/helpers';
import {
  fetchSearchReports
} from 'api/search-index';
import {
  waitFor
} from './helpers';
import {
  setLoading,
  setCurrentlyLoadedDonor
} from 'slices/ui';
import {
  selectUserGroup
} from '../selectors/ui-flags'
import {
  onReceiveSearchReports
} from 'slices/search-reports';
import {
  setError
} from 'slices/error';
import {
  onFetchSearchReports
} from 'actions';
import {
  selectStaticAssets
} from 'selectors/collections';
import {
  UNICEF_USER_ROLE
} from '../lib/constants'

function* getInitialSearchReports(params) {
  let result = {};
  try {
    result = yield call(
      fetchSearchReports, params
    )
  } catch (err) {
    yield put(setError(err));
  }
  return result;
}

function* getSearchReports(params) {
  const staticAssets = yield select(selectStaticAssets)
  const currentlyLoadedDonor = yield select(selectCurrentlyLoadedDonor);
  const userGroup = yield select(selectUserGroup);
  const isUnicefUser = userGroup === UNICEF_USER_ROLE;
  const sourceIds = staticAssets.source_id;

  // add source_id params to search api call based on userGroup
  const sourceId = isUnicefUser ? sourceIds.internal : sourceIds.external;
  params = {
    ...params,
    source_id: sourceId
  };

  // this is default / initial load only
  if (!currentlyLoadedDonor || currentlyLoadedDonor != params.donor_code) {
    yield put(setCurrentlyLoadedDonor(params.donor_code))
    const searchReports = yield call(getInitialSearchReports, params);
    return searchReports;
  }
  const reportYear = yield select(selectReportYear);
  const searchReports = yield call(fetchSearchReports, params, reportYear);
  return searchReports;
}

function* getSearchCallerFunc(payload) {
  let result = {
    params: {
      ...removeEmpties(payload)
    }
  };

  yield call(waitFor, selectDonorCode);
  const donorCode = yield select(selectDonorCode);
  result.caller = getSearchReports;
  result.params.donor_code = donorCode;
  return result;
}

function* handleFetchSearchReports({
  payload
}) {
  try {
    yield put(setLoading(true));

    const {
      caller,
      params,
      arg
    } = yield call(getSearchCallerFunc, payload);

    const searchReports = yield call(caller, params, arg);
    yield put(onReceiveSearchReports(searchReports));
  } catch (err) {
    const existingError = yield select(selectError);
    if (!existingError) {
      yield put(setError(err));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export default function* () {
  yield all([yield takeLatest(onFetchSearchReports.type, handleFetchSearchReports)]);
}
