import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';
import { getSubheadingFromParams } from 'lib/params';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: ' 100%',
      margin: 0,
      padding: `16px 24px 0 24px`,
      background: '#fff',
      borderBottom: '2px #e0e0e0 solid'
    },
    title: {
      fontSize: '1.25rem'
    },
    content: {
      minHeight: 64,
      paddingBottom: theme.spacing(1)
    }
  })
);

function ContentHeader({ children, location }) {
  const classes = useStyles();
  const title = getSubheadingFromParams(location.pathname);
  return (
    <Grid
      alignItems="center"
      justify="space-between"
      className={`${classes.root} ${classes.content}`}
      container
    >
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      {children}
    </Grid>
  );
}

export default withRouter(ContentHeader);
ContentHeader.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node
};
