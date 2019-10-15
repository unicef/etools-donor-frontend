import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, Redirect, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import {
  Typography,
  makeStyles,
  createStyles,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import AppToolbar from './App-Bar';
import { DRAWER_WIDTH, REPORTS_PATH, USERS_PORTAL_PATH } from '../constants';
import DonorsList from 'pages/donors-list';
import ContentHeader from './Content-Header';
import UsersList from 'pages/users-portal';
import ReportsPage from 'pages/reports';

export const useMainStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0
    },
    drawerPaper: {
      width: DRAWER_WIDTH
    },
    toolbar: { ...theme.mixins.toolbar, maxHeight: 64 },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    },
    contentWrapper: {
      padding: theme.spacing(3)
    },
    title: {
      color: theme.palette.common.white,
      fontSize: 16,
      fontWeight: 600,
      padding: `0 ${theme.spacing(1)}px`,
      lineHeight: 'normal',
      textTransform: 'uppercase'
    },
    divider: {
      borderRight: `1px solid ${theme.palette.common.white}`,
      padding: theme.spacing(2)
    }
  })
);

export default function MainAppBar() {
  const classes = useMainStyles();
  const history = useHistory();
  const location = useLocation();
  const handleNav = path => () => history.push(path);

  function navSelected(path) {
    return location.pathname.includes(path);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppToolbar />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <Box bgcolor="secondary.500" className={classes.toolbar} display="flex">
          <Box flex="1 0 50%" className={classes.divider} />
          <Box flexGrow={1} display="flex" alignItems="center">
            <Typography className={classes.title}>Donor Reporting Portal</Typography>
          </Box>
        </Box>
        <Divider />

        <List>
          <ListItem selected={navSelected(REPORTS_PATH)} onClick={handleNav(REPORTS_PATH)} button>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>

          <ListItem
            selected={navSelected(USERS_PORTAL_PATH)}
            onClick={handleNav(USERS_PORTAL_PATH)}
            button
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ContentHeader />

        <div className={classes.contentWrapper}>
          <Box flexDirection="column">
            <Switch>
              <Route exact path="/:page" component={DonorsList} />
              <Route exact path={`${REPORTS_PATH}/:donorId`} component={ReportsPage} />
              <Route exact path={`${USERS_PORTAL_PATH}/:donorId`} component={UsersList} />
              <Redirect exact from="/" to={REPORTS_PATH} />
            </Switch>
          </Box>
        </div>
      </main>
    </div>
  );
}

MainAppBar.propTypes = {
  match: PropTypes.object.isRequired
  // history: PropTypes.object
};
