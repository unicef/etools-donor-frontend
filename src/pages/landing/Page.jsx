import React from 'react';
import { Grid, Box, Link, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import bgImage from './img/home-bkg-3.jpg';
import circleLogo from 'assets/images/unicef_circle_logo.png';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100vh',
    color: 'white',
    '& a': {
      color: '#1CABE2'
    }
  },
  maskOverlay: {
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    backgroundAttachment: 'fixed',
    backgroundColor: 'rgba(33, 150, 243, 0.7)',
    margin: 0,
    justifyContent: 'center'
  },
  container: {
    width: '100%'
  },
  btn: {
    color: 'blue',
    margin: '8px'
  },
  signInBtn: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white'
    },
    '& a:hover': {
      textDecoration: 'none'
    }
  },
  main: {
    maxWidth: 1170,
    margin: '0 auto',
    position: 'absolute',
    height: '100%',
    textAlign: 'center',
    '& h4, p': {
      fontWeight: 300
    }
  },
  logoSplash: {
    maxWidth: 260
  },
  hWelcome: {
    fontSize: '2.5rem'
  },
  browserAdvice: {
    paddingTop: '60px'
  }
}));

export default function LandingPage() {
  const classes = useStyles();

  function signIn() {
    const url = window.location.origin;
    window.location.href = `${url}/sociallogin/unicef-azuread-b2c-oauth2/`;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.maskOverlay}>
        <Grid container className={classes.main} alignItems="center" justify="center">
          <Grid
            item
            xs={12}
            sm={8}
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <img src={circleLogo} className={classes.logoSplash} alt="UN Logo" />
            <Typography variant="h4" className={classes.hWelcome}>
              <strong>Welcome to the Donor Reporting Portal</strong>
            </Typography>
            <Grid container justify="center">
              <Box display="flex" alignItems="center">
                <Button
                  className={clsx(classes.btn, classes.signInBtn)}
                  variant="container"
                  onClick={signIn}
                >
                  <Link href="/sociallogin/unicef-azuread-b2c-oauth2/">Sign In</Link>
                </Button>
              </Box>
            </Grid>
            <Typography className={classes.browserAdvice}>
              This site works best in the latest versions of Google Chrome, Safari, Microsoft Edge, And Firefox.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
