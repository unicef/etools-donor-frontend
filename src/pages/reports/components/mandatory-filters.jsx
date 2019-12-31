import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YearFilter from './report-year-filter';
import { selectReportYear } from 'selectors/filter';
import { reportYearChanged } from 'slices/report-filter';
import { Grid } from '@material-ui/core';
import useFilterStyles from 'styles/filter-styles';
import { parseEventValue } from 'lib/helpers';
import { selectMenuBarPage } from 'selectors/ui-flags';
import { REPORTS } from 'lib/constants';

export default function MandatoryFilters() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();

  const reportYear = useSelector(selectReportYear);
  const reportPageName = useSelector(selectMenuBarPage);

  return (
    <Grid item xs={12} container>
      <Grid item className={classes.filterBox} sm={2}>
        {reportPageName === REPORTS && (
          <YearFilter
            onChange={val => dispatch(reportYearChanged(parseEventValue(val)))}
            value={reportYear}
          />
        )}
      </Grid>
    </Grid>
  );
}
