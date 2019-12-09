import { createSelector } from 'reselect';
export const selectGrants = state => state.grants;
export const selectExternalGrants = state => state.externalGrants;
export const selectThemeCollection = state => state.themes;
export const selectDonors = state => state.donors;
export const selectStaticAssets = state => state.staticAssets;
export const selectReports = state => state.reports;
export const selectOffices = state => state.offices;

export const selectYears = createSelector(
  selectStaticAssets,
  assets => assets.report_years
  // assets => assets.years
);
export const selectReportType = createSelector(
  selectStaticAssets,
  assets => assets.report_type
);
export const selectDonorDocuments = createSelector(
  selectStaticAssets,
  assets => assets.donor_document
);
export const selectDonorCategory = createSelector(
  selectStaticAssets,
  assets => assets.donor_reporting_category
);
export const selectReportingGroup = createSelector(
  selectStaticAssets,
  assets => assets.reporting_group
);
export const selectIsRecertified = createSelector(
  selectStaticAssets,
  assets => assets.recertified
);
