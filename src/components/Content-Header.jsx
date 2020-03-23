import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';
import { getSubheadingFromParams } from 'lib/params';
import { selectDonorName } from 'selectors/ui-flags';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: ' 100%',
      margin: 0,
      padding: `16px 24px 0 24px`
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#244784'
    },
    description: {
      fontSize: '1rem'
    },
    content: {
      minHeight: 64,
      paddingBottom: theme.spacing(1)
    }
  })
);

function ContentHeader({ children, location }) {
  const classes = useStyles();
  const donorName = useSelector(selectDonorName);
  const title = getSubheadingFromParams(location.pathname, donorName);
  return (
    <Grid
      alignItems="center"
      justify="space-between"
      className={`${classes.root} ${classes.content}`}
      container
    >
      <Grid>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
      </Grid>
      {children}
    </Grid>
  );
}

export default withRouter(ContentHeader);
ContentHeader.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node
};
