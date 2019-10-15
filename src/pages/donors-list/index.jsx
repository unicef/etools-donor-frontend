import React, { useEffect, useState } from 'react';
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
  Typography,
  TablePagination,
  InputBase
} from '@material-ui/core';

import { selectDonors } from 'selectors/collections';
import { initDonorsList } from 'actions';
import Loader from 'components/Loader';
import clsx from 'clsx';
import { usePagination } from 'components/table/lib/pagination';
import { selectLoading } from 'selectors/ui-flags';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    overflowX: 'auto'
  },
  link: {
    textDecoration: 'inherit',
    color: theme.palette.secondary.main,
    fontWeight: 500
  },
  tableWrapper: {
    overflow: 'auto',
    maxHeight: '65vh'
  },
  inputRoot: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(6),
    paddingRight: theme.spacing(1)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  inputActive: {
    backgroundColor: theme.palette.common.white
  }
}));

export default function DonorsList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const loading = useSelector(selectLoading);
  const { page: pageName } = useParams();

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const donors = useSelector(selectDonors);

  useEffect(() => {
    dispatch(initDonorsList(pageName));
  }, []);

  useEffect(() => {
    if (donors.length) {
      setFilteredList(donors);
    }
  }, [donors]);

  function handleSearch(e) {
    const { value } = e.target;
    setQuery(value);
    setFilteredList(donors.filter(({ name }) => name.includes(value)));
  }

  return (
    <Grid container direction="row" justify="center">
      <Loader loading={loading} fullscreen />
      <Grid item xs={4}>
        <Typography>Select Donor:</Typography>
        <Paper className={clsx(classes.root)}>
          <div className={classes.tableWrapper}>
            <Table stickyHeader className={clsx(classes.table)}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Code</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className={clsx(searchActive && classes.inputActive)}>
                    <InputBase
                      placeholder="Search"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'description'
                      }}
                      onChange={handleSearch}
                      value={query}
                      onFocus={() => setSearchActive(true)}
                      onBlur={() => setSearchActive(false)}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => (
                    <TableRow hover key={row.code}>
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
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={donors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'previous page'
            }}
            nextIconButtonProps={{
              'aria-label': 'next page'
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
