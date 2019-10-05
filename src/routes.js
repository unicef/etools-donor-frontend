import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from 'components/Auth';
import Main from 'components/Main';

const Routes = () => (
  <Router>
    <Route
      path="/"
      render={props => (
        <Auth>
          <Main {...props} />
        </Auth>
      )}
    />
  </Router>
);

export default Routes;
