import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';

import LoginAuth from 'components/Login-Auth-Wrapper';
import Main from 'components/Main';
import RouteObserver from 'components/Connected-Router-Watcher';
import LandingPage from 'pages/landing/Page';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/landing" component={LandingPage} />
      <Route path="*">
        <LoginAuth>
          <RouteObserver>
            <Main />
          </RouteObserver>
        </LoginAuth>
      </Route>
    </Switch>
  </Router>
);

export default Routes;
