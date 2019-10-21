// import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { onRouteChange } from 'reducers/ui';

export default function ConnectedRouterWatcher({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, donorId] = location.pathname.split('/').filter(Boolean);

  dispatch(onRouteChange({ page, donorId: donorId || null }));
  return children;
}
