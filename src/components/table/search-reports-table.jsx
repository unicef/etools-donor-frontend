import React from 'react';
import { useSelector } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link, Tooltip, TableContainer } from '@material-ui/core';
import FiberNewIcon from '@material-ui/icons/FiberNew';

import { useTableStyles } from 'styles/table-styles';
import EnhancedTableToolbar from './table-toolbar';
import EnhancedTableHead from './table-head';
import { selectSearchReports } from 'selectors/collections';
import { usePermissions } from 'components/PermissionRedirect';
import { useTable, getDisplayDate, stableSort, getSorting } from './lib/index-search';
import clsx from 'clsx';
import {
  BACKEND_REPORTS_FIELDS,
  EXTERNAL_REF_GRANT_FIELD
} from '../../pages/reports/constants';
import TablePaginationActions from './table-pagination-actions';

export function getRecipientOfficeStr(report) {
  const recipientOffices = report.recipient_office || [];
  return recipientOffices.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1)).join(',');
}

const certifiedReportsTableHeadings = [
  { id: BACKEND_REPORTS_FIELDS['title'], label: 'Filename', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['grant'], label: 'Grant', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['donorReportCategory'], label: 'Report Category', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['reportGroup'], label: 'Report Group', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['reportType'], label: 'Report Type', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['recipientOffice'], label: 'Recipient Office', sortable: true },
];

const externalRefCell = {
  id: EXTERNAL_REF_GRANT_FIELD,
  label: 'External Ref Grant',
  sortable: true
};

// inserts extra column for non-unicef users as per requirements
const getHeadCells = (isUnicefUser, cells) => {
  if (!isUnicefUser) {
    return [...cells.slice(0, 1), externalRefCell, ...cells.slice(1)];
  }
  return cells;
};

export default function ReportsTable() {
  const classes = useTableStyles();

  const { isUnicefUser } = usePermissions();
  const data = useSelector(selectSearchReports);
  const rows = data.items || [];
  const headCells = getHeadCells(isUnicefUser, certifiedReportsTableHeadings);

  const {
    orderBy,
    order,
    page,
    handleRequestSort,
    handleChangePage
  } = useTable(BACKEND_REPORTS_FIELDS['recipientOffice']);
  const shouldShowExternalGrants = !isUnicefUser;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer className={classes.tableContainer} aria-label="sticky table">
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" size="medium">
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
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell
                        className={clsx(classes.cell, classes.titleCell)}
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        <Tooltip title={row.title ? row.title : ''}>
                          <Typography className={classes.overflow}>
                            <Link color="secondary" href={row.download_url} target="_blank">
                              {row.is_new && <FiberNewIcon fontSize="small" color="error" />}
                              {row.title}
                            </Link>
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      {/* {row.theme && (
                        <Tooltip title={row.theme ? row.theme : ''}>
                          <TableCell className={classes.cell} align="left">
                            {row.theme}
                          </TableCell>
                        </Tooltip>
                      )} */}
                      {shouldShowExternalGrants && (
                        <Tooltip title={row.external_reference ? row.external_reference : ''}>
                          <TableCell className={classes.cell} align="left">{row.external_reference}</TableCell>
                        </Tooltip>
                      )}
                      <Tooltip title={row.grant_number ? row.grant_number : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.grant_number}
                        </TableCell>
                      </Tooltip>
                      <Tooltip title={row.donor_report_category ? row.donor_report_category : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.donor_report_category}
                        </TableCell>
                      </Tooltip>
                      <Tooltip title={row.report_group ? row.report_group : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.report_group}
                        </TableCell>
                      </Tooltip>
                      <Tooltip title={row.report_type ? row.report_type : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.report_type}
                        </TableCell>
                      </Tooltip>
                      <Tooltip title={row.recipientOffice ? row.recipientOffice : ''}>
                        <TableCell className={classes.cell} align="left">
                          {row.recipient_office ? row.recipient_office.join(', ') : row.recipientOffice}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={data.total_rows || 0}
          rowsPerPage={10}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}

          onChangePage={handleChangePage}
          ActionsComponent={TablePaginationActions}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {/* <DocViewer fileType={docFileType} filePath={doc} /> */}
      </Paper >
    </div >
  );
}
