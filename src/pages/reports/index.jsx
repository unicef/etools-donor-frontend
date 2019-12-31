import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import ReportsFilter from 'pages/reports/components/reports-filters-root';
import ReportsTable from 'components/table/reports-table';
import { selectMenuBarPage } from 'selectors/ui-flags';
import { initCertifiedReportsPage, initThematicReportsPage } from 'actions';
import { THEMATIC_REPORTS, REPORTS } from 'lib/constants';
import { onReceiveReports } from 'slices/reports';

function useInitThematicReports(dispatch) {
  return () => {
    dispatch(initThematicReportsPage());
  };
}

function useDefaultHook() {
  return () => {};
}

function useInitiCertifiedReports(dispatch, donorId) {
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
    case THEMATIC_REPORTS:
      return useInitThematicReports(dispatch);
    case REPORTS:
      return useInitiCertifiedReports(dispatch, donorId);
    default:
      return useDefaultHook;
  }
};

export default function ReportsPage() {
  const pageName = useSelector(selectMenuBarPage);
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
