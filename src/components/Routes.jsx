import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from 'components/Auth';
import Main from 'components/Main';
import RouteObserver from 'components/Connected-Router-Watcher';

const Routes = () => (
  <Auth>
    <Router>
      <RouteObserver>
        <Main />
      </RouteObserver>
    </Router>
  </Auth>
);

export default Routes;
