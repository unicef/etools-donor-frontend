import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
import { selectReports } from 'selectors/collections';
import { usePermissions } from 'components/PermissionRedirect';
import { useTable, getDisplayDate } from './lib';
import clsx from 'clsx';
import { BACKEND_REPORTS_FIELDS } from '../../pages/reports/constants';

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
  { id: BACKEND_REPORTS_FIELDS['title'], label: 'Title' },
  { id: BACKEND_REPORTS_FIELDS['country'], label: 'Recipient Office' },
  { id: BACKEND_REPORTS_FIELDS['grant'], label: 'Grant' },
  { id: BACKEND_REPORTS_FIELDS['reportType'], label: 'Report Type' },
  { id: BACKEND_REPORTS_FIELDS['reportEndDate'], label: 'Report End Date' },
  { id: BACKEND_REPORTS_FIELDS['grantExpiryDate'], label: 'Grant Expiry' }
];

const externalRefCell = {
  id: 'external_ref_grant',
  numeric: false,
  disablePadding: false,
  label: 'External Ref Grant'
};

// inserts extra column for non-unicef users as per requirements
const getHeadCells = (isUnicefUser, cells) => {
  if (!isUnicefUser) {
    return [...cells.slice(0, 2), externalRefCell, ...cells.slice(2)];
  }
  return cells;
};

export default function ReportsTable() {
  const classes = useTableStyles();

  const { isUnicefUser } = usePermissions();

  const rows = useSelector(selectReports);

  const {
    orderBy,
    order,
    page,
    rowsPerPage,
    getEmptyRows,
    handleRequestSort,
    handleChangeRowsPerPage,
    handleChangePage
  } = useTable();

  const emptyRows = getEmptyRows(rows);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              cells={getHeadCells(isUnicefUser, headCells)}
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell
                        className={clsx(classes.cell, classes.titleCell)}
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        <Typography>
                          <Link color="secondary" href={row.download_url}>
                            {row.title}
                          </Link>
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {row.recipient_office}
                      </TableCell>
                      {!isUnicefUser && (
                        <TableCell align="left">{row.external_ref_grant}</TableCell>
                      )}
                      <TableCell className={classes.cell} align="left">
                        {row.grant_number}
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {row.report_type}
                      </TableCell>
                      <TableCell className={clsx(classes.cell, classes.dateCell)} align="left">
                        {getDisplayDate(row.report_end_date)}
                      </TableCell>
                      <TableCell className={clsx(classes.cell, classes.dateCell)} align="left">
                        {getDisplayDate(row.grant_expiry_date)}
                      </TableCell>
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
        {/* <DocViewer fileType={docFileType} filePath={doc} /> */}
      </Paper>
    </div>
  );
}
