import {
  GRANT_FIELD,
  // EXTERNAL_REF_GRANT_FIELD,
  THEME_FIELD,
  GRANT_EXPIRY_BEFORE_FIELD,
  GRANT_EXPIRY_AFTER_FIELD,
  GRANT_ISSUE_YEAR,
  REPORT_TYPE_FIELD,
  REPORT_CATEGORY_FIELD,
  REPORT_GROUP_FIELD,
  DONOR_DOCUMENT_FIELD,
  // REPORT_PERIOD_FIELD,
  REPORT_END_DATE_BEFORE_FIELD,
  REPORT_END_DATE_AFTER_FIELD,
  RECERTIFIED_FIELD,
  RECIPIENT_OFFICE_FIELD
} from '../constants';

// import {
//   GrantClosureDateBeforeFilter,
//   GrantClosureDateAfterFilter
// } from '../components/grant-closure-date-filter';
import {
  ReportEndDateBeforeFilter,
  ReportEndDateAfterFilter
} from '../components/report-end-date-filter';
import { GrantExpiryBeforeFilter, GrantExpiryAfterFilter } from '../components/grant-expiry-filter';
import GrantIssueYearFilter from '../components/grant-issue-year-filter';
import ReportTypeFilter from '../components/report-type-filter';
import ReportCategoryFilter from '../components/report-category-filter';
import RecipientOfficeFilter from '../components/recipient-office-filter';
import ReportingGroupFilter from '../components/reporting-group-filter';
import RecertifiedFilter from '../components/recertified-filter';
import DonorDocumentFilter from '../components/donor-document-filter';
import GrantsFilter from '../components/grants-filter';
// import ExternalGrantsFilter from '../components/external-grants-filter';
import ThemeFilter from '../components/theme-filter';

export const FILTERS_MAP = {
  [GRANT_FIELD]: {
    label: 'Grant',
    Component: GrantsFilter
  },
  // [EXTERNAL_REF_GRANT_FIELD]: {
  //   label: 'External Reference Grant',
  //   Component: ExternalGrantsFilter
  // },

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
  },

  // [REPORT_GROUP_FIELD]: {
  //   label: 'Reporting Group',
  //   Component: ReportingGroupFilter
  // },

  [RECERTIFIED_FIELD]: {
    label: 'Recertified',
    Component: RecertifiedFilter,
    gridSize: 2
  },

  // grantClosureBeforeDate: {
  //   label: 'Grant Financial Closure Before Date',
  //   Component: GrantClosureDateBeforeFilter,
  //   gridSize: 4
  // },

  // grantClosureAfterDate: {
  //   label: 'Grant Financial Closure After Date',
  //   Component: GrantClosureDateAfterFilter,
  //   gridSize: 4
  // },

  [DONOR_DOCUMENT_FIELD]: {
    label: 'Donor Document',
    Component: DonorDocumentFilter
  }
};
