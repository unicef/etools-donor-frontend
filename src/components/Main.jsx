import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { makeStyles, createStyles, Box } from '@material-ui/core';
import ConnectedDrawer from './Drawer';
import AppToolbar from './App-Bar';
import { DRAWER_WIDTH, USERS_PORTAL_PATH, REPORTS, THEMATIC_REPORTS } from '../lib/constants';
import DonorsList from 'pages/donors-list';
import ContentHeader from './Content-Header';
import ReportsPage from 'pages/reports';
import {
  ProtectedRouteDonorsList,
  ProtectedRouteReportPage,
  ProtectedRouteUserManagement
} from '../pages/Authorized';

import PermissionRedirect from './PermissionRedirect';
import NotFound from './404';
import { useSelector } from 'react-redux';
import { selectDonorName } from 'selectors/ui-flags';

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
    drawerHeader: {
      padding: theme.spacing(1)
    },
    toolbar: {
      ...theme.mixins.toolbar,
      minHeight: 64,
      height: 112
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    },
    contentWrapper: {
      padding: theme.spacing(3)
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      padding: theme.spacing(1),
      lineHeight: '1.2em',
      textTransform: 'uppercase'
    },
    divider: {
      borderRight: `1px solid ${theme.palette.common.white}`,
      padding: theme.spacing(2)
    },
    logo: {
      maxHeight: '100%',
      maxWidth: 77
    }
  })
);

export default function MainAppBar() {
  const classes = useMainStyles();
  const pageName = useSelector(selectDonorName);

  return (
    <div className={classes.root}>
      <AppToolbar />
      <ConnectedDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {pageName && <ContentHeader />}

        <div className={classes.contentWrapper}>
          <Box flexDirection="column">
            <Switch>
              <Route exact path="/" component={PermissionRedirect} />

              <ProtectedRouteDonorsList exact path="/donors">
                <DonorsList />
              </ProtectedRouteDonorsList>

              <ProtectedRouteReportPage exact path={`/${REPORTS}/:donorId?`}>
                <ReportsPage />
              </ProtectedRouteReportPage>

              <ProtectedRouteReportPage exact path={`/${THEMATIC_REPORTS}`}>
                <ReportsPage />
              </ProtectedRouteReportPage>
              {/* Optional donorId param here since donor list is not aware of what page
              to link to per donor and only super users can choose donor for user management */}
              <ProtectedRouteUserManagement path={`${USERS_PORTAL_PATH}/:donorId?`} />

              <Route path="*" component={NotFound} />
            </Switch>
          </Box>
        </div>
      </main>

    </div>
  );
}
