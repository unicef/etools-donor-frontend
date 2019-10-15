import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, Redirect, Switch } from 'react-router';
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
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    },
    contentWrapper: {
      padding: theme.spacing(3)
    },
    title: {
      color: theme.palette.common.white,
      fontSize: 18,
      fontWeight: 500,
      padding: `0 ${theme.spacing(1)}px`,
      lineHeight: 'normal',
      textTransform: 'uppercase'
    },
    divider: {
      borderRight: `1px solid ${theme.palette.common.white}`
    }
  })
);

export default function MainAppBar() {
  const classes = useMainStyles();
  const history = useHistory();
  const handleNav = path => () => history.push(path);
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

          <Box flexGrow={1}>
            <Typography className={classes.title}>Donor Reporting Portal</Typography>
          </Box>
        </Box>
        <Divider />

        <List>
          <ListItem onClick={handleNav(REPORTS_PATH)} button>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>

          <ListItem onClick={handleNav(USERS_PORTAL_PATH)} button>
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
