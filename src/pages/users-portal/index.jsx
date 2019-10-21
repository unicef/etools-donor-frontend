import React from 'react';
import UsersFilter from './components/users-filter';
import UsersTable from 'components/table/users';
import Authorized from 'pages/reports/Authorized';

export default function UsersList() {
  return (
    <Authorized>
      <UsersFilter />
      <UsersTable />
    </Authorized>
  );
}
