import {
  takeLatest,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';
import {
  format,
  subYears,
  // remove with SearchAPI
  startOfYear,
  // remove with SearchAPI
  endOfYear,
  // remove with SearchAPI
  getYear
} from 'date-fns';
import {
  selectDonorCode,
  // remove with SearchAPI
  selectIsUsGov,
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
  // remove with SearchAPI
  getUsGovReports,
  getThematicReports,
  getReports,
  getReportsOld
} from 'api';
import {
  waitFor,
  // remove with SearchAPI
  waitForBoolean
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
  // remove with SearchAPI
  EARLIEST_REPORTS_YEAR,
  DATE_FORMAT
} from 'pages/reports/constants';
import {
  THEMATIC_REPORTS,
  REPORTS,
  SEARCH_API
} from 'lib/constants';
// remove with SearchAPI
import {
  isEmpty
} from 'ramda';
// remove with SearchAPI
const currentDate = () => {
  let date = new Date();
  return date.getFullYear();
};

// Returns date filters for both last year and this year to be passed to
// the Certified Reports api since its an endpoint called by year.
// We must construct before and after dates from a year ago to end of last year and
// from beginning of this year to today.

// remove with SearchAPI, keep only else
function getInitialReportsFilterDatesOld() {
  const today = new Date();

  const lastYearAfterDate = subYears(today, 1);

  const lastYearBeforeDate = endOfYear(lastYearAfterDate);

  const lastYear = getYear(lastYearAfterDate);
  const thisYear = getYear(today);
  const thisYearAfterDate = startOfYear(today);

  return {
    lastYear: {
      year: lastYear,
      [REPORT_END_DATE_BEFORE_FIELD]: format(lastYearBeforeDate, DATE_FORMAT),
      [REPORT_END_DATE_AFTER_FIELD]: format(lastYearAfterDate, DATE_FORMAT)
    },
    thisYear: {
      year: thisYear,
      [REPORT_END_DATE_BEFORE_FIELD]: format(today, DATE_FORMAT),
      [REPORT_END_DATE_AFTER_FIELD]: format(thisYearAfterDate, DATE_FORMAT)
    }
  };
}

function getInitialReportsFilterDates() {
  const today = new Date();
  const lastYearAfterDate = subYears(today, 1);
  return {
    [REPORT_END_DATE_AFTER_FIELD]: format(lastYearAfterDate, DATE_FORMAT),
    [REPORT_END_DATE_BEFORE_FIELD]: format(today, DATE_FORMAT)
  }
}

function* getInitialReportsOld(params, filtersGetter) {
  const defaultFilters = filtersGetter();
  let result = [];

  // call sequentially and keep successful calls
  try {
    const {
      year,
      ...defaultParams
    } = defaultFilters.lastYear;

    if (year >= EARLIEST_REPORTS_YEAR) {
      const lastYearsReports = yield call(
        getReportsOld, {
          ...params,
          ...defaultParams
        },
        year + ' Certified Reports'
      );
      result = lastYearsReports;
    }
  } catch (err) {
    yield put(setError(err));
  }

  try {
    const {
      year,
      ...defaultParams
    } = defaultFilters.thisYear;
    const thisYearsReports = yield call(
      getReportsOld, {
        ...params,
        ...defaultParams
      },
      year + ' Certified Reports'
    );
    result = [...result, ...thisYearsReports];
  } catch (err) {
    yield put(setError(err));
  }
  return result;
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

function* getCertifiedReportsOld(params) {
  const currentlyLoadedDonor = yield select(selectCurrentlyLoadedDonor);

  // this is default / initial load only
  if (!currentlyLoadedDonor || currentlyLoadedDonor != params.donor_code) {
    yield put(setCurrentlyLoadedDonor(params.donor_code))
    const reports = yield call(getInitialReportsOld, params, getInitialReportsFilterDatesOld);
    return reports;
  }
  const reportYear = yield select(selectReportYear);
  const reports = yield call(getReportsOld, params, reportYear);
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
      yield call(waitForBoolean, selectIsUsGov);
      const isUsGov = yield select(selectIsUsGov);
      yield call(waitFor, selectDonorCode);
      const donorCode = yield select(selectDonorCode);
      if (isUsGov) {
        const reportYear = yield select(selectReportYear);
        result.caller = getUsGovReports;
        result.arg = isEmpty(reportYear) ? currentDate() : reportYear;
        result.params.donor_code = donorCode;
        break;
      } else {
        result.caller = getCertifiedReportsOld;
        result.params.donor_code = donorCode;
        break;
      }
    }
    case SEARCH_API: {
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
