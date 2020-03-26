import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  Typography,
  IconButton,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import {
  BACKEND_PROPERTIES_USER_LAST_NAME,
  BACKEND_PROPERTIES_USER_FIRST_NAME,
  BACKEND_PROPERTIES_USER_LAST_LOGIN
} from 'lib/constants';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectUserGroups } from 'selectors/user';
import { prop } from 'ramda';

function fullName(user) {
  const fullName = `${user[BACKEND_PROPERTIES_USER_FIRST_NAME]} ${user[BACKEND_PROPERTIES_USER_LAST_NAME]}`;
  return fullName.length == 1 ? '-' : fullName;
}

export function getUserStatusStr(user) {
  return user[BACKEND_PROPERTIES_USER_LAST_LOGIN] ? 'Accepted' : 'Invited';
}

const useStyles = makeStyles(theme => ({
  hide: {
    visibility: 'hidden'
  },
  icon: {
    width: 32,
    height: 32
  },
  actionIcon: {
    width: 20,
    height: 20
  },
  iconMargin: {
    marginLeft: theme.spacing(1)
  },
  donorName: {
    minWidth: 250
  }
}));

export default function UserRowItem({ user, onClickEdit, onClickDelete }) {
  const labelId = `user-${user.id}`;
  const classes = useStyles();
  const groups = useSelector(selectUserGroups);

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell component="th" id={labelId} className={classes.donorName} scope="row">
        <Typography>{fullName(user)}</Typography>
      </TableCell>
      <TableCell align="left">{user.user_email || '-'}</TableCell>
      <TableCell align="left">
        {prop('name', groups.find(group => group.id === user.group))}
      </TableCell>
      <TableCell align="left">{getUserStatusStr(user)}</TableCell>
      <TableCell align="left">
        <IconButton
          color="primary"
          className={clsx(classes.icon, classes.iconMargin)}
          size="small"
          onClick={() => onClickEdit(user)}
        >
          <Tooltip title="Edit" placement="top">
            <EditIcon className={classes.actionIcon} />
          </Tooltip>
        </IconButton>
        <IconButton
          color="primary"
          className={clsx(classes.icon, classes.iconMargin)}
          size="small"
          onClick={() => onClickDelete(user)}
        >
          <Tooltip title="Delete" placement="top">
            <DeleteIcon className={classes.actionIcon} />
          </Tooltip>
        </IconButton>

      </TableCell>
    </TableRow>
  );
}

UserRowItem.propTypes = {
  user: PropTypes.object,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func
};
