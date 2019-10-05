import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link } from '@material-ui/core';
import { useTableStyles } from 'styles/table-styles';
import EnhancedTableToolbar from './table-toolbar';
import EnhancedTableHead from './table-head';

function createData(title, country, grant, donor, date, theme) {
  return { title, country, grant, donor, date, theme };
}

const rows = [
  createData(
    'Report 1',
    'Syria',
    'FirstGrantTest',
    'Donor Company 1',
    '2019-09-27',
    'Higher Education'
  ),
  createData(
    'Report 2',
    'Iraq',
    'SecondGrant',
    'Donor Company 5',
    '2019-09-27',
    'Higher Education'
  ),
  createData('Report 3', 'Iraq', 'Grant4', 'Donor Company', '2019-09-27', 'Higher Education'),
  createData(
    'Report 4',
    'Iraq',
    'Grant and Test',
    'Donor Company 6',
    '2019-09-27',
    'Higher Education'
  ),
  createData('Report 5', 'Iraq', 'Grant Test', 'Donor Company 4', '2019-09-27', 'Higher Education'),
  createData(
    'Report 6',
    'Iraq',
    'SecondGrant',
    'Donor Company 5',
    '2019-09-27',
    'Higher Education'
  ),
  createData('Report 7', 'Iraq', 'SecondGrant', 'Donor Company 5', '2019-09-27', 'Higher Education')
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
  { id: 'country', numeric: true, disablePadding: false, label: 'Country' },
  { id: 'grant', numeric: true, disablePadding: false, label: 'Grant' },
  { id: 'donor', numeric: true, disablePadding: false, label: 'Donor' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'theme', numeric: true, disablePadding: false, label: 'Theme' }
];

export default function ReportsTable() {
  const classes = useTableStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              cells={headCells}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                      <TableCell component="th" id={labelId} scope="row">
                        <Typography>
                          <Link color="secondary" href="#">
                            {row.title}
                          </Link>
                        </Typography>
                      </TableCell>
                      <TableCell align="left">{row.country}</TableCell>
                      <TableCell align="left">{row.grant}</TableCell>
                      <TableCell align="left">{row.donor}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.theme}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
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
    </div>
  );
}
