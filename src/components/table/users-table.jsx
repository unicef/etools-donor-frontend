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
import { BACKEND_PROPERTIES_USER_LAST_LOGIN } from '../../lib/constants';
import { stableSort, getSorting } from './lib';
import { selectLoading } from 'selectors/ui-flags';
import UserRowItem from './user-row-item';

const headCells = [
  { id: 'user_first_name', numeric: false, disablePadding: false, label: 'Name', sortable: true },
  { id: 'user_email', numeric: false, disablePadding: false, label: 'Email', sortable: true },
  { id: 'group_name', numeric: false, disablePadding: false, label: 'Role', sortable: true },
  {
    id: BACKEND_PROPERTIES_USER_LAST_LOGIN,
    numeric: false,
    disablePadding: false,
    label: 'Status',
    sortable: true
  },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions', sortable: false }
];

export default function UsersTable() {
  const classes = useTableStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState({});

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const users = useSelector(selectUserRoles);

  const onCloseAddUserModal = () => {
    setEditingUser({});
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

  const handleClickEdit = (user) => {
    setEditingUser(user);
    openAddUserModal();
  }

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
                .map((user, index) => (
                  <UserRowItem user={user} key={index} onClickEdit={(user) => handleClickEdit(user)} />
                ))}

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
      <AddUserModal open={addUserModalOpen} onClose={onCloseAddUserModal} userProp={editingUser} />
    </div>
  );
}
