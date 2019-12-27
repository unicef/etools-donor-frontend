import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  Typography,
  IconButton,
  makeStyles,
  FormControl,
  Select,
  MenuItem,
  Tooltip
} from '@material-ui/core';
import {
  BACKEND_PROPERTIES_USER_LAST_NAME,
  BACKEND_PROPERTIES_USER_FIRST_NAME,
  BACKEND_PROPERTIES_USER_LAST_LOGIN
} from 'lib/constants';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

import { useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserGroups } from 'selectors/user';
import { userRoleEdited, deleteUserRole } from 'actions';

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
  saveBtn: { marginRight: theme.spacing(1) },
  icon: {
    width: 32,
    height: 32
  },
  iconBtn: {
    width: 24,
    height: 24
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
  },
  roleSelector: {
    width: 120
  }
}));

export default function UserRowItem({ user }) {
  const labelId = `user-${user.id}`;
  const classes = useStyles();
  const groups = useSelector(selectUserGroups);
  const dispatch = useDispatch();
  const [editing, setIsEditing] = useState(false);

  async function onChange(e) {
    const newVal = e.target.value;
    const payload = {
      id: user.id,
      group: newVal
    };
    dispatch(userRoleEdited(payload));
  }

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell component="th" id={labelId} scope="row">
        <Typography>{fullName(user)}</Typography>
      </TableCell>
      <TableCell align="left">{user.user_email || '-'}</TableCell>
      <TableCell align="left" className={classes.donorName}>
        <FormControl className={classes.roleSelector} disabled={!editing}>
          <Select
            value={user.group}
            onChange={onChange}
            inputProps={{
              name: 'select-role',
              id: 'role'
            }}
          >
            {groups.map(group => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton
          color="primary"
          className={clsx(classes.icon, classes.iconMargin)}
          size="small"
          onClick={() => setIsEditing(!editing)}
        >
          {editing ? (
            <Tooltip title="Cancel" placement="top">
              <CancelIcon className={classes.actionIcon} />
            </Tooltip>
          ) : (
            <Tooltip title="Edit" placement="top">
              <EditIcon className={classes.actionIcon} />
            </Tooltip>
          )}
        </IconButton>
      </TableCell>
      <TableCell align="left">{getUserStatusStr(user)}</TableCell>
      <TableCell align="right">
        {editing && (
          <IconButton
            onClick={() => dispatch(deleteUserRole(user.id))}
            size="small"
            className={clsx(classes.icon, classes.iconMargin)}
            edge="end"
            aria-label="delete"
          >
            <Tooltip title="Delete user" placement="top">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}

UserRowItem.propTypes = {
  user: PropTypes.object
};
