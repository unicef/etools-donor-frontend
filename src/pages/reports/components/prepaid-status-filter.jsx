import React from 'react';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FormControl, MenuItem } from '@material-ui/core';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function PrepaidStatusFilter({ value, onChange }) {
  const { classes } = useGetFilterClasses();
  const options = [{ code: 'yes', label: 'Yes' }, { code: 'no', label: 'No' }];

  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="option-select">Prepaid Status</StyledInputLabel>
      <StyledSelect
        className={classes.textField}
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

PrepaidStatusFilter.propTypes = FilterProps;
