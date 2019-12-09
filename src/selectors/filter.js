import { createSelector } from 'reselect';

export const selectReportFilter = state => state.reportFilter;

export const selectReportYear = createSelector(
  selectReportFilter,
  filter => filter.reportYear
);

export const selectTheme = createSelector(
  selectReportFilter,
  filter => filter.theme
);

export const selectMandatoryFilterSelected = createSelector(
  selectReportFilter,
  filter => Boolean(filter.theme || filter.reportYear)
);
