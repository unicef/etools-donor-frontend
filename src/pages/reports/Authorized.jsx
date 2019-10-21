import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { selectUserDonorId, selectUserGroup } from 'selectors/ui-flags';
import { UNICEF_USER_ROLE } from 'lib/constants';

export default function AuthorizedPage({ children }) {
  const { donorId: paramDonor } = useParams();
  const usersDonor = useSelector(selectUserDonorId);
  const userGroup = useSelector(selectUserGroup);

  if (paramDonor && usersDonor !== Number(paramDonor) && userGroup !== UNICEF_USER_ROLE) {
    return <Redirect to="/not-found" />;
  }

  return children;
}
