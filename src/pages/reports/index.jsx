import React from 'react';
import Authorized from '../Authorized';
import ReportsFilter from 'pages/reports/reports-filter';
import ReportsTable from 'components/table/reports';

export default function ReportsPage() {
  return (
    <Authorized>
      <ReportsFilter />
      <ReportsTable />
    </Authorized>
  );
}
