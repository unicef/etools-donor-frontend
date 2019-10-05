import React, { useState } from 'react';
import { createStyles } from '@material-ui/styles';
import { makeStyles, AppBar, Popover, Toolbar, Box, IconButton } from '@material-ui/core';
import { AccountCircle as AccountIcon } from '@material-ui/icons';

import { DRAWER_WIDTH } from '../constants';

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
  function handleProfileClick() {}
  const [profileAnchor, setProfileAnchor] = useState(null);

  const profileAnchorOpen = Boolean(profileAnchor);
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <Box width="100%" display="flex" justifyContent="flex-end">
          <IconButton className={classes.iconBtn} onClick={handleProfileClick}>
            <AccountIcon className={`${classes.iconBox} ${classes.headerIcon}`} />
          </IconButton>
        </Box>
        <Popover
          id="partnerProfile"
          anchorEl={profileAnchor}
          open={profileAnchorOpen}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={() => setProfileAnchor(null)}
        >
          {/* <Logout onClose={handleProfileRequestClose} logout={() => {}} /> */}
        </Popover>
      </Toolbar>
    </AppBar>
  );
}
