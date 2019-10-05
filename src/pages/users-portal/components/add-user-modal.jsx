import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  TextField,
  Typography,
  Box,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper
} from '@material-ui/core';
import { setValueFromEvent } from 'lib/helpers';
import { makeStyles } from '@material-ui/styles';
import { FORM_CONFIG } from '../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: 625
  },
  dialogTitle: {
    color: 'white',
    background: theme.palette.secondary[500],
    minWidth: 600
  },
  closeButton: {
    color: theme.palette.getContrastText(theme.palette.secondary[500]),
    width: 24,
    height: 24,
    padding: 0
  },
  textField: { marginBottom: theme.spacing(2) },
  formControl: {
    width: '100%'
  },
  contentHeader: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1)
  }
}));

export default function AddUserModal({ open, onClose }) {
  function onSubmit() {}
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const handleChangeRoles = e => {};

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="add-user-dialog">
      <DialogTitle className={classes.dialogTitle} disableTypography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" color="inherit">
            Add New User
          </Typography>
          <IconButton className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Grid item>
        <Paper className={classes.contentHeader} elevation={0}>
          <Typography variant="subheading">
            Email with invitation will be sent to provided email.
          </Typography>
        </Paper>
      </Grid>

      <DialogContent>
        <Grid container direction="column">
          <Grid item xs={4}>
            <TextField
              className={classes.textField}
              margin="none"
              id="name"
              label="Full Name"
              value={name}
              onChange={setValueFromEvent(setName)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={classes.textField}
              margin="none"
              id="email"
              label="Email"
              value={email}
              onChange={setValueFromEvent(setEmail)}
            />
          </Grid>
          <Grid item xs={9}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="roles">{FORM_CONFIG.roles.label}</InputLabel>
              <Select
                value={roles}
                onChange={handleChangeRoles}
                inputProps={{
                  name: 'select-role',
                  id: 'role'
                }}
              >
                {/* {roles.map(role => (
                  <MenuItem key={role.label} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))} */}
                <MenuItem key={1} value={1}>
                  First
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Second
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="secondary" autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
