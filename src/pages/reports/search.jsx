import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import SearchReportsFilter from 'pages/reports/components/search-reports-filters-root';
import SearchReportsTable from 'components/table/search-reports-table';
import { selectPageName } from 'selectors/ui-flags';
import { initSearchReportsPage, initPooledGrantsPage, initThematicGrantsPage } from 'actions';
import { onReceiveSearchReports } from 'slices/search-reports';
import { POOLED_GRANTS, SEARCH_REPORTS, THEMATIC_GRANTS } from 'lib/constants';

function useInitSearchReports(dispatch, donorId) {
  return () => {
    dispatch(initSearchReportsPage(donorId));
  };
}

function useInitPooledGrants(dispatch, donorId) {
  return () => {
    dispatch(initPooledGrantsPage(donorId));
  };
}

function useInitThematicGrants(dispatch) {
  return () => {
    dispatch(initThematicGrantsPage());
  };
}

function useDefaultHook() {
  return () => { };
}

const useInitPage = pageName => {
  const dispatch = useDispatch();
  const { donorId } = useParams();

  switch (pageName) {
    case SEARCH_REPORTS:
      return useInitSearchReports(dispatch, donorId);
    case POOLED_GRANTS:
      return useInitPooledGrants(dispatch, donorId);
    case THEMATIC_GRANTS:
      return useInitThematicGrants(dispatch);
    default:
      return useDefaultHook;
  }
}

export default function SearchPage() {
  const pageName = useSelector(selectPageName);
  const dispatch = useDispatch();
  const effect = useInitPage(pageName);
  useEffect(effect, [pageName]);

  useEffect(() => {
    dispatch(onReceiveSearchReports([]));
  }, [pageName]);

  return (
    <>
      <SearchReportsFilter />
      <SearchReportsTable />
    </>
  );
}
