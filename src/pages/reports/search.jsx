import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import SearchReportsFilter from 'pages/reports/components/search-reports-filters-root';
import SearchReportsTable from 'components/table/search-reports-table';
import Footer from 'components/Footer';
import { selectPageName } from 'selectors/ui-flags';
import {
  initSearchReportsPage,
  initPooledGrantsPage,
  initThematicGrantsPage,
  initGaviReportsPage,
  initGaviStatementsPage
} from 'actions';
import { onReceiveSearchReports } from 'slices/search-reports';
import {
  GAVI_REPORTS,
  GAVI_REPORTS_CTN,
  GAVI_STATEMENTS_ACC,
  POOLED_GRANTS,
  SEARCH_REPORTS,
  THEMATIC_GRANTS
} from 'lib/constants';

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

function useInitGaviReports(dispatch) {
  return () => {
    dispatch(initGaviReportsPage());
  };
}

function useInitGaviStatements(dispatch) {
  return () => {
    dispatch(initGaviStatementsPage());
  };
}

function useDefaultHook() {
  return () => {};
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
    case GAVI_REPORTS_CTN:
    case GAVI_REPORTS:
      return useInitGaviReports(dispatch);
    case GAVI_STATEMENTS_ACC:
      return useInitGaviStatements(dispatch);
    default:
      return useDefaultHook;
  }
};

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
      <Footer />
    </>
  );
}
