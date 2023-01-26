import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import { selectUserProfileDonorId, selectUserDonor } from 'selectors/ui-flags';
import {selectConfig} from 'selectors/collections';
import { usePermissions } from 'components/PermissionRedirect';
import { GAVI_REPORTS_PATH, THEMATIC_GRANTS_PATH } from 'lib/constants';
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
  return (
    <Route {...rest} render={() => children } />
  );
}

export function ProtectedRouteReportPage({ children, ...rest }) {
  let { canViewDonors } = usePermissions();
  const usersDonor = useSelector(selectUserProfileDonorId);
  const config = useSelector(selectConfig);
  const donor = useSelector(selectUserDonor);
  let isGaviDonor = false;
  if (donor && config) {
    isGaviDonor = donor.code === config.gavi_donor_code;
  }

  return (
    <Route
      {...rest}
      render={({ match }) => {
        const { donorId } = match.params;
        const { path } = match;
        const thematicPath = path === THEMATIC_GRANTS_PATH;
        if (path === GAVI_REPORTS_PATH && isGaviDonor) {
          canViewDonors = true;
        }
        const unassignedDonorAttempt = usersDonor ? Boolean(
          usersDonor !== Number(donorId) && !canViewDonors && !thematicPath
        ) : Boolean(!canViewDonors);
        return unassignedDonorAttempt ? <Redirect to="/not-found" /> : children;
      }}
    />
  );
}

export function ProtectedRouteUserManagement({ ...rest }) {
  const { isDonorAdmin, isSuperUser, isUnicefUser, isDonorUser } = usePermissions();

  return (
    <Route
      {...rest}
      render={({ match }) => {
        const { donorId } = match.params;
        return !donorId && (isUnicefUser || isSuperUser) ? (
          <DonorsList />
        ) : isDonorAdmin || isDonorUser || (donorId && (isSuperUser || isUnicefUser)) ? (
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
