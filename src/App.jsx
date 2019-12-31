import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/Routes';
import AppTheme from 'contexts/theme-provider';
import { CssBaseline } from '@material-ui/core';

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <CssBaseline />
        <Routes />
      </AppTheme>
    </Provider>
  );
}

export default App;
