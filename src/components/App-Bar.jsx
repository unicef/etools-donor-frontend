import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createStyles } from '@material-ui/styles';
import {
  makeStyles,
  AppBar,
  Popover,
  Toolbar,
  Box,
  IconButton,
  Typography
} from '@material-ui/core';
import { AccountCircle as AccountIcon } from '@material-ui/icons';

import { DRAWER_WIDTH } from '../lib/constants';
import ErrorsSnackbar from './Errors-Snackbar';
import { selectCreatedUser } from 'selectors/user';
import { selectUserName } from 'selectors/ui-flags';

const useStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      backgroundColor: theme.palette.primary.strong
    },
    iconBox: {
      width: 48,
      height: 48
    },
    iconBtn: {
      padding: 0
    },
    headerIcon: {
      fill: theme.palette.primary[400]
    },
    noPrint: {
      '@media print': {
        display: 'none'
      }
    },
    logo: {
      maxWidth: '170px'
    },
    banner: {
      color: '#FFF',
      lineHeight: '1.25em',
      fontSize: '15px'
    }
  })
);

export default function AppToolbar() {
  const classes = useStyles();
  const userName = useSelector(selectUserName);
  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <Box width="100%" display="flex" justifyContent="flex-end">
          <Typography className={classes.banner}>{userName}</Typography>
        </Box>
      </Toolbar>
      <ErrorsSnackbar />
    </AppBar>
  );
}
