import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FormControl, MenuItem } from '@material-ui/core';
import { FORM_CONFIG } from 'lib/constants';
import { selectGrants } from 'selectors/collections';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';

export default function GrantsFilter({ value, onChange }) {
  const { classes } = useGetFilterClasses();
  const grantsCollection = useSelector(selectGrants);

  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="grant-select">{FORM_CONFIG.grant.label}</StyledInputLabel>
      <StyledSelect
        value={value}
        onChange={onChange}
        inputProps={{
          name: 'grant',
          id: 'grant-select'
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {grantsCollection.map(grant => (
          <MenuItem key={grant.id} value={grant.id}>
            {getGrantDisplay(grant)}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

GrantsFilter.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired
};

export function getGrantDisplay(grant) {
  return grant.category ? `${grant.category}-${grant.code}` : grant.code;
}
