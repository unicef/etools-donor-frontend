import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { REPORTS_PATH, UNICEF_USER_ROLE } from '../lib/constants';
import { selectUserDonorId, selectUserGroup } from 'selectors/ui-flags';

export default function PermissionRedirect() {
  const usersDonorId = useSelector(selectUserDonorId);
  const userGroup = useSelector(selectUserGroup);

  if (userGroup === UNICEF_USER_ROLE) {
    return <Redirect to="/donors" />;
  } else {
    return <Redirect to={`${REPORTS_PATH}/${usersDonorId}`} />;
  }
}
