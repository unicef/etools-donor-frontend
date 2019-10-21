import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { propEq } from 'ramda';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  IconButton
} from '@material-ui/core';
import { useParams } from 'react-router';
import { selectGrants, selectExternalGrants, selectThemeCollection } from 'selectors/collections';
import useFilterStyles from 'styles/filter-styles';
import { FORM_CONFIG } from '../../lib/constants';
import { initDonorsFilter } from 'actions';
import { setValueFromEvent } from 'lib/helpers';

export default function ReportsFilter() {
  const dispatch = useDispatch();
  const { donorId: id } = useParams();

  useEffect(() => {
    dispatch(initDonorsFilter(id));
  }, []);

  function handleSubmit() {}
  const classes = useFilterStyles();

  const [grant, setGrant] = useState('');
  const [theme, setTheme] = useState('');
  const [externalRefGrant, setExternalRefGrant] = useState('');

  const grantsCollection = useSelector(selectGrants);
  const externalGrantsCollection = useSelector(selectExternalGrants);
  const themesCollection = useSelector(selectThemeCollection);

  const reset = useCallback(() => {
    setGrant(null);
    setTheme(null);
    setExternalRefGrant(null);
  });

  function getGrantDisplay(grant) {
    return `${grant.category} - ${grant.code}`;
  }

  function displayGrantById(id, collection) {
    if (!id) {
      return '';
    }
    const grant = collection.find(propEq('id', id));
    return getGrantDisplay(grant);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} className={classes.filterContainer}>
        <Button className={classes.filterBtn} size="small">
          <FilterListIcon className={classes.filterIcon} />
          Filter
        </Button>
        {/* <Grid container direction="row" spacing={1}>
          <Grid item sm={4} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grant">{FORM_CONFIG.grants.label}</InputLabel>
              <Select
                value={grant}
                name="Grants"
                onChange={setValueFromEvent(setGrant)}
                inputProps={{
                  name: 'select-grant',
                  id: 'grant',
                  placeholder: 'Grants'
                }}
              >
                {grantsCollection.map(grant => (
                  <MenuItem key={grant.id} value={getGrantDisplay(grant)}>
                    {getGrantDisplay(grant)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="external-grant">{FORM_CONFIG.externalGrants.label}</InputLabel>
              <Select
                value={displayGrantById(externalRefGrant, externalGrantsCollection)}
                onChange={setValueFromEvent(setExternalRefGrant)}
                inputProps={{
                  name: 'select-external-grant',
                  id: 'external-grant'
                }}
              >
                {externalGrantsCollection.map(grant => (
                  <MenuItem key={grant.id} value={grant.id}>
                    {getGrantDisplay(grant)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-theme">{FORM_CONFIG.themes.label}</InputLabel>
              <Select
                value={theme}
                onChange={setValueFromEvent(setTheme)}
                inputProps={{
                  name: 'select-theme',
                  id: 'theme'
                }}
              >
                {themesCollection.map(theme => (
                  <MenuItem key={theme.id} value={theme.name}>
                    {theme.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid> */}

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
          <Button className={classes.formBtn} color="secondary" onClick={handleSubmit}>
            {FORM_CONFIG.submit.label}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
