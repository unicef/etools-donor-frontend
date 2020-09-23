import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import SearchReportsFilter from 'pages/reports/components/search-reports-filters-root';
import SearchReportsTable from 'components/table/search-reports-table';
import { selectPageName } from 'selectors/ui-flags';
import { initSearchReportsPage } from 'actions';
import { onReceiveSearchReports } from 'slices/search-reports';

function useInitSearchReports(dispatch, donorId) {
  return () => {
    dispatch(initSearchReportsPage(donorId));
  };
}

// use this hook to customize which api calls are made
// for the selected page as we render the reports table
// const useInitPage = () => {
//   const dispatch = useDispatch();
//   const { donorId } = useParams();
//   useInitSearchReports(dispatch, donorId)
// };

export default function SearchPage() {
  // debugger
  const pageName = useSelector(selectPageName);
  const dispatch = useDispatch();
  const { donorId } = useParams();
  useInitSearchReports(dispatch, donorId)
  // const effect = useInitPage();
  // useEffect(effect, [pageName]);

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
