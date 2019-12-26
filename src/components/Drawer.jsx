import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useMainStyles } from './Main';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Link
} from '@material-ui/core';

import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import logo from 'assets/images/UNICEF_logo.png';
import { DONOR_ADMIN_ROLE, REPORTS, THEMATIC_REPORTS, USERS_PORTAL } from '../lib/constants';
import clsx from 'clsx';
import { selectUserGroup, selectMenuBarPage } from 'selectors/ui-flags';
import { menuItemSelected } from 'slices/ui';

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

  const userGroup = useSelector(selectUserGroup);
  const isAdmin = userGroup === DONOR_ADMIN_ROLE;

  function navSelected(page) {
    return page === useSelector(selectMenuBarPage);
  }

  return { handleNav, navSelected, isAdmin };
};

export default function ConnectedDrawer() {
  const classes = useMainStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menuItemSelected(REPORTS));
  }, []);

  const { handleNav, navSelected, isAdmin } = useNav();
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
          <Link href="/">
            <Typography color="secondary" className={classes.title}>
              Donor Reporting Portal
            </Typography>
          </Link>
        </Box>
      </Box>
      <Divider />

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

        {isAdmin && (
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
