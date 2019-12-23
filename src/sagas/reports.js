import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { format, subYears, startOfYear, endOfYear, getYear } from 'date-fns';
import { keys } from 'ramda';
import { selectDonorCode, selectIsUsGov } from 'selectors/ui-flags';
import { selectReportYear, selectTheme } from 'selectors/filter';
import { removeEmpties } from 'lib/helpers';
import { getUsGovReports, getThematicReports, getReports } from 'api';
import { waitFor } from './helpers';
import { setLoading } from 'slices/ui';
import { onReceiveReports } from 'slices/reports';
import { selectError } from 'selectors/errors';
import { setError } from 'slices/error';
import { onFetchReports } from 'actions';
import { selectReports } from 'selectors/collections';

import {
  REPORT_END_DATE_BEFORE_FIELD,
  REPORT_END_DATE_AFTER_FIELD,
  EARLIEST_REPORTS_YEAR,
  DATE_FORMAT
} from 'pages/reports/constants';

// Returns date filters for both last year and this year to be passed to
// the Certified Reports api since its an endpoint called by year.
// We must construct before and after dates from a year ago to end of last year and
// from beginning of this year to today.
function getInitialReportsFilterDates() {
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

function* getInitialReports(params, filtersGetter) {
  const defaultFilters = filtersGetter();
  let result = [];

  // call sequentially and keep successful calls
  try {
    const { year, ...defaultParams } = defaultFilters.lastYear;

    if (year >= EARLIEST_REPORTS_YEAR) {
      const lastYearsReports = yield call(
        getReports,
        {
          ...params,
          ...defaultParams
        },
        year
      );
      result = lastYearsReports;
    }
  } catch (err) {
    yield put(setError(err));
  }

  try {
    const { year, ...defaultParams } = defaultFilters.thisYear;
    const thisYearsReports = yield call(
      getReports,
      {
        ...params,
        ...defaultParams
      },
      year
    );
    result = [...result, ...thisYearsReports];
  } catch (err) {
    yield put(setError(err));
  }
  return result;
}

function* getCertifiedReports(params) {
  const existingReports = yield select(selectReports);

  // this is default / initial load only
  if (!existingReports.length && keys(params).length === 1) {
    const reports = yield call(getInitialReports, params, getInitialReportsFilterDates);
    return reports;
  }
  const year = yield select(selectReportYear);
  const reports = yield call(getReports, params, year);
  return reports;
}

// Tricky business requirement to call different endpoint based on donor property us_gov first,
// then whether theme or year were selected at report page
function* getCallerFunc(payload) {
  const donorCode = yield select(selectDonorCode);
  const isUsGov = yield select(selectIsUsGov);

  const theme = yield select(selectTheme);
  let result = {
    params: {
      ...removeEmpties(payload),
      donor_code: donorCode
    }
  };

  if (isUsGov) {
    result.caller = getUsGovReports;
    result.arg = yield select(selectReportYear);
  } else if (theme) {
    result.caller = getThematicReports;
    result.arg = theme;
  } else {
    result.caller = getCertifiedReports;
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

function* handleFetchReports(action) {
  // wait for donor api to return in case of race condition, donor code needed for reports filter call
  yield call(waitFor, selectDonorCode);
  yield call(fetchReports, action);
}

export default function*() {
  yield all([yield takeLatest(onFetchReports.type, handleFetchReports)]);
}
