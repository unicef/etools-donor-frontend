import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { selectError } from 'selectors/errors';
import { MySnackbarContentWrapper } from './Snackbars';
import { setError } from 'slices/error';

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function ErrorsSnackbar() {
  const classes = useStyles2();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (error) {
      setErrorMessage(`Error: ${error.message}. Failure at url: ${error.config.url}`);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setError(null));
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
      >
        <MySnackbarContentWrapper
          variant="error"
          onClose={handleClose}
          className={classes.margin}
          message={errorMessage}
        />
      </Snackbar>
    </div>
  );
}
