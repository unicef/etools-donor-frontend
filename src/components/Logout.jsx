import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Paper, makeStyles, createStyles } from '@material-ui/core';
import IconTextButton from './IconTextButton';
import { Person, PowerSettingsNew as SignOut } from '@material-ui/icons';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '15vw',
      '&:hover': {
        backgroundColor: theme.palette.common.darkGreyBackground
      }
    }
  })
);

const messages = {
  signOut: 'Sign out',
  profile: 'User Profile'
};

export default function Logout({ onClose, logout }) {
  const classes = useStyles();
  const [viewProfile, setViewProfile] = useState(false);

  function openProfilePage() {
    setViewProfile(true);
    onClose();
  }

  return viewProfile ? (
    <Redirect push to="/user" />
  ) : (
      <Paper>
        <div className={classes.root}>
          <IconTextButton
            icon={<Person />}
            text={messages.profile}
            onClick={openProfilePage}
            textProps={{
              type: 'body2'
            }}
          />
        </div>
        <div className={classes.root}>
          <IconTextButton
            className={classes.root}
            icon={<SignOut />}
            text={messages.signOut}
            onClick={logout}
            textProps={{
              type: 'body2'
            }}
          />
        </div>
      </Paper>
    );
}

Logout.propTypes = {
  onClose: PropTypes.func.isRequred,
  logout: PropTypes.func.isRequred
};
