import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';
import { selectUserProfile } from 'selectors/user';
import { onFetchUserProfile } from 'actions';
import { selectLoading } from 'selectors/ui-flags';

export default function Auth({ children }) {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(onFetchUserProfile());
  }, []);

  return (
    <>
      <Loader loading={loading} fullscree n />
      {userProfile ? children : null}
    </>
  );
}

Auth.propTypes = {
  children: PropTypes.node.isRequired
};
