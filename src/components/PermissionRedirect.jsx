import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { REPORTS_PATH, UNICEF_USER_ROLE, DONOR_ADMIN_ROLE, POOLED_GRANTS_PATH, POOLED_GRANTS } from '../lib/constants';
import { selectUserGroup, selectUserProfileDonorId, selectIsSuperUser, selectMenuBarPage } from 'selectors/ui-flags';

export const usePermissions = () => {
  const userGroup = useSelector(selectUserGroup);
  const isUnicefUser = userGroup === UNICEF_USER_ROLE;
  const isDonorAdmin = userGroup === DONOR_ADMIN_ROLE;
  const isSuperUser = useSelector(selectIsSuperUser);
  const canViewDonors = isUnicefUser || isSuperUser;
  return {
    isUnicefUser,
    isDonorAdmin,
    isSuperUser,
    canViewDonors
  };
};

export default function PermissionRedirect() {
  const usersDonorId = useSelector(selectUserProfileDonorId);
  const { canViewDonors } = usePermissions();
  const tab = useSelector(selectMenuBarPage);

  if (canViewDonors) {
    return <Redirect to="/donors" />;
  } else if (tab === POOLED_GRANTS) {
    return <Redirect to={`${POOLED_GRANTS_PATH}/${usersDonorId}`} />;
  } else {
    return <Redirect to={`${REPORTS_PATH}/${usersDonorId}`} />;
  }
}
