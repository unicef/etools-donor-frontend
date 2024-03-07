import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import ReportsFilter from 'pages/reports/components/reports-filters-root';
import ReportsTable from 'components/table/reports-table';
import { selectPageName } from 'selectors/ui-flags';
import { initCertifiedReportsPage, initThematicGrantsPage, initGaviReportsPage, initGaviStatementsPage } from 'actions';
import { THEMATIC_GRANTS, REPORTS, GAVI_REPORTS } from 'lib/constants';
import { onReceiveReports } from 'slices/reports';

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
  return () => { };
}

function useInitCertifiedReports(dispatch, donorId) {
  return () => {
    dispatch(initCertifiedReportsPage(donorId));
  };
}

// use this hook to customize which api calls are made
// for the selected page as we render the reports table
const useInitPage = pageName => {
  const dispatch = useDispatch();
  const { donorId } = useParams();

  switch (pageName) {
    case THEMATIC_GRANTS:
      return useInitThematicGrants(dispatch);
    case GAVI_REPORTS:
      return useInitGaviReports(dispatch);
    case GAVI_STATEMENTS_ACC:
      return useInitGaviStatements(dispatch);
    case REPORTS:
      return useInitCertifiedReports(dispatch, donorId);
    default:
      return useDefaultHook;
  }
};

export default function ReportsPage() {
  const pageName = useSelector(selectPageName);
  const dispatch = useDispatch();
  const effect = useInitPage(pageName);
  useEffect(effect, [pageName]);

  useEffect(() => {
    dispatch(onReceiveReports([]));
  }, [pageName]);

  return (
    <>
      <ReportsFilter />
      <ReportsTable />
    </>
  );
}
