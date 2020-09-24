import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

export default function NoRole() {
  return (
    <Grid container justify="center" align="center">
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Unassigned Role
          </Typography>
            <Typography variant="h5" component="h2" />
            <Typography>You currently do not have access to Donor Reporting Portal, please reach out your focal point.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid >
  );
}
