import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider, createStyles } from '@material-ui/styles';
import theme from 'styles/theme';
import {
    makeStyles,
    AppBar,
    Typography,
    Popover,
    Toolbar,
    Box,
    Grid,
    IconButton
} from '@material-ui/core';
import { AccountCircle as AccountIcon } from '@material-ui/icons';

import MainAppBar from './Main';
import Logout from './Logout';

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
    function handleProfileRequestClose() {}
    function handleProfileClick() {}
    const [notifyAnchor, setNotifyAnchor] = useState(null);
    const [profileAnchor, setProfileAnchor] = useState(null);

    const notifyAnchorOpen = Boolean(notifyAnchor);
    const profileAnchorOpen = Boolean(profileAnchor);
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="fixed" color="primary">
            <Toolbar>
                <Box width="100%" display="flex" justifyContent="flex-end">
                    <IconButton
                        className={classes.iconBtn}
                        color="contrast"
                        onClick={handleProfileClick}
                    >
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
                    <Logout onClose={handleProfileRequestClose} />
                </Popover>
            </Toolbar>
        </AppBar>
    );
}
