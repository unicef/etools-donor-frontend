import React from 'react';
import { Box, Grid } from '@material-ui/core';
import UsersFilter from './components/users-filter';
import UsersTable from 'components/table/users';

export default function UsersList() {
  return (
    <Box flexDirection="column">
      <Grid item xs={12}>
        <UsersFilter />
        <UsersTable />
      </Grid>
    </Box>
  );
}
