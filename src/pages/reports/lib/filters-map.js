import {
  GRANT_FIELD,
  THEME_FIELD,
  GRANT_EXPIRY_BEFORE_FIELD,
  GRANT_EXPIRY_AFTER_FIELD,
  GRANT_ISSUE_YEAR,
  REPORT_TYPE_FIELD,
  REPORT_CATEGORY_FIELD,
  REPORT_END_DATE_BEFORE_FIELD,
  REPORT_END_DATE_AFTER_FIELD,
  RECIPIENT_OFFICE_FIELD,
  TITLE_FIELD,
  EXTERNAL_REF_GRANT_FIELD
} from '../constants';

import {
  ReportEndDateBeforeFilter,
  ReportEndDateAfterFilter
} from '../components/report-end-date-filter';
import { GrantExpiryBeforeFilter, GrantExpiryAfterFilter } from '../components/grant-expiry-filter';
import GrantIssueYearFilter from '../components/grant-issue-year-filter';
import ReportTypeFilter from '../components/report-type-filter';
import ReportCategoryFilter from '../components/report-category-filter';
import RecipientOfficeFilter from '../components/recipient-office-filter';
import GrantsFilter from '../components/grants-filter';
import ExternalGrantsFilter from '../components/external-grants-filter';
import ThemeFilter from '../components/theme-filter';
import TitleSearchFilter from '../components/title-search-filter';

export const FILTERS_MAP = {
  [GRANT_FIELD]: {
    label: 'Grant',
    Component: GrantsFilter
  },
  [EXTERNAL_REF_GRANT_FIELD]: {
    label: 'External Reference Grant',
    Component: ExternalGrantsFilter
  },

  [TITLE_FIELD]: {
    label: 'Title',
    Component: TitleSearchFilter,
    gridSize: 2
  },

  [THEME_FIELD]: {
    label: 'Theme',
    Component: ThemeFilter,
    gridSize: 4
  },

  [GRANT_EXPIRY_BEFORE_FIELD]: {
    label: 'Grant Expiry Before Date',
    Component: GrantExpiryBeforeFilter
  },

  [GRANT_EXPIRY_AFTER_FIELD]: {
    label: 'Grant Expiry After Date',
    Component: GrantExpiryAfterFilter
  },

  [GRANT_ISSUE_YEAR]: {
    label: 'Grant Issue Year',
    Component: GrantIssueYearFilter,
    gridSize: 2
  },

  [REPORT_TYPE_FIELD]: {
    label: 'Report Type',
    Component: ReportTypeFilter
  },

  [REPORT_CATEGORY_FIELD]: {
    label: 'Report Category',
    Component: ReportCategoryFilter
  },

  [RECIPIENT_OFFICE_FIELD]: {
    label: 'Recipient Office',
    Component: RecipientOfficeFilter
  },

  [REPORT_END_DATE_BEFORE_FIELD]: {
    label: 'Report End Before Date',
    Component: ReportEndDateBeforeFilter
  },

  [REPORT_END_DATE_AFTER_FIELD]: {
    label: 'Report End After Date',
    Component: ReportEndDateAfterFilter
  }
};
