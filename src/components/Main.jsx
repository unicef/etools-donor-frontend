import React, { useState } from 'react';
import {
    AppBar,
    Typography,
    makeStyles,
    createStyles,
    Grid,
    IconButton,
    Popover,
    Box,
    CssBaseline,
    Drawer
} from '@material-ui/core';
import { AccountCircle as AccountIcon } from '@material-ui/icons';
import Logout from './Logout';
import AppToolbar from './App-Bar';

import { DRAWER_WIDTH } from '../constants';

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
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3)
        }
    })
);

export default function MainAppBar() {
    const classes = useMainStyles();
    function handleProfileClick() {}
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
                <div className={classes.toolbar} />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim
                    praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet.
                    Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis
                    tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio
                    aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
                    integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
                    scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet
                    massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi
                    tincidunt. Lorem donec massa sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget
                    nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque
                    volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus.
                    Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
                    Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa
                    eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non
                    tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi
                    tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
                    Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices
                    sagittis orci a.
                </Typography>

                {/* <Route exact path="/" component={DonorList} />
                <Route path="/users" component={UserPortal}/> */}
            </main>
        </div>
    );
}
