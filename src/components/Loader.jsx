import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CircularProgress, makeStyles, createStyles, Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%'
  },
  empty: {
    display: 'none',
    width: 0,
    height: 0
  },
  relative: {
    position: 'relative'
  },
  Fullscreen: {
    position: 'fixed',
    backgroundColor: 'rgba(255,255,255,0.7)',
    top: 0,
    left: 0,
    zIndex: 5000
  },
  spinner: {
    position: 'absolute',
    left: 'calc(50% - 25px)',
    top: 'calc(50% - 25px)'
  }
});

const Loader = ({ children, loading, fullscreen, replaceContent }) => {
  const classes = useStyles();
  const className = classNames(classes.root, {
    [classes.empty]: fullscreen && !loading,
    [classes.relative]: !fullscreen && loading,
    [classes.Fullscreen]: fullscreen && loading
  });
  if (replaceContent) {
    return loading ? (
      <div className={className}>
        <CircularProgress className={classes.spinner} color="secondary" size={50} />
      </div>
    ) : (
      children
    );
  }
  return (
    <div className={className}>
      {loading && <CircularProgress className={classes.spinner} color="secondary" size={50} />}
      {children}
    </div>
  );
};

Loader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  loading: PropTypes.bool,
  fullscreen: PropTypes.bool,
  replaceContent: PropTypes.bool
};

export default Loader;

const useSLocaltyles = makeStyles(() =>
  createStyles({
    root: {
      left: 0,
      top: 0,
      width: '100%',
      height: '100vh',
      // position: 'fixed',
      // backgroundColor: 'rgba(255,255,255,0.7)',
      transition: 'all 0.3s ease',
      zIndex: 100
    },
    text: {
      textTransform: 'uppercase',
      fontWeight: 500,
      fontSize: 18,
      marginTop: 10
    }
  })
);

export function LoaderLocal() {
  const styles = useSLocaltyles({});
  return (
    <Box justifyContent="center" alignItems="center" className={styles.root}>
      <Box flexDirection="column" justifyContent="center" alignItems="center">
        <CircularProgress color="secondary" />
      </Box>
    </Box>
  );
}
