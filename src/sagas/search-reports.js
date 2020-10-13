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
  selectCurrentlyLoadedDonor,
  selectMenuBarPage
} from 'selectors/ui-flags';
import {
  selectReportYear
} from 'selectors/filter';
import {
  removeEmpties
} from 'lib/helpers';
import {
  fetchSearchReports,
  // fetchThematicGrants,
  // fetchPooledGrants
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
  SEARCH_REPORTS,
  THEMATIC_GRANTS,
  POOLED_GRANTS,
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
  const reportPageName = yield select(selectMenuBarPage);
  const currentlyLoadedDonor = yield select(selectCurrentlyLoadedDonor);

  let searchReports = {};

  if (reportPageName == 'reports') {
    // this is default / initial load only
    if (!currentlyLoadedDonor || currentlyLoadedDonor != params.donor_code) {
      yield put(setCurrentlyLoadedDonor(params.donor_code))
      searchReports = yield call(getInitialSearchReports, params);
      return searchReports;
    }
    const reportYear = yield select(selectReportYear);
    searchReports = yield call(fetchSearchReports, params, reportYear);
  } else {
    searchReports = yield call(fetchSearchReports, params);
  }
  return searchReports;
}

function* getSourceId() {
  yield call(waitFor, selectStaticAssets)
  const staticAssets = yield select(selectStaticAssets)
  return staticAssets.source_id;
}

function* getSearchCallerFunc(payload) {
  const reportPageName = yield select(selectMenuBarPage);
  const userGroup = yield select(selectUserGroup);
  const isUnicefUser = userGroup === UNICEF_USER_ROLE;
  let result = {
    params: {
      ...removeEmpties(payload)
    }
  };

  yield call(waitFor, getSourceId)
  const sourceIds = yield getSourceId(reportPageName);
  result.caller = getSearchReports;

  switch (reportPageName) {
    case THEMATIC_GRANTS: {
      result.params.source_id = isUnicefUser ? sourceIds.thematic_internal : sourceIds.thematic_external;
      if (process.env.NODE_ENV === 'development') {
        result.params.source_id = isUnicefUser ? process.env.REACT_APP_DRP_SOURCE_ID_THEMATIC_EXTERNAL : process.env.REACT_APP_DRP_SOURCE_ID_THEMATIC_INTERNAL;
      }
      break;
    }
    case POOLED_GRANTS: {
      result.params.source_id = isUnicefUser ? sourceIds.pool_internal : sourceIds.pool_external;
      if (process.env.NODE_ENV === 'development') {
        result.params.source_id = isUnicefUser ? process.env.REACT_APP_DRP_SOURCE_ID_POOL_EXTERNAL : process.env.REACT_APP_DRP_SOURCE_ID_POOL_INTERNAL;
      }
      break;
    }
    case SEARCH_REPORTS: {
      yield call(waitFor, selectDonorCode);
      const donorCode = yield select(selectDonorCode);
      result.params.donor_code = donorCode;
      result.params.source_id = isUnicefUser ? sourceIds.internal : sourceIds.external;
      if (process.env.NODE_ENV === 'development') {
        result.params.source_id = isUnicefUser ? process.env.REACT_APP_DRP_SOURCE_ID_EXTERNAL : process.env.REACT_APP_DRP_SOURCE_ID_INTERNAL;
      }
      break
    }
  }
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
