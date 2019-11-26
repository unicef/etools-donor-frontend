import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { mapObjIndexed, always } from 'ramda';
import { Grid, Box, Button, InputLabel, Paper } from '@material-ui/core';
import { useParams } from 'react-router';

import useFilterStyles from 'styles/filter-styles';
import { initDonorsFilter, onFetchReports } from 'actions';
import FilterMenuButton from './filter-menu-button';

import useFiltersQueries from 'lib/use-filters-queries';

import { FORM_CONFIG } from 'lib/constants';
import { getInitialFilterValues } from '../constants';
import { FILTERS_MAP } from '../lib/filters-map';
import MandatoryFilters from './mandatory-filters';
import { selectMandatoryFilterSelected } from 'selectors/filter';
import DisableWrapper from 'components/DisableWrapper';

export default function ReportsFilter() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();
  const mandatorySelected = useSelector(selectMandatoryFilterSelected);
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
      <InputLabel className={clsx(classes.loneLabel, mandatorySelected && 'hidden')}>
        Select a year or theme to enable filters
      </InputLabel>
      <MandatoryFilters />

      <DisableWrapper disabled={!mandatorySelected}>
        <Paper>
          <Grid item xs={12} className={classes.filterContainer} container wrap="nowrap">
            <Box className={classes.filterMenu}>
              <FilterMenuButton onSelectFilter={handleSelectFilter} selected={filtersActiveState} />
            </Box>

            <Box display="flex" flex="1 1 auto" alignItems="flex-start" flexWrap="wrap">
              <Grid
                container
                direction="row"
                flex="1 1 auto"
                spacing={2}
                className={classes.filterComponents}
              >
                {selectedFilters.map((filter, idx) => {
                  const { Component: FilterComponent } = FILTERS_MAP[filter];

                  return (
                    <Grid
                      item
                      className={classes.filterBox}
                      sm={FILTERS_MAP[filter].gridSize || 3}
                      key={idx}
                    >
                      <FilterComponent
                        onChange={handleChangeFilterValue(filter)}
                        value={filterValues[filter]}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Paper>
      </DisableWrapper>
      <Grid container justify="flex-end" className={classes.button}>
        <Button className={classes.formBtn} color="secondary" onClick={handleClear}>
          {FORM_CONFIG.clear.label}
        </Button>
        <Button
          className={classes.formBtn}
          color="secondary"
          onClick={handleSubmit}
          disabled={!mandatorySelected}
        >
          {FORM_CONFIG.submit.label}
        </Button>
      </Grid>
    </form>
  );
}
