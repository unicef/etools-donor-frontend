import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { find, prop, propEq } from 'ramda';
import {
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  TextField
} from '@material-ui/core';
import useFilterStyles from 'styles/filter-styles';
import { selectUserGroups } from 'selectors/user';
import { FORM_CONFIG } from '../../../constants';
import { onFetchUserRoles, onFetchUserGroups } from 'actions';
import { setValueFromEvent } from 'lib/helpers';
import { setUserRoles } from 'reducers/user-roles';

export default function UsersFilter() {
  const classes = useFilterStyles();
  const dispatch = useDispatch();
  const groups = useSelector(selectUserGroups);
  const { donorId } = useParams();

  useEffect(() => {
    if (!groups.length) {
      dispatch(onFetchUserGroups());
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);

  function reset() {
    setSelectedRoles([]);
    setSearchQuery('');
  }

  useEffect(() => {
    const queryObj = {
      group: selectedRoles.map(name => prop('id', find(propEq('name', name), groups)))[0], //TODO: fix multi on backend
      donor: donorId,
      search: searchQuery || undefined
    };
    dispatch(onFetchUserRoles(queryObj));
    return () => dispatch(setUserRoles([]));
  }, [searchQuery, selectedRoles]);

  return (
    <Grid item xs={12} className={classes.filterContainer}>
      <Grid container direction="row" spacing={1}>
        <Grid item sm={4} xs={12}>
          <FormControl className={classes.formControl}>
            <TextField
              id="search"
              label="Search"
              className={classes.textField}
              value={searchQuery}
              onChange={setValueFromEvent(setSearchQuery)}
              margin="none"
            />
          </FormControl>
        </Grid>
        <Grid item sm={4} xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="roles">{FORM_CONFIG.roles.label}</InputLabel>
            <Select
              value={selectedRoles}
              onChange={setValueFromEvent(setSelectedRoles)}
              multiple
              inputProps={{
                name: 'select-role',
                id: 'role'
              }}
            >
              {groups.map(group => (
                <MenuItem key={group.name} value={group.name}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item className={classes.button}>
          <Button
            className={classes.formBtn}
            color="secondary"
            onClick={() => {
              reset();
            }}
          >
            {FORM_CONFIG.clear.label}
          </Button>
          {/* <Button className={classes.formBtn} color="secondary" onClick={handleSubmit}>
            {FORM_CONFIG.search.label}
          </Button> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
