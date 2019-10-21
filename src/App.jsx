import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/Routes';
import AppTheme from 'contexts/theme-provider';

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <Routes />
      </AppTheme>
    </Provider>
  );
}

export default App;
