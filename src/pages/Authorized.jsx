import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import { selectUserProfileDonorId } from 'selectors/ui-flags';
import { usePermissions } from 'components/PermissionRedirect';
import { THEMATIC_REPORTS_PATH } from 'lib/constants';
import DonorsList from './donors-list';
import UsersManagement from './users-portal';
import { setAssignedRole } from '../slices/ui'

import { selectUserProfile } from 'selectors/ui-flags';

export function UnassignedDonor({ children, ...rest }) {
  const { isSuperUser, isUnicefUser } = usePermissions();
  const profile = useSelector(selectUserProfile);
  const noRoles = !profile.roles.length;
  const hasNoAssignedRole = noRoles && !isUnicefUser && !isSuperUser;
  const dispatch = useDispatch();
  dispatch(setAssignedRole({ assignedRole: !hasNoAssignedRole }));

  return (
    <Route {...rest} render={() => hasNoAssignedRole ? <Redirect to="/no-role" /> : children} />
  )
}

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
        const unassignedDonorAttempt = usersDonor ? Boolean(
          usersDonor !== Number(donorId) && !canViewDonors && !thematicPath
        ) : Boolean(!canViewDonors);
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

UnassignedDonor.propTypes = ProtectedRouteProps;
ProtectedRouteDonorsList.propTypes = ProtectedRouteProps;
ProtectedRouteReportPage.propTypes = ProtectedRouteProps;
ProtectedRouteUserManagement.propTypes = {
  rest: function () { }
};
