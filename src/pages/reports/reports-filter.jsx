import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, FormControl, Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import { useParams } from 'react-router';
import { selectGrants, selectExternalGrants, selectThemeCollection } from 'selectors/collections';
import useFilterStyles from 'styles/filter-styles';
import { FORM_CONFIG } from '../../constants';
import { initDonorsFilter } from 'actions';

export default function ReportsFilter() {
  const dispatch = useDispatch();
  const { donorId: id } = useParams();

  useEffect(() => {
    dispatch(initDonorsFilter(id));
  }, []);

  function handleSubmit() {}
  const classes = useFilterStyles();

  const [grant, setGrant] = useState('');
  const [theme, settheme] = useState('');
  const [externalRefGrant, setExternalRefGrant] = useState('');

  const grantsCollection = useSelector(selectGrants);
  const externalGrantsCollection = useSelector(selectExternalGrants);
  const themesCollection = useSelector(selectThemeCollection);

  const reset = useCallback(() => {
    setGrant(null);
    settheme(null);
    setExternalRefGrant(null);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} className={classes.filterContainer}>
        <Grid container direction="row" spacing={1}>
          <Grid item sm={4} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grant">{FORM_CONFIG.grants.label}</InputLabel>
              <Select
                value={grant}
                name="Grants"
                onChange={e => setGrant(e.target.value)}
                inputProps={{
                  name: 'select-grant',
                  id: 'grant',
                  placeholder: 'Grants'
                }}
              >
                {/* {grantsCollection.map(grant => (
                                    <MenuItem key={grant.label} value={grant.value}>
                                        {grant.label}
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
          <Grid item sm={4} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="external-grant">{FORM_CONFIG.externalGrants.label}</InputLabel>
              <Select
                value={externalRefGrant}
                onChange={e => setExternalRefGrant(e.target.value)}
                inputProps={{
                  name: 'select-external-grant',
                  id: 'external-grant'
                }}
              >
                {externalGrantsCollection.map((grant, idx) => (
                  <MenuItem key={idx} value={grant.value}>
                    {grant.label}
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
                onChange={e => settheme(e.target.value)}
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
          <Button className={classes.formBtn} color="secondary" onClick={handleSubmit}>
            {FORM_CONFIG.submit.label}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
