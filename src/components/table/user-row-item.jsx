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
  MenuItem
} from '@material-ui/core';
import {
  BACKEND_PROPERTIES_USER_LAST_NAME,
  BACKEND_PROPERTIES_USER_FIRST_NAME,
  BACKEND_PROPERTIES_USER_LAST_LOGIN
} from 'lib/constants';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserGroups } from 'selectors/user';
import { userRoleEdited } from 'actions';

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
  editIcon: {
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

export default function UserRowItem({ user }) {
  const labelId = `user-${user.id}`;
  const classes = useStyles();
  const groups = useSelector(selectUserGroups);
  const dispatch = useDispatch();
  const [editing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState(user.group_name || '-');

  async function onChange(e) {
    const newVal = e.target.value;
    const payload = {
      user: user.user,
      group_name: newVal
    };
    await dispatch(userRoleEdited(payload));
    console.log('afterssss');
    setUserRole(newVal);
  }

  function handleDelete() {}

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell component="th" id={labelId} scope="row">
        <Typography>{fullName(user)}</Typography>
      </TableCell>
      <TableCell align="left">{user.user_email || '-'}</TableCell>
      <TableCell align="left" className={classes.donorName}>
        <FormControl disabled={!editing}>
          <Select
            value={userRole}
            onChange={onChange}
            inputProps={{
              name: 'select-role',
              id: 'role'
            }}
          >
            {groups.map(group => (
              <MenuItem key={group.id} value={group.name}>
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
          <EditIcon className={classes.editIcon} />
        </IconButton>
      </TableCell>
      <TableCell align="left">{getUserStatusStr(user)}</TableCell>
      <TableCell align="right">
        <IconButton
          onClick={handleDelete}
          size="small"
          className={clsx(classes.icon, classes.iconMargin)}
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

UserRowItem.propTypes = {
  user: PropTypes.object
};
