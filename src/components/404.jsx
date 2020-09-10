import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { useNav } from './Drawer';
import { UNICEF_USER_ROLE } from '../lib/constants';
import { selectUserGroup, selectUserProfile } from 'selectors/ui-flags';

export default function NotFound() {
  const { goHome } = useNav();
  const userGroup = useSelector(selectUserGroup);
  const isUnicefUser = userGroup === UNICEF_USER_ROLE;
  const profile = useSelector(selectUserProfile);
  const noRoles = !profile.roles.length;

  return (
    noRoles && !isUnicefUser ?
      (<Grid container justify="center" align="center">
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                404
            </Typography>
              <Typography variant="h5" component="h2" />
              <Typography>You have not been granted a role. Please contact your administrator to assign you a role.</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={goHome} size="small">
                Back
            </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>)
      :
      (<Grid container justify="center" align="center">
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                404
            </Typography>
              <Typography variant="h5" component="h2" />
              <Typography>Page not found.</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={goHome} size="small">
                Back
            </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>)
  );
}
