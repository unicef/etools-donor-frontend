import React from 'react';
import {
  format
} from 'date-fns';

import {
  BACKEND_PROPERTIES_USER_LAST_LOGIN
} from '../../../lib/constants';
import {
  DISPLAY_FORMAT,
  BACKEND_REPORTS_FIELDS
} from 'pages/reports/constants';
import {
  getUserStatusStr
} from '../user-row-item';
import {
  getRecipientOfficeStr
} from '../reports-table';
import useFiltersQueries from 'lib/use-filters-queries';
import {
  FILTERS_MAP
} from '../../../pages/reports/lib/filters-map';
import {
  useDispatch
} from 'react-redux';
import {
  onFetchReports
} from 'actions';

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
  if (orderBy === BACKEND_REPORTS_FIELDS['recipientOffice']) {
    func = getRecipientOfficeStr;
  }
  return order === 'desc' ? (a, b) => desc(a, b, func) : (a, b) => -desc(a, b, func);
}

export const useTable = (defaultOrderBy = '') => {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(defaultOrderBy);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const getEmptyRows = rows =>
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  // remove with SearchAPI
  const handleChangePageOld = (event, newPage) => {
    setPage(newPage);
  };

  const {
    filterValues
  } = useFiltersQueries(FILTERS_MAP);

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
    dispatch(onFetchReports({
      ...filterValues,
      page: newPage + 1
    }));
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
    // remove with SearchAPI
    handleChangePageOld,
    handleChangePage,
    handleChangeRowsPerPage
  };
};

export function getDisplayDate(dateStr) {
  return dateStr ? format(new Date(dateStr), DISPLAY_FORMAT) : '';
}
