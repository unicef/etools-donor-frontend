import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { useMainStyles } from './Main';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer
} from '@material-ui/core';

import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import logo from 'assets/images/UNICEF_logo.png';
import { REPORTS_PATH, USERS_PORTAL_PATH, DONOR_ADMIN_ROLE } from '../lib/constants';
import clsx from 'clsx';
import { selectUserDonorId, selectUserGroup } from 'selectors/ui-flags';

export const useNav = () => {
  const history = useHistory();
  const handleNav = path => () => history.push(path);
  const goHome = handleNav('/');
  const location = useLocation();

  const userGroup = useSelector(selectUserGroup);
  const isAdmin = userGroup === DONOR_ADMIN_ROLE;

  function navSelected(path) {
    return location.pathname.includes(path);
  }

  return { handleNav, goHome, navSelected, isAdmin };
};

export default function ConnectedDrawer() {
  const classes = useMainStyles();
  const donorId = useSelector(selectUserDonorId);

  const { handleNav, goHome, navSelected, isAdmin } = useNav();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <Box bgcolor="white" className={clsx(classes.toolbar, classes.drawerHeader)} display="flex">
        <Box>
          <img src={logo} className={classes.logo} alt="Unicef Logo" />
        </Box>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Typography color="secondary" className={classes.title}>
            Donor Reporting Portal
          </Typography>
        </Box>
      </Box>
      <Divider />

      <List>
        <ListItem selected={navSelected(REPORTS_PATH)} onClick={goHome} button>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>

        {isAdmin && (
          <ListItem
            selected={navSelected(USERS_PORTAL_PATH)}
            onClick={handleNav(`${USERS_PORTAL_PATH}/${donorId}`)}
            button
          >
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
