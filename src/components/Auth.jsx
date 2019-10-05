import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { selectUserRoles } from 'selectors/user';
import { onFetchUserRoles } from 'actions';

export default function Auth({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userRoles = useSelector(selectUserRoles); //TODO: profile instead of orles

  useEffect(() => {
    try {
      dispatch(onFetchUserRoles());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Loader loading={loading} fullscreen />
      {userRoles ? children : null}
    </>
  );
}

Auth.propTypes = {
  children: PropTypes.node.isRequired
};
