import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Typography
} from '@material-ui/core';

import { selectDonors } from 'selectors/collections';
import { initDonorsList } from 'actions';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    overflowX: 'auto'
  },
  link: {
    textDecoration: 'inherit',
    color: theme.palette.secondary.main,
    fontWeight: 500
  }
}));

export default function DonorsList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { page } = useParams();

  useEffect(() => {
    dispatch(initDonorsList(page));
  }, []);

  const donors = useSelector(selectDonors);

  return (
    <Grid container direction="row">
      <Grid item xs={4}>
        <Typography>Select Donor:</Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donors.map(row => (
                <TableRow hover key={row.name}>
                  <TableCell component="th" scope="row">
                    <Link
                      className={classes.link}
                      to={location => `${location.pathname}/${row.id}`}
                    >
                      {row.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}
