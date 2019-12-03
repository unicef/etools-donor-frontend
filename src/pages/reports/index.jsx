import React from 'react';
import ReportsFilter from 'pages/reports/components/reports-filters-root';
import ReportsTable from 'components/table/reports';

export default function ReportsPage() {
  return (
    <>
      <ReportsFilter />
      <ReportsTable />
    </>
  );
}
