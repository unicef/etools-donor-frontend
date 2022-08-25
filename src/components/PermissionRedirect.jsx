import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { REPORTS_PATH, DONOR_ADMIN_ROLE, DONOR_USER_ROLE, POOLED_GRANTS_PATH, POOLED_GRANTS } from '../lib/constants';
import { selectUserGroup, selectUserProfileDonorId, selectIsSuperUser, selectIsUnicefUser, selectMenuBarPage } from 'selectors/ui-flags';

export const usePermissions = () => {
  const userGroup = useSelector(selectUserGroup);
  const isUnicefUser = useSelector(selectIsUnicefUser);
  const isDonorAdmin = userGroup === DONOR_ADMIN_ROLE;
  const isDonorUser = userGroup === DONOR_USER_ROLE;
  const isSuperUser = useSelector(selectIsSuperUser);
  const canViewDonors = isUnicefUser || isSuperUser;
  return {
    isUnicefUser,
    isDonorAdmin,
    isSuperUser,
    isDonorUser,
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
