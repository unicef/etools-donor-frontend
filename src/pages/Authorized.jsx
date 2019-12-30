import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import { selectUserProfileDonorId } from 'selectors/ui-flags';
import { usePermissions } from 'components/PermissionRedirect';
import { THEMATIC_REPORTS_PATH } from 'lib/constants';
import DonorsList from './donors-list';
import UsersManagement from './users-portal';

export function ProtectedRouteDonorsList({ children, ...rest }) {
  const { canViewDonors } = usePermissions();
  return (
    <Route {...rest} render={() => (canViewDonors ? children : <Redirect to="/not-found" />)} />
  );
}

export function ProtectedRouteReportPage({ children, ...rest }) {
  const { canViewDonors } = usePermissions();
  const usersDonor = useSelector(selectUserProfileDonorId);

  return (
    <Route
      {...rest}
      render={({ match }) => {
        const { donorId } = match.params;
        const { path } = match;
        const thematicPath = path === THEMATIC_REPORTS_PATH;
        const unassignedDonorAttempt = Boolean(
          usersDonor !== Number(donorId) && !canViewDonors && !thematicPath
        );
        return unassignedDonorAttempt ? <Redirect to="/not-found" /> : children;
      }}
    />
  );
}

export function ProtectedRouteUserManagement({ ...rest }) {
  const { isDonorAdmin, isSuperUser } = usePermissions();

  return (
    <Route
      {...rest}
      render={({ match }) => {
        const { donorId } = match.params;
        return !donorId && isSuperUser ? (
          <DonorsList />
        ) : isDonorAdmin || (donorId && isSuperUser) ? (
          <UsersManagement />
        ) : (
          <Redirect to="/not-found" />
        );
      }}
    />
  );
}

const ProtectedRouteProps = {
  children: PropTypes.node.isRequired
};

ProtectedRouteDonorsList.propTypes = ProtectedRouteProps;
ProtectedRouteReportPage.propTypes = ProtectedRouteProps;
ProtectedRouteUserManagement.propTypes = {
  rest: function() {}
};
