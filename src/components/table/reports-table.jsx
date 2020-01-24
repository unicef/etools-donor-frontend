import React from 'react';
import { useSelector } from 'react-redux';

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
import { useTable, getDisplayDate, stableSort, getSorting } from './lib';
import clsx from 'clsx';
import {
  BACKEND_REPORTS_FIELDS,
  BACKEND_THEMATIC_FIELDS,
  EXTERNAL_REF_GRANT_FIELD
} from '../../pages/reports/constants';
import { selectMenuBarPage } from 'selectors/ui-flags';
import { THEMATIC_REPORTS, REPORTS } from 'lib/constants';

export function getRecipientOfficeStr(report) {
  const recipientOffices = report.recipient_office || [];
  return recipientOffices.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1)).join(',');
}

const certifiedReportsTableHeadings = [
  { id: BACKEND_REPORTS_FIELDS['title'], label: 'Title', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['recipientOffice'], label: 'Recipient Office', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['reportType'], label: 'Report Type', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['reportEndDate'], label: 'Report End Date', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['grant'], label: 'Grant', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['grantExpiryDate'], label: 'Grant Expiry', sortable: true }
];

const thematicReportsTableHeadings = [
  { id: BACKEND_THEMATIC_FIELDS['title'], label: 'Title', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['theme'], label: 'Theme', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['recipientOffice'], label: 'Recipient Office', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['reportType'], label: 'Report Type', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['reportEndDate'], label: 'Report End Date', sortable: true }
];

const externalRefCell = {
  id: EXTERNAL_REF_GRANT_FIELD,
  label: 'External Ref Grant',
  sortable: true
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
  const pageName = useSelector(selectMenuBarPage);
  const certifiedReports = pageName === REPORTS;
  const headCells =
    pageName === THEMATIC_REPORTS
      ? thematicReportsTableHeadings
      : getHeadCells(isUnicefUser, certifiedReportsTableHeadings);

  const {
    orderBy,
    order,
    page,
    rowsPerPage,
    getEmptyRows,
    handleRequestSort,
    handleChangeRowsPerPage,
    handleChangePage
  } = useTable(BACKEND_REPORTS_FIELDS['recipientOffice']);
  const shouldShowExternalGrants = certifiedReports && !isUnicefUser;
  const emptyRows = getEmptyRows(rows);
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
                      {row.theme && (
                        <TableCell className={classes.cell} align="left">
                          {row.theme}
                        </TableCell>
                      )}
                      <TableCell className={classes.cell} align="left">
                        {row.recipient_office}
                      </TableCell>
                      {shouldShowExternalGrants && (
                        <TableCell align="left">{row.external_reference}</TableCell>
                      )}
                      <TableCell className={classes.cell} align="left">
                        {row.report_type}
                      </TableCell>
                      <TableCell className={clsx(classes.cell, classes.dateCell)} align="left">
                        {getDisplayDate(row.report_end_date)}
                      </TableCell>
                      {certifiedReports && (
                        <TableCell className={classes.cell} align="left">
                          {row.grant_number}
                        </TableCell>
                      )}
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
