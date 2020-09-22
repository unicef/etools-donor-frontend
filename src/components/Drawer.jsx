import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useMainStyles } from './Main';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer
} from '@material-ui/core';

import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import { REPORTS, THEMATIC_REPORTS, USERS_PORTAL } from '../lib/constants';
import { selectMenuBarPage, selectAssignedRole } from 'selectors/ui-flags';
import { menuItemSelected } from 'slices/ui';
import { usePermissions } from './PermissionRedirect';

export const useNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleNav = page => () => {
    dispatch(menuItemSelected(page));
    if (page === REPORTS) {
      history.push('/');
    } else {
      history.push(`/${page}`);
    }
  };

  function navSelected(page) {
    return page === useSelector(selectMenuBarPage);
  }

  return { handleNav, navSelected };
};

export default function ConnectedDrawer() {
  const classes = useMainStyles();
  const dispatch = useDispatch();

  const { isDonorAdmin, isSuperUser } = usePermissions();
  const hasAccessUserManagement = isDonorAdmin || isSuperUser;
  const isAssignedRole = useSelector(selectAssignedRole);

  useEffect(() => {
    dispatch(menuItemSelected(REPORTS));
  }, []);

  const { handleNav, navSelected } = useNav();
  return (
    <Drawer
      className={classes.drawer}
      variant={isAssignedRole ? "permanent" : "temporary"}
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <Box className={classes.toolbar} />
      <List>
        <ListItem selected={navSelected(REPORTS)} onClick={handleNav(REPORTS)} button>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>

        <ListItem
          selected={navSelected(THEMATIC_REPORTS)}
          onClick={handleNav(THEMATIC_REPORTS)}
          button
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Thematic Reports" />
        </ListItem>

        {hasAccessUserManagement && (
          <ListItem selected={navSelected(USERS_PORTAL)} onClick={handleNav(USERS_PORTAL)} button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}
