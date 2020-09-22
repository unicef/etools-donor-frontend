import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import ReportsFilter from 'pages/reports/components/reports-filters-root';
import ReportsFilterOld from 'pages/reports/components/reports-filters-root-old';
import ReportsTable from 'components/table/reports-table';
import ReportsTableOld from 'components/table/reports-table-old';
import { selectPageName } from 'selectors/ui-flags';
import { initCertifiedReportsPage, initThematicReportsPage, initSearchReportsPage } from 'actions';
import { THEMATIC_REPORTS, REPORTS, SEARCH_API } from 'lib/constants';
import { onReceiveReports } from 'slices/reports';

function useInitThematicReports(dispatch) {
  return () => {
    dispatch(initThematicReportsPage());
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

function useInitSearchReports(dispatch, donorId) {
  return () => {
    dispatch(initSearchReportsPage(donorId));
  };
}

// use this hook to customize which api calls are made
// for the selected page as we render the reports table
const useInitPage = pageName => {
  const dispatch = useDispatch();
  const { donorId } = useParams();

  switch (pageName) {
    case THEMATIC_REPORTS:
      return useInitThematicReports(dispatch);
    case REPORTS:
      return useInitCertifiedReports(dispatch, donorId);
    case SEARCH_API:
      return useInitSearchReports(dispatch, donorId);
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
      {pageName === REPORTS ? <ReportsFilterOld /> : <ReportsFilter />}
      {pageName === REPORTS ? <ReportsTableOld /> : <ReportsTable />}
    </>
  );
}
