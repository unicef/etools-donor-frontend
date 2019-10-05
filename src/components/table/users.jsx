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

// function createData(name, email, role, status) {
//   return { name, email, role, status };
// }

// const users= [
//   createData('John Smith', 'john@gmail.com', 'Role 1', 'invited'),
//   createData('Mary Joeane', 'mary@gmail.com', 'Role 2', 'accepted'),
//   createData('Jane Doe', 'jane@janey.com', 'Role 3', 'invited'),
//   createData('Patrick Pacey', 'pat@unicef.org', 'Role 4', 'accepted'),
//   createData('Connor Daley', 'connord@yahoo.com', 'Role 4', 'accepted'),
//   createData('Jimmy Smits', 'jsmits@yahoo.com', 'Role 2', 'invited'),
//   createData('Sandy Shore', 'sandy@unicef.org', 'Role 1', 'invited')
// ];

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

function fullName(user) {
  return `${user.user_first_name} ${user.user_last_name}`;
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' }
];

export default function UsersTable() {
  const classes = useTableStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const users = useSelector(selectUserRoles);

  const onCloseAddUserModal = e => setAddUserModalOpen(false);
  const openAddUserModal = e => setAddUserModalOpen(true);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

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
                      <TableCell align="left">{user.user_email}</TableCell>
                      <TableCell align="left">{user.group_name}</TableCell>
                      <TableCell align="left">{user.status}</TableCell>
                    </TableRow>
                  );
                })}
              {users.length == 0 && (
                <TableRow>
                  <TableCell className={classes.emptyLine}>
                    <Typography>0 results returned</Typography>
                  </TableCell>
                </TableRow>
              )}
              {users.length > 0 && emptyRows > 0 && (
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
