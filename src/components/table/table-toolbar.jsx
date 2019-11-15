import React from 'react';
import PropTypes from 'prop-types';
import { useToolbarStyles } from 'styles/table-styles';
import { Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';

export default function EnhancedTableToolbar({ children }) {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root)}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Users
        </Typography>
      </div>
      <div className={classes.spacer} />
      {children}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  children: PropTypes.node
};
