import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { selectUserDonorId, selectUserGroup, selectIsAuthorized } from 'selectors/ui-flags';
import { UNICEF_USER_ROLE } from 'lib/constants';
import { initDonorsList } from 'actions';

export default function AuthorizedPage({ children }) {
  const { donorId: paramDonor } = useParams();
  const usersDonor = useSelector(selectUserDonorId);
  const userGroup = useSelector(selectUserGroup);
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);

  useEffect(() => {
    if (userGroup === UNICEF_USER_ROLE) {
      dispatch(initDonorsList());
    }
  }, [userGroup]);

  const unassignedDonorAttempt =
    paramDonor && usersDonor !== Number(paramDonor) && userGroup !== UNICEF_USER_ROLE;

  if (unassignedDonorAttempt) {
    return <Redirect to="/not-found" />;
  }

  return isAuthorized ? children : null;
}
