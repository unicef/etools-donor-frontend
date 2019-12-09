import React from 'react';
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types';
import { useToolbarStyles } from 'styles/table-styles';
import { Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { selectPageName } from 'selectors/ui-flags';
import { capitalize } from 'lib/helpers';

export default function EnhancedTableToolbar({ children }) {
  const classes = useToolbarStyles();
  const page = useSelector(selectPageName)
  return (
    <Toolbar className={clsx(classes.root)}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {capitalize(page)}
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
