import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { Link, Tooltip, TableContainer, Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FiberNewIcon from '@material-ui/icons/FiberNew';

import { useTableStyles } from 'styles/table-styles';
import EnhancedTableToolbar from './table-toolbar';
import EnhancedTableHead from './table-head';
import { selectSearchReports } from 'selectors/collections';
import { usePermissions } from 'components/PermissionRedirect';
import { useTable, stableSort, getSorting, getDisplayDate, getDisplayValue } from './lib/index-search';
import clsx from 'clsx';
import {
  BACKEND_REPORTS_FIELDS,
  BACKEND_THEMATIC_FIELDS,
  EXTERNAL_REF_GRANT_FIELD,
  BACKEND_GAVI_FIELDS,
  REPORT_GROUP_FIELD
} from '../../pages/reports/constants';
import TablePaginationActions from './table-pagination-actions';
import { selectMenuBarPage } from 'selectors/ui-flags';
import { POOLED_GRANTS, THEMATIC_GRANTS, GAVI_REPORTS } from 'lib/constants';
import { useMatomo } from '@datapunt/matomo-tracker-react';

export function getRecipientOfficeStr(report) {
  const recipientOffices = report.recipient_office || [];
  return recipientOffices.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1)).join(',');
}

const certifiedReportsTableHeadings = [
  { id: BACKEND_REPORTS_FIELDS['title'], label: 'Filename', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['grant'], label: 'Grant', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['donorReportCategory'], label: 'Report Category', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['donorDocument'], label: 'Document Type', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['reportType'], label: 'Report Type', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['modified'], label: 'Modified', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['recipientOffice'], label: 'Recipient Office', sortable: true },
];

const thematicReportsTableHeadings = [
  { id: BACKEND_THEMATIC_FIELDS['title'], label: 'Filename', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['theme'], label: 'Theme', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['grant'], label: 'Grant', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['donorDocument'], label: 'Document Type', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['reportType'], label: 'Report Type', sortable: true },
  { id: BACKEND_REPORTS_FIELDS['modified'], label: 'Modified', sortable: true },
  { id: BACKEND_THEMATIC_FIELDS['reportEndDate'], label: 'Report End Date', sortable: true },
];

const gaviReportsTableHeadings = [
  { id: '', label: '', sortable: false },
  { id: BACKEND_GAVI_FIELDS['name'], label: 'Name', sortable: true },
  { id: BACKEND_GAVI_FIELDS['ctnNumber'], label: 'CTN Number', sortable: true },
  { id: BACKEND_GAVI_FIELDS['country'], label: 'Country Name', sortable: true },
  { id: BACKEND_GAVI_FIELDS['mouNumber'], label: 'MOU Number', sortable: true },
  { id: BACKEND_GAVI_FIELDS['approvalYear'], label: 'Approval Year', sortable: true },
  { id: BACKEND_GAVI_FIELDS['sentDate'], label: 'Sent To GAVI Date', sortable: true },
  { id: BACKEND_GAVI_FIELDS['gaviWBS'], label: 'GAVI WBS', sortable: true },
]

const externalRefCell = {
  id: EXTERNAL_REF_GRANT_FIELD,
  label: 'Partner Ref No',
  sortable: true
};

const internalExternalCell = {
  id: REPORT_GROUP_FIELD,
  label: 'Internal',
  sortable: true
}

const donorCell = {
  id: 'donor_code',
  label: 'Donor',
  sortable: true
}

// inserts extra column for non-unicef users as per requirements
const getHeadCells = (isUnicefUser, cells, pooledGrants, thematicGrants, isGaviPage) => {
  if (isGaviPage) {
    return [...cells];
  }
  if (pooledGrants) {
    cells = [...cells.slice(0, 2), donorCell, ...cells.slice(2)]
  }
  if (!isUnicefUser && !thematicGrants) {
    return [...cells.slice(0, 2), externalRefCell, ...cells.slice(2)];
  } else if (isUnicefUser) {
    return [...cells, internalExternalCell]
  }
  return cells;
};

const getTableHeadings = (pageName) => {
  switch(pageName)
  {
    case THEMATIC_GRANTS: return thematicReportsTableHeadings;
    case GAVI_REPORTS: return gaviReportsTableHeadings;
    default: return certifiedReportsTableHeadings;
  }
};

export default function ReportsTable() {
  const { trackPageView } = useMatomo();
  const classes = useTableStyles();

  const { isUnicefUser } = usePermissions();
  const data = useSelector(selectSearchReports);
  const pageName = useSelector(selectMenuBarPage);
  const rows = data.items || [];
  const certifiedReports = pageName !== THEMATIC_GRANTS;
  const pooledGrants = pageName === POOLED_GRANTS;
  const thematicGrants = pageName === THEMATIC_GRANTS;
  const isGaviPage = pageName === GAVI_REPORTS;
  const headCells = getHeadCells(isUnicefUser, getTableHeadings(pageName), pooledGrants, thematicGrants, isGaviPage);

  const {
    orderBy,
    order,
    page,
    handleRequestSort,
    handleChangePage
  } = useTable();
  const shouldShowExternalGrants = certifiedReports && !isUnicefUser;

  useEffect(() => {
    trackPageView()
  }, [pageName]);

  const getTableContent = (index, row) => {
   return isGaviPage ? getGaviContent(index, row) : getLegacyContent(index, row);
  }

  const ExpandableTableRow = ({ children, rowData, ...otherProps }) => {
     ExpandableTableRow.propTypes = {
      children: PropTypes.any,
      rowData: PropTypes.any,
    }
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
      <>
        <TableRow {...otherProps}>
          <TableCell padding="checkbox">
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {children}
        </TableRow>
        {isExpanded && (
          <TableRow bgcolor='#eeeeee'>
            <TableCell padding="checkbox" />
            <TableCell colSpan={7}>
              {getGaviRowDetails(rowData)}
            </TableCell>
          </TableRow>
          ) }
      </>
    );
  };

  const getGaviRowDetails = (row) => {
    return (
        <Box className={classes.detailsPanel}>
          <Tooltip title={row.funds_due_date ? getDisplayDate(row.funds_due_date) : ''}>
            <div><p className={classes.detailsHeader}>Funds Due Date</p>{getDisplayValue(getDisplayDate(row.funds_due_date))}</div>
          </Tooltip>
          <Tooltip title={row.material_code ? row.material_code : ''}>
            <div><p className={classes.detailsHeader}>Material Code</p>{getDisplayValue(row.material_code)}</div>
          </Tooltip>
          <Tooltip title={row.prepaid_status ? row.prepaid_status : ''}>
            <div><p className={classes.detailsHeader}>Prepaid Status</p>{getDisplayValue(row.prepaid_status)}</div>
          </Tooltip>
          <Tooltip title={row.purchase_order ? row.purchase_order : ''}>
            <div><p className={classes.detailsHeader}>Purchase Order</p>{getDisplayValue(row.purchase_order)}</div>
          </Tooltip>
          <Tooltip title={row.vaccine_type ? row.vaccine_type : ''}>
            <div><p className={classes.detailsHeader}>Vaccine Type</p>{getDisplayValue(row.vaccine_type)}</div>
          </Tooltip>
          <Tooltip title={row.m_o_u_r_eference ? row.m_o_u_r_eference : ''}>
            <div><p className={classes.detailsHeader}>MOU reference</p>{getDisplayValue(row.m_o_u_r_eference)}</div>
          </Tooltip>
          <Tooltip title={row.allocation_round ? row.allocation_round : ''}>
            <div><p className={classes.detailsHeader}>Allocation Round</p>{getDisplayValue(row.allocation_round)}</div>
          </Tooltip>
          <Tooltip title={row.vendor ? row.vendor : ''}>
            <div><p className={classes.detailsHeader}>Vendor</p>{getDisplayValue(row.vendor)}</div>
          </Tooltip>
        </Box>
    )
  }

  const getGaviContent = (index, row) => {
     const labelId = `enhanced-table-checkbox-${index}`;
     return (
          <ExpandableTableRow hover role="checkbox" tabIndex={-1} key={index} rowData={row}>
              <TableCell
                className={clsx(classes.cell, classes.titleCell)}
                component="th"
                id={labelId}
                scope="row"
              >
                <Tooltip title={row.title ? row.title : ''}>
                  <Typography className={classes.overflow}>
                    <Link color="secondary" href={row.download_url} target="_blank">
                      {row.is_new && <FiberNewIcon fontSize="small" className={classes.icon} color="error" />}
                      {row.title}
                    </Link>
                  </Typography>
                </Tooltip>
              </TableCell>

              <Tooltip title={row.number ? row.number : ''}>
                <TableCell className={classes.cell} align="left">
                  {row.number}
                </TableCell>
              </Tooltip>

              <Tooltip title={row.country_name ? row.country_name : ''}>
                <TableCell className={classes.cell} align="left">
                  {row.country_name}
                </TableCell>
              </Tooltip>

              <Tooltip title={row.m_o_u_number ? row.m_o_u_number : ''}>
                <TableCell className={classes.cell} align="left">{row.m_o_u_number}</TableCell>
              </Tooltip>

              <Tooltip title={row.approval_year ? row.approval_year : ''}>
                <TableCell className={classes.cell} align="left">{row.approval_year}</TableCell>
              </Tooltip>

              <Tooltip title={row.sent_to_g_a_v_i_date ? getDisplayDate(row.sent_to_g_a_v_i_date) : ''}>
                <TableCell className={classes.cell} align="left">
                  {getDisplayDate(row.sent_to_g_a_v_i_date)}
                </TableCell>
              </Tooltip>

              <Tooltip title={row.g_a_v_i_w_b_s ? row.g_a_v_i_w_b_s : ''}>
                <TableCell className={classes.cell} align="left">
                  {row.g_a_v_i_w_b_s}
                </TableCell>
              </Tooltip>

          </ExpandableTableRow>
    )
  }

  const getLegacyContent = (index, row) => {
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
                      {row.is_new && <FiberNewIcon fontSize="small" className={classes.icon} color="error" />}
                      {row.title}
                    </Link>
                  </Typography>
                </Tooltip>
              </TableCell>
              {thematicGrants && (
                <Tooltip title={row.theme ? row.theme : ''}>
                  <TableCell className={classes.cell} align="left">
                    {row.theme}
                  </TableCell>
                </Tooltip>
              )}
              <Tooltip title={row.grant_number ? row.grant_number : ''}>
                <TableCell className={classes.cell} align="left">
                  {row.grant_number}
                </TableCell>
              </Tooltip>
              {pooledGrants && (
                <Tooltip title={row.donor ? row.donor : ''}>
                  <TableCell className={classes.cell} align="left">{row.donor}</TableCell>
                </Tooltip>
              )}
              {shouldShowExternalGrants && (
                <Tooltip title={row.external_reference ? row.external_reference : ''}>
                  <TableCell className={classes.cell} align="left">{row.external_reference}</TableCell>
                </Tooltip>
              )}
              {certifiedReports && (
                <Tooltip title={row.donor_report_category ? row.donor_report_category : ''}>
                  <TableCell className={classes.cell} align="left">
                    {row.donor_report_category}
                  </TableCell>
                </Tooltip>
              )}
              <Tooltip title={row.donor_document ? row.donor_document : ''}>
                <TableCell className={classes.cell} align="left">
                  {row.donor_document}
                </TableCell>
              </Tooltip>
              <Tooltip title={row.report_type ? row.report_type : ''}>
                <TableCell className={classes.cell} align="left">
                  {row.report_type}
                </TableCell>
              </Tooltip>
              <Tooltip title={row.modified ? row.modified : ''}>
                <TableCell className={classes.cell} align="left">
                  {getDisplayDate(row.modified)}
                </TableCell>
              </Tooltip>
              {thematicGrants && (
                <Tooltip title={row.report_end_date ? getDisplayDate(row.report_end_date) : ''}>
                  <TableCell className={classes.cell} align="left">
                    {getDisplayDate(row.report_end_date)}
                  </TableCell>
                </Tooltip>
              )}
              {certifiedReports && (
                <Tooltip title={row.recipientOffice ? row.recipientOffice : ''}>
                  <TableCell className={classes.cell} align="left">
                    {row.recipient_office ? row.recipient_office.join(', ') : row.recipientOffice}
                  </TableCell>
                </Tooltip>
              )}
              {isUnicefUser && (
                <Tooltip title={row.report_group === 'Grant Internal' ? "Internal" : ''}>
                  <TableCell className={classes.cell} align="left">
                    {row.report_group === 'Grant Internal' ? "Internal" : ''}
                  </TableCell>
                </Tooltip>
              )}
            </TableRow>
    )
  }

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
                  return getTableContent(index, row);
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25]}
          component="div"
          count={data.total_rows || 0}
          rowsPerPage={25}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}

          onChangePage={handleChangePage}
          ActionsComponent={TablePaginationActions}
        />
        {/* <DocViewer fileType={docFileType} filePath={doc} /> */}
      </Paper >
    </div >
  );
}

