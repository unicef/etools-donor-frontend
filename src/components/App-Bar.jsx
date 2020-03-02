import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles } from '@material-ui/styles';
import { makeStyles, AppBar, Toolbar, Box, Typography } from '@material-ui/core';
import horizontalLogo from '../assets/images/UNICEF_White_Horizontal.png';
import ErrorsSnackbar from './Errors-Snackbar';
import { selectUserName } from 'selectors/ui-flags';
import SuccessSnackbar from './Success-Snackbar';
import clsx from 'clsx';

const useStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.primary.strong
    },
    toolbar: {
      minHeight: 112
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
    headerLogo: {
      width: 384
    },
    noPrint: {
      '@media print': {
        display: 'none'
      }
    },
    banner: {
      color: '#FFF',
      lineHeight: '1.25em',
      fontSize: '15px'
    },
    appTitle: {
      paddingLeft: '12px'
    }
  })
);

export default function AppToolbar() {
  const classes = useStyles();
  const userName = useSelector(selectUserName);
  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar className={classes.toolbar}>
        <Box width="100%">
          <Box width="100%" display="block">
            <img src={horizontalLogo} className={classes.headerLogo} />
          </Box>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Typography className={clsx(classes.appTitle, classes.banner)}>Donor Reporting Portal</Typography>
            <Typography className={classes.banner}>{userName}</Typography>
          </Box>
        </Box>
      </Toolbar>
      <ErrorsSnackbar />
      <SuccessSnackbar />
    </AppBar>
  );
}
