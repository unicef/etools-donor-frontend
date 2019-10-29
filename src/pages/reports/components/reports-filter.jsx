import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mapObjIndexed, always } from 'ramda';
import { Grid, Box, Button } from '@material-ui/core';
import { useParams } from 'react-router';

import useFilterStyles from 'styles/filter-styles';
import { initDonorsFilter } from 'actions';
import FilterMenuButton from './filter-menu-button';
import GrantsFilter from './grants-filter';
import ExternalGrantsFilter from './external-grants-filter';
import ThemeFilter from './theme-filter';
import useFiltersQueries from 'lib/use-filters-queries';
import { GrantExpiryBeforeFilter, GrantExpiryAfterFilter } from './grant-expiry-filter';
import GrantIssueYearFilter from './grant-issue-year-filter';
import ReportTypeFilter from './report-type-filter';
import ReportCategoryFilter from './report-category-filter';
import ReportPeriodFilter from './report-period-filter';
import ReportingGroupFilter from './reporting-group-filter';
import RecertifiedFilter from './recertified-filter';
import DonorDocumentFilter from './donor-document-filter';

import {
  GrantClosureDateBeforeFilter,
  GrantClosureDateAfterFilter
} from './grant-closure-date-filter';
import { FORM_CONFIG } from 'lib/constants';

export const FILTERS_MAP = {
  //TODO: make keys computed values from consts set by backend field strings when api is ready ie. [GRANT_FIELD_NAME]: {label:Grant, Component: GrantFilter}
  grant: {
    label: 'Grant',
    Component: GrantsFilter
  },
  externalGrant: {
    label: 'External Reference Grant',
    Component: ExternalGrantsFilter
  },
  theme: {
    label: 'Theme',
    Component: ThemeFilter,
    gridSize: 4
  },

  grantExpiryBeforeDate: {
    label: 'Grant Expiry Before Date',
    Component: GrantExpiryBeforeFilter
  },

  grantExpiryAfterDate: {
    label: 'Grant Expiry After Date',
    Component: GrantExpiryAfterFilter
  },

  grantIssueYear: {
    label: 'Grant Issue Year',
    Component: GrantIssueYearFilter,
    gridSize: 2
  },

  reportType: {
    label: 'Report Type',
    Component: ReportTypeFilter
  },

  reportCategory: {
    label: 'Report Category',
    Component: ReportCategoryFilter
  },

  reportPeriod: {
    label: 'Report Period',
    Component: ReportPeriodFilter,
    gridSize: 2
  },

  reportingGroup: {
    label: 'Reporting Group',
    Component: ReportingGroupFilter
  },

  recertified: {
    label: 'Recertified',
    Component: RecertifiedFilter,
    gridSize: 2
  },

  grantClosureBeforeDate: {
    label: 'Grant Financial Closure Before Date',
    Component: GrantClosureDateBeforeFilter,
    gridSize: 4
  },

  grantClosureAfterDate: {
    label: 'Grant Financial Closure After Date',
    Component: GrantClosureDateAfterFilter,
    gridSize: 4
  },
  donorDocument: {
    label: 'Donor Document',
    Component: DonorDocumentFilter
  }
};

export default function ReportsFilter() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();

  const { donorId: id } = useParams();

  useEffect(() => {
    dispatch(initDonorsFilter(id));
  }, []);

  function handleSubmit() {}

  const initialFiltersActiveState = mapObjIndexed(always(false), FILTERS_MAP); // set which filters are active on load
  const initialFilterValues = mapObjIndexed(always(''), FILTERS_MAP); // set default filter values

  const {
    handleSelectFilter,
    handleFilter,
    filtersActiveState,
    filterValues,
    selectedFilters,
    clearFilters
  } = useFiltersQueries({ initialFilterValues, initialFiltersActiveState });

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} className={classes.filterContainer} container wrap="nowrap">
        <Box className={classes.filterMenu}>
          <FilterMenuButton onSelectFilter={handleSelectFilter} selected={filtersActiveState} />
        </Box>

        <Box display="flex" flex="1 1 auto" alignItems="flex-start" flexWrap="wrap">
          <Grid container direction="row" flex="1 1 auto" spacing={2}>
            {selectedFilters.map((filter, idx) => {
              const { Component } = FILTERS_MAP[filter];
              return (
                <Grid
                  item
                  className={classes.filterBox}
                  sm={FILTERS_MAP[filter].gridSize || 3}
                  key={idx}
                >
                  <Component onChange={handleFilter(filter)} value={filterValues[filter]} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Grid>
      <Grid container justify="flex-end" className={classes.button}>
        <Button className={classes.formBtn} color="secondary" onClick={clearFilters}>
          {FORM_CONFIG.clear.label}
        </Button>
        <Button className={classes.formBtn} color="secondary" onClick={handleSubmit}>
          {FORM_CONFIG.submit.label}
        </Button>
      </Grid>
    </form>
  );
}
