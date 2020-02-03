import React from 'react';
import { Grid, Box, Link, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import bgImage from './img/home-bkg-3.jpg';
import logo from 'assets/images/unicef-icon.png';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100vh',
    color: 'white',
    '& a': {
      color: 'white'
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
  nav: {
    zIndex: 100,
    padding: '1rem',
    maxHeight: 80,
    '& *': {
      maxHeight: '100%'
    }
  },
  container: {
    width: '100%'
  },
  logoTitle: {
    margin: 0,
    lineHeight: '1rem',
    paddingLeft: 8,
    borderLeft: '1px solid white'
  },
  titleContainer: {
    padding: 4
  },
  navLink: {
    fontSize: '1rem',
    lineHeight: 1.5,
    fontWeight: 400,
    margin: '0 16px'
  },
  linkContainer: {
    margin: '0 64px'
  },
  btn: {
    color: 'white',
    margin: '0 8px'
  },
  noHover: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  signInBtn: {
    backgroundColor: '#6B5CA5',
    '&:hover': {
      backgroundColor: '#6B5CA5'
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
    maxWidth: 130
  },
  hWelcome: {
    fontSize: '2.5rem'
  },
  hSub: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem'
  },
  mainP: {
    fontSize: '1.3em',
    lineHeight: 1.5,
    marginBottom: '1rem'
  },
  footerLogo: {
    maxHeight: 130
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
        {/* Nav */}
        <Grid item xs={9} container className={classes.nav}>
          <Box display="flex" className={classes.container} justifyContent="space-between">
            <Box display="flex">
              <img src={logo} alt="UN Logo" />
              <Box display="flex" alignItems="center" className={classes.titleContainer}>
                <h3 className={classes.logoTitle}>
                  Donor <br />
                  Reporting <br />
                  Portal
                </h3>
              </Box>
              <Box display="flex" alignItems="center" className={classes.linkContainer}>
                {/* <Link className={classes.navLink}>Link One</Link>
                <Link className={classes.navLink}>Link Two</Link>
                <Link className={classes.navLink}>Link Three</Link> */}
              </Box>
            </Box>

            <Box display="flex" alignItems="center">
              <Button className={clsx(classes.btn, classes.noHover)}>Register</Button>
              <Button
                className={clsx(classes.btn, classes.signInBtn)}
                variant="contained"
                onClick={signIn}
              >
                <Link href="/sociallogin/unicef-azuread-b2c-oauth2/">Sign In</Link>
              </Button>
            </Box>
          </Box>
        </Grid>

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
            <img src={logo} className={classes.logoSplash} alt="UN Logo" />
            <Typography variant="h4" className={classes.hWelcome}>
              <strong>Welcome to the Donor Reporting Portals</strong>
            </Typography>

            <Typography variant="h4" className={classes.hSub} />

            <Typography variant="body2" className={classes.mainP}>
              <strong />
            </Typography>
            <Grid container justify="center" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
