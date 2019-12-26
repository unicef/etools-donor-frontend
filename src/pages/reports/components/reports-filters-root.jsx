import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Grid, Box, Button, InputLabel, Paper } from '@material-ui/core';

import useFilterStyles from 'styles/filter-styles';
import { onFetchReports } from 'actions';
import FilterMenuButton from './filter-menu-button';

import useFiltersQueries from 'lib/use-filters-queries';

import { FORM_CONFIG, PAGE_DROPDOWN_NAME_MAP } from 'lib/constants';
import { FILTERS_MAP } from '../lib/filters-map';
import MandatoryFilters from './mandatory-filters';
import { selectMandatoryFilterSelected } from 'selectors/filter';
import DisableWrapper from 'components/DisableWrapper';
import { selectMenuBarPage } from 'selectors/ui-flags';

export default function ReportsFilter() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();
  const mandatorySelected = useSelector(selectMandatoryFilterSelected);

  function handleSubmit() {
    dispatch(onFetchReports(filterValues));
  }

  function handleClear() {
    clearFilters();
    dispatch(onFetchReports({}));
  }

  const {
    handleSelectFilter,
    handleChangeFilterValue,
    filtersActiveState,
    filterValues,
    selectedFilters,
    clearFilters
  } = useFiltersQueries(FILTERS_MAP);

  useEffect(() => {
    dispatch(onFetchReports(filterValues));
  }, []);

  const pageDropdownName = PAGE_DROPDOWN_NAME_MAP[useSelector(selectMenuBarPage)];

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel className={clsx(classes.loneLabel, mandatorySelected && 'hidden')}>
        Select a {pageDropdownName} to enable filters
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
                className={classes.filterComponents}
                container
                direction="row"
                flex="1 1 auto"
                spacing={2}
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
