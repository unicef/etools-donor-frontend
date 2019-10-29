import React from 'react';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FormControl, MenuItem } from '@material-ui/core';
import { FORM_CONFIG } from 'lib/constants';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';
import { FilterProps } from '../lib/filters-factory';

export default function RecertifiedFilter({ value, onChange }) {
  const { classes } = useGetFilterClasses();
  const options = [{ code: 'yes', label: 'Yes' }, { code: 'no', label: 'No' }];

  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="option-select">{FORM_CONFIG.recertified.label}</StyledInputLabel>
      <StyledSelect
        value={value}
        onChange={onChange}
        inputProps={{
          name: 'option',
          id: 'option-select'
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem key={option.code} value={option.code}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

RecertifiedFilter.propTypes = FilterProps;
