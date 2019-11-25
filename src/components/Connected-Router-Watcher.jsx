// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { equals } from 'ramda';
import { useLocation } from 'react-router';
import { onRouteChange } from 'slices/ui';
import { useEffect } from 'react';
import { selectPageName, selectParamDonorId } from 'selectors/ui-flags';

export default function ConnectedRouterWatcher({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentPageName = useSelector(selectPageName);
  const currentDonorId = useSelector(selectParamDonorId);

  useEffect(() => {
    // only dispatch if actual route changed, children change will trigger re-render of this component
    const [page, donorId] = location.pathname.split('/').filter(Boolean);
    if (!equals(currentPageName, page) || !equals(currentDonorId, donorId)) {
      dispatch(onRouteChange({ page, donorId: donorId || null }));
    }
  });

  return children;
}
