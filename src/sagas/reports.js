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
  selectMenuBarPage,
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
  getThematicReports,
  getReports
} from 'api';
import {
  waitFor
} from './helpers';
import {
  setLoading,
  setCurrentlyLoadedDonor
} from 'slices/ui';
import {
  onReceiveReports
} from 'slices/reports';
import {
  setError
} from 'slices/error';
import {
  onFetchReports
} from 'actions';

import {
  REPORT_END_DATE_BEFORE_FIELD,
  REPORT_END_DATE_AFTER_FIELD,
  DATE_FORMAT
} from 'pages/reports/constants';
import {
  THEMATIC_REPORTS,
  REPORTS
} from 'lib/constants';

// Returns date filters for both last year and this year to be passed to
// the Certified Reports api since its an endpoint called by year.
// We must construct before and after dates from a year ago to end of last year and
// from beginning of this year to today.
function getInitialReportsFilterDates() {
  const today = new Date();
  const lastYearAfterDate = subYears(today, 1);
  return {
    [REPORT_END_DATE_AFTER_FIELD]: format(lastYearAfterDate, DATE_FORMAT),
    [REPORT_END_DATE_BEFORE_FIELD]: format(today, DATE_FORMAT)
  }
}

function* getInitialReports(params, filtersGetter) {
  const defaultFilters = filtersGetter();
  let result = [];

  try {
    result = yield call(
      getReports, {
        ...params,
        ...defaultFilters
      }
    )
  } catch (err) {
    yield put(setError(err));
  }
  return result;
}

function* getCertifiedReports(params) {
  const currentlyLoadedDonor = yield select(selectCurrentlyLoadedDonor);

  // this is default / initial load only
  if (!currentlyLoadedDonor || currentlyLoadedDonor != params.donor_code) {
    yield put(setCurrentlyLoadedDonor(params.donor_code))
    const reports = yield call(getInitialReports, params, getInitialReportsFilterDates);
    return reports;
  }
  const reportYear = yield select(selectReportYear);
  const reports = yield call(getReports, params, reportYear);
  return reports;
}

function* getCallerFunc(payload) {
  const reportPageName = yield select(selectMenuBarPage);

  let result = {
    params: {
      ...removeEmpties(payload)
    }
  };

  switch (reportPageName) {
    case THEMATIC_REPORTS:
      result.caller = getThematicReports;
      break;
    case REPORTS: {
      yield call(waitFor, selectDonorCode);
      const donorCode = yield select(selectDonorCode);
      result.caller = getCertifiedReports;
      result.params.donor_code = donorCode;
      break;
    }
  }
  return result;
}

function* handleFetchReports({
  payload
}) {
  try {
    yield put(setLoading(true));

    const {
      caller,
      params,
      arg
    } = yield call(getCallerFunc, payload);

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

export default function* () {
  yield all([yield takeLatest(onFetchReports.type, handleFetchReports)]);
}
