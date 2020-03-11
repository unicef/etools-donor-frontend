import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YearFilter from './report-year-filter';
import { selectReportYear } from 'selectors/filter';
import { reportYearChanged } from 'slices/report-filter';
import { Grid } from '@material-ui/core';
import useFilterStyles from 'styles/filter-styles';
import { parseEventValue } from 'lib/helpers';

export default function MandatoryFilters() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();
  const reportYear = useSelector(selectReportYear);

  return (
    <Grid item style={{ width: '100%' }}>
      <Grid item className={classes.filterBox}>
        <YearFilter
          onChange={val => dispatch(reportYearChanged(parseEventValue(val)))}
          value={reportYear}
        />
      </Grid>
    </Grid>
  );
}
