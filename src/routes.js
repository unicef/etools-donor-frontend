import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from 'components/Auth';
import Main from 'components/App-Bar';

const Routes = () => (
    <Router>
        <Route
            path="/"
            render={() => (
                <Auth>
                    <Main />
                </Auth>
            )}
        />
    </Router>
);

export default Routes;
