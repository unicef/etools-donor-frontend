import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mapObjIndexed, always } from 'ramda';
import { Grid, Box, Button } from '@material-ui/core';
import { useParams } from 'react-router';

import useFilterStyles from 'styles/filter-styles';
import { initDonorsFilter, onFetchReports } from 'actions';
import FilterMenuButton from './filter-menu-button';

import useFiltersQueries from 'lib/use-filters-queries';

import { FORM_CONFIG } from 'lib/constants';
import { getInitialFilterValues } from '../constants';
import { FILTERS_MAP } from '../lib/filters-map';

export default function ReportsFilter() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();

  const { donorId: id } = useParams();

  function handleSubmit() {
    dispatch(onFetchReports(filterValues));
  }

  function handleClear() {
    clearFilters();
    dispatch(onFetchReports({}));
  }

  const initialFiltersActiveState = mapObjIndexed(always(false), FILTERS_MAP); // set which filters are active on load
  const initialFilterValues = getInitialFilterValues(); // set default filter values

  const {
    handleSelectFilter,
    handleChangeFilterValue,
    filtersActiveState,
    filterValues,
    selectedFilters,
    clearFilters
  } = useFiltersQueries({ initialFilterValues, initialFiltersActiveState });

  useEffect(() => {
    dispatch(initDonorsFilter(id));
    dispatch(onFetchReports(filterValues));
  }, []);

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
                  <Component
                    onChange={handleChangeFilterValue(filter)}
                    value={filterValues[filter]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Grid>
      <Grid container justify="flex-end" className={classes.button}>
        <Button className={classes.formBtn} color="secondary" onClick={handleClear}>
          {FORM_CONFIG.clear.label}
        </Button>
        <Button className={classes.formBtn} color="secondary" onClick={handleSubmit}>
          {FORM_CONFIG.submit.label}
        </Button>
      </Grid>
    </form>
  );
}
