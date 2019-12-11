import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useTableStyles } from 'styles/table-styles';
import EnhancedTableHead from './table-head';
import EnhancedTableToolbar from './table-toolbar';
import AddUserModal from 'pages/users-portal/components/add-user-modal';
import { Button, Box } from '@material-ui/core';
import { selectUserRoles } from 'selectors/user';
import {
  BACKEND_PROPERTIES_USER_LAST_LOGIN,
  BACKEND_PROPERTIES_USER_LAST_NAME,
  BACKEND_PROPERTIES_USER_FIRST_NAME
} from '../../lib/constants';
import { stableSort, getSorting } from './lib';
import { selectLoading } from 'selectors/ui-flags';
import { LoaderLocal } from 'components/Loader';

function fullName(user) {
  const fullName = `${user[BACKEND_PROPERTIES_USER_FIRST_NAME]} ${user[BACKEND_PROPERTIES_USER_LAST_NAME]}`;

  return fullName.length == 1 ? '-' : fullName;
}

export function getUserStatusStr(user) {
  return user[BACKEND_PROPERTIES_USER_LAST_LOGIN] ? 'Accepted' : 'Invited';
}

const headCells = [
  { id: 'user_first_name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'user_email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'group_name', numeric: false, disablePadding: false, label: 'Role' },
  { id: BACKEND_PROPERTIES_USER_LAST_LOGIN, numeric: false, disablePadding: false, label: 'Status' }
];

export default function UsersTable() {
  const classes = useTableStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const users = useSelector(selectUserRoles);

  const onCloseAddUserModal = () => {
    setAddUserModalOpen(false);
  };
  const openAddUserModal = () => setAddUserModalOpen(true);

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

  const emptyRows =
    users.length === 0 ? 1 : rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
  const loading = useSelector(selectLoading);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar>
          <Box display="flex">
            <Button
              onClick={openAddUserModal}
              className={classes.addBtn}
              color="secondary"
              variant="contained"
            >
              Add User
            </Button>
          </Box>
        </EnhancedTableToolbar>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              cells={headCells}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {stableSort(users, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  const labelId = `user-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell component="th" id={labelId} scope="row">
                        <Typography>{fullName(user)}</Typography>
                      </TableCell>
                      <TableCell align="left">{user.user_email || '-'}</TableCell>
                      <TableCell align="left">{user.group_name || '-'}</TableCell>
                      <TableCell align="left">{getUserStatusStr(user)}</TableCell>
                    </TableRow>
                  );
                })}

              <TableRow>
                <TableCell colSpan={4} className={classes.emptyLine}>
                  {!loading && users.length == 0 && (
                    <Typography color="primary">0 results returned</Typography>
                  )}
                </TableCell>
              </TableRow>
              {users.length > 1 && emptyRows > 0 && (
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
          count={users.length}
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
      <AddUserModal open={addUserModalOpen} onClose={onCloseAddUserModal} />
    </div>
  );
}
