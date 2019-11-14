import React from 'react';
import { BACKEND_PROPERTIES_USER_LAST_LOGIN } from '../../../lib/constants';
import { getUserStatusStr } from '../users';

export function desc(a, b, func) {
  if (func(b) < func(a)) {
    return -1;
  }
  if (func(b) > func(a)) {
    return 1;
  }
  return 0;
}

export function descByOrderBy(orderBy) {
  return el => el[orderBy];
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  let func = descByOrderBy(orderBy);
  if (orderBy === BACKEND_PROPERTIES_USER_LAST_LOGIN) {
    func = getUserStatusStr;
  }
  return order === 'desc' ? (a, b) => desc(a, b, func) : (a, b) => -desc(a, b, func);
}

export const useTable = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const getEmptyRows = rows =>
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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

  return {
    orderBy,
    order,
    setOrder,
    setOrderBy,
    setPage,
    page,
    rowsPerPage,
    setRowsPerPage,
    getEmptyRows,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage
  };
};
