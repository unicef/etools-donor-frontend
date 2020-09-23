import {
  takeLatest,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';
import {
  format,
  subYears
} from 'date-fns';
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
  onReceiveSearchReports
} from 'slices/search-reports';
import {
  setError
} from 'slices/error';
import {
  onFetchSearchReports
} from 'actions';

import {
  REPORT_END_DATE_BEFORE_FIELD,
  REPORT_END_DATE_AFTER_FIELD,
  DATE_FORMAT
} from 'pages/reports/constants';

function getInitialSearchReportsFilterDates() {
  const today = new Date();
  const lastYearAfterDate = subYears(today, 1);
  return {
    [REPORT_END_DATE_AFTER_FIELD]: format(lastYearAfterDate, DATE_FORMAT),
    [REPORT_END_DATE_BEFORE_FIELD]: format(today, DATE_FORMAT)
  }
}

function* getInitialSearchReports(params, filtersGetter) {
  const defaultFilters = filtersGetter();
  let result = {};
  try {
    result = yield call(
      fetchSearchReports, {
        ...params,
        ...defaultFilters
      }
    )
  } catch (err) {
    yield put(setError(err));
  }
  return result;
}

function* getSearchReports(params) {
  const currentlyLoadedDonor = yield select(selectCurrentlyLoadedDonor);

  // this is default / initial load only
  if (!currentlyLoadedDonor || currentlyLoadedDonor != params.donor_code) {
    yield put(setCurrentlyLoadedDonor(params.donor_code))
    const searchReports = yield call(getInitialSearchReports, params, getInitialSearchReportsFilterDates);
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
