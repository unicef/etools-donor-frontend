import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'styles/theme';

const AppTheme = ({ children }) => {
  console.log('TCL: theme', theme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

AppTheme.propTypes = {
  children: PropTypes.node.isRequired
};
export default AppTheme;
