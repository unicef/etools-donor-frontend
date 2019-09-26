import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CircularProgress, makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
    createStyles({
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
            backgroundColor: theme.palette.common.lightBlack,
            top: 0,
            left: 0,
            zIndex: 5000
        },
        spinner: {
            position: 'absolute',
            left: 'calc(50% - 25px)',
            top: 'calc(50% - 25px)'
        }
    })
);

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
            {loading && (
                <CircularProgress className={classes.spinner} color="secondary" size={50} />
            )}
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
