import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YearFilter from './report-year-filter';
import { selectReportYear, selectTheme } from 'selectors/filter';
import { reportYearChanged, themeChanged } from 'slices/report-filter';
import { Grid } from '@material-ui/core';
import useFilterStyles from 'styles/filter-styles';
import ThemeFilter from './theme-filter';
import { parseEventValue } from 'lib/helpers';

export default function MandatoryFilters() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();

  const reportYear = useSelector(selectReportYear);
  const theme = useSelector(selectTheme);

  return (
    <Grid item xs={12} container>
      <Grid item className={classes.filterBox} sm={2}>
        <YearFilter
          onChange={val => dispatch(reportYearChanged(parseEventValue(val)))}
          value={reportYear}
          disabled={!!theme}
        />
      </Grid>
      <Grid item className={classes.filterBox} sm={3}>
        <ThemeFilter
          onChange={val => dispatch(themeChanged(parseEventValue(val)))}
          value={theme}
          disabled={!!reportYear}
        />
      </Grid>
    </Grid>
  );
}
