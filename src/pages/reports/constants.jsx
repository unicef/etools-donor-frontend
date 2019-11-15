import { mapObjIndexed, always } from 'ramda';
import { FILTERS_MAP } from './lib/filters-map';
import { format, subYears } from 'date-fns';

import { DATE_FORMAT } from './lib/date-filter-factory';

export const BACKEND_REPORTS_FIELDS = {
  title: 'title',
  country: 'recipient_office',
  grant: 'grant_number',
  reportType: 'report_type',
  reportEndDate: 'report_end_date',
  grantExpiryDate: 'grant_expiry_date'
};

export const TITLE_FIELD = 'title';
export const COUNTRY_FIELD = 'recipient_office';
export const GRANT_FIELD = 'grant_number__in';
export const EXTERNAL_REF_GRANT_FIELD = 'external_ref_grant_number__in';
export const REPORT_TYPE_FIELD = 'report_type__in';
export const REPORT_GROUP_FIELD = 'report_group__in';
export const REPORT_END_DATE_FIELD = 'report_end_date';
export const REPORT_END_DATE_BEFORE_FIELD = 'report_end_date__lte';
export const REPORT_END_DATE_AFTER_FIELD = 'report_end_date__gte';
export const REPORT_PERIOD_FIELD = 'report_period';
export const THEME_FIELD = 'theme';
export const GRANT_EXPIRY_DATE_FIELD = 'grant_expiry_date';
export const GRANT_EXPIRY_BEFORE_FIELD = 'grant_expiry_date__lte';
export const GRANT_EXPIRY_AFTER_FIELD = 'grant_expiry_date__gte';
export const GRANT_ISSUE_YEAR = 'grant_issue_year__in';
export const REPORT_CATEGORY_FIELD = 'donor_report_category__in';
export const DONOR_DOCUMENT_FIELD = 'donor_document';
export const RECERTIFIED_FIELD = 'recertified';

export function getInitialFilterValues() {
  const today = new Date();
  const aYearAgo = subYears(today, 1);
  const reportsWithinLastYear = {
    [REPORT_END_DATE_BEFORE_FIELD]: format(today, DATE_FORMAT),
    [REPORT_END_DATE_AFTER_FIELD]: format(aYearAgo, DATE_FORMAT)
  };
  return { ...mapObjIndexed(always(''), FILTERS_MAP), ...reportsWithinLastYear };
}
