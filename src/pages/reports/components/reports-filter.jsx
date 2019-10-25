import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mapObjIndexed, always } from 'ramda';
import { Grid, Box } from '@material-ui/core';
import { useParams } from 'react-router';
import useFilterStyles from 'styles/filter-styles';
import { initDonorsFilter } from 'actions';
import FilterMenuButton from './filter-menu-button';
import GrantsFilter from './grants-filter';
import ExternalGrantsFilter from './external-grants-filter';
import ThemeFilter from './theme-filter';
import useFiltersQueries from 'lib/use-filters-queries';

export const FILTERS_MAP = {
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
    Component: ThemeFilter
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
    selectedFilters
  } = useFiltersQueries({ initialFilterValues, initialFiltersActiveState });

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} className={classes.filterContainer} container>
        <Box className={classes.filterMenu}>
          <FilterMenuButton onSelectFilter={handleSelectFilter} selected={filtersActiveState} />
        </Box>

        <Box display="flex" flex="1 1 auto" alignItems="flex-start">
          <Grid container direction="row" spacing={1}>
            {selectedFilters.map((filter, idx) => {
              const { Component } = FILTERS_MAP[filter];
              return (
                <Grid item sm={3} xs={12} key={idx}>
                  <Component onChange={handleFilter(filter)} value={filterValues[filter]} />
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* <Grid item className={classes.button}>
          <Button
            className={classes.formBtn}
            color="secondary"
            onClick={() => {
              reset();
            }}
          >
            {FORM_CONFIG.clear.label}
          </Button>
          <Button className={classes.formBtn} color="secondary" onClick={handleSubmit}>
            {FORM_CONFIG.submit.label}
          </Button>
        </Grid> */}
      </Grid>
    </form>
  );
}
