import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FormControl, MenuItem } from '@material-ui/core';
import { FORM_CONFIG } from 'lib/constants';
import { selectExternalGrants } from 'selectors/collections';
import { getGrantDisplay } from './grants-filter';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';

export default function ExternalGrantsFilter({ value, onChange }) {
  const { classes } = useGetFilterClasses();
  const externalGrantsCollection = useSelector(selectExternalGrants);

  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="external-grant">
        {FORM_CONFIG.externalGrant.label}
      </StyledInputLabel>
      <StyledSelect
        value={value}
        onChange={onChange}
        inputProps={{
          name: 'select-external-grant',
          id: 'external-grant'
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {externalGrantsCollection.map(grant => (
          <MenuItem key={grant.id} value={grant.id}>
            {getGrantDisplay(grant)}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

ExternalGrantsFilter.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired
};
