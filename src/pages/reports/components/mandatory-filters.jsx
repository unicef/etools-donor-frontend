import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReportsStartDate } from 'selectors/filter';
import { reportYearChanged } from 'slices/report-filter';
import { Grid } from '@material-ui/core';
import useFilterStyles from 'styles/filter-styles';
import { setCurrentlyLoadedDonor } from 'slices/ui';

export default function MandatoryFilters() {
  const dispatch = useDispatch();
  const classes = useFilterStyles();

  useEffect(() => {
    dispatch(reportYearChanged(''))
    return function cleanup() {
      dispatch(setCurrentlyLoadedDonor(''))
    }
  }, [])

  return (
    <Grid item style={{ width: '100%' }}>
      <Grid item className={classes.filterBox} />
    </Grid>
  );
}
