import React, { useEffect, useRef } from 'react';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

import { prop } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Button, Paper } from '@material-ui/core';

import useFilterStyles from 'styles/filter-styles';
import { onFetchReports } from 'actions';
import FilterMenuButton from './filter-menu-button';

import useFiltersQueries from 'lib/use-filters-queries';
import { FORM_CONFIG } from 'lib/constants';
import { FILTERS_MAP } from '../lib/filters-map';
import MandatoryFilters from './mandatory-filters';
import { selectMenuBarPage } from 'selectors/ui-flags';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function ReportsFilter() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();
  const pageName = useSelector(selectMenuBarPage);

  function handleSubmit(e) {
    e.preventDefault();
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

  const prevPageName = usePrevious(pageName);

  useEffect(() => {
    if (prop('length', prevPageName)) {
      clearFilters();
    }
  }, [pageName]);

  return (
    <>
      <MandatoryFilters />

      <form onSubmit={handleSubmit}>
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
        <Grid container justify="flex-end" className={classes.button}>
          <Button className={classes.formBtn} color="secondary" onClick={handleClear}>
            {FORM_CONFIG.clear.label}
          </Button>
          <Button className={classes.formBtn} color="secondary" onClick={handleSubmit}>
            {FORM_CONFIG.submit.label}
          </Button>
        </Grid>
      </form>
    </>
  );
}

// ReportsFilter.whyDidYouRender = true;
