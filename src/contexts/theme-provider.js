import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'styles/theme';

const AppTheme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
export default AppTheme;
