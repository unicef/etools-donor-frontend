import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { REPORTS_PATH, UNICEF_USER_ROLE, DONOR_ADMIN_ROLE } from '../lib/constants';
import { selectUserGroup, selectUserProfileDonorId } from 'selectors/ui-flags';

export const usePermissions = () => {
  const userGroup = useSelector(selectUserGroup);
  const isUnicefUser = userGroup === UNICEF_USER_ROLE;
  const isDonorAdmin = userGroup === DONOR_ADMIN_ROLE;
  return {
    isUnicefUser,
    isDonorAdmin
  };
};

export default function PermissionRedirect() {
  const usersDonorId = useSelector(selectUserProfileDonorId);
  const userGroup = useSelector(selectUserGroup);

  if (userGroup === UNICEF_USER_ROLE) {
    return <Redirect to="/donors" />;
  } else {
    return <Redirect to={`${REPORTS_PATH}/${usersDonorId}`} />;
  }
}
