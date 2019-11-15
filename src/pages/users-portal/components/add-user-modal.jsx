import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { prop, propOr } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
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
  Paper,
  FormHelperText,
  CircularProgress
} from '@material-ui/core';
import { setValueFromEvent, oneIsEmpty } from 'lib/helpers';
import { makeStyles } from '@material-ui/styles';
import { FORM_CONFIG } from '../../../lib/constants';
import { selectUserGroups } from 'selectors/user';
import { selectCreatedRole, selectFormError } from 'selectors/ui-flags';
import { onCreateUserRole } from 'actions';
import { getErrorState } from 'lib/error-parsers';
import { onResetFormError, onFormError } from 'reducers/form-error';

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
  textField: { marginBottom: theme.spacing(0.5) },
  formControl: {
    width: '100%'
  },
  contentHeader: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  },
  error: {
    color: theme.palette.error.main
  },
  formRow: {
    marginBottom: theme.spacing(1)
  }
}));

export default function AddUserModal({ open, onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { donorId } = useParams();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');

  const createdRole = useSelector(selectCreatedRole);
  const groups = useSelector(selectUserGroups);
  const formError = useSelector(selectFormError);

  function resetForm() {
    setEmail('');
    setFirstName('');
    setLastName('');
    setRole('');
  }

  function handleErrorState(modelName, stateProp) {
    return () => {
      if (stateProp.length && propOr(null, [modelName], formError)) {
        dispatch(
          onFormError({
            ...formError,
            [modelName]: undefined
          })
        );
      }
    };
  }

  async function onSubmit() {
    const user = {
      username: email,
      first_name: firstName,
      last_name: lastName,
      email
    };
    const rolePayload = {
      group: prop('id', groups.find(g => g.name === role)),
      donor: donorId
    };
    setLoading(true);
    dispatch(onCreateUserRole({ user, rolePayload }));
  }

  useEffect(() => {
    if (formError) {
      setLoading(false);
    }
  }, [formError]);

  useEffect(() => {
    setLoading(false);
    onClose();
  }, [createdRole]);

  useEffect(() => {
    if (!open) {
      resetForm();
      dispatch(onResetFormError());
    }
  }, [open]);

  const stopPropagationForTab = event => {
    if (event.key === 'Tab') {
      event.stopPropagation();
    }
  };

  const btnContent = (loading && <CircularProgress size={24} />) || 'Submit';
  const onSubmitDisabled = oneIsEmpty(email, firstName, lastName, role);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onKeyDown={stopPropagationForTab}
      aria-labelledby="add-user-dialog"
    >
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
          <Typography variant="subtitle1">
            Email with invitation will be sent to provided email.
          </Typography>
        </Paper>
      </Grid>

      <DialogContent>
        <FormControl className={classes.formControl}>
          <Grid container direction="column">
            <Grid className={classes.formRow} container spacing={3}>
              <Grid item xs={5}>
                <TextField
                  required
                  className={classes.textField}
                  margin="none"
                  id="email"
                  label="Email"
                  value={email}
                  error={getErrorState(formError, 'username')}
                  onBlur={handleErrorState('email', email)}
                  onChange={setValueFromEvent(setEmail)}
                />
                {getErrorState(formError, 'username') && (
                  <FormHelperText className={classes.error}>{formError['username']}</FormHelperText>
                )}
              </Grid>
            </Grid>
            <Grid container className={classes.formRow} spacing={3}>
              <Grid item xs={5}>
                <TextField
                  required
                  className={classes.textField}
                  margin="none"
                  id="first-name"
                  label="First Name"
                  value={firstName}
                  onBlur={handleErrorState('first_name', firstName)}
                  error={getErrorState(formError, 'first_name')}
                  onChange={setValueFromEvent(setFirstName)}
                />
                {getErrorState(formError, 'first_name') && (
                  <FormHelperText className={classes.error}>
                    {formError['first_name']}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required
                  className={classes.textField}
                  margin="none"
                  id="last-name"
                  label="Last Name"
                  value={lastName}
                  onBlur={handleErrorState('last_name', lastName)}
                  error={getErrorState(formError, 'last_name')}
                  onChange={setValueFromEvent(setLastName)}
                />
                {getErrorState(formError, 'last_name') && (
                  <FormHelperText className={classes.error}>
                    {formError['last_name']}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={5}>
                <form
                  action="
              "
                />
                <FormControl className={classes.formControl} required>
                  <InputLabel htmlFor="roles">{FORM_CONFIG.role.label}</InputLabel>
                  <Select
                    value={role}
                    onBlur={handleErrorState('group', role)}
                    error={getErrorState(formError, 'group')}
                    onChange={setValueFromEvent(setRole)}
                    inputProps={{
                      name: 'select-role',
                      id: 'role'
                    }}
                  >
                    {groups.map(group => (
                      <MenuItem key={group.id} value={group.name}>
                        {group.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {getErrorState(formError, 'group') && (
                    <FormHelperText className={classes.error}>{formError['group']}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onSubmit} color="secondary" disabled={onSubmitDisabled} autoFocus>
          {btnContent}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
