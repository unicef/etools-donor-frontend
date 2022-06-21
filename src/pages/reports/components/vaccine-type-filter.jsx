import React from 'react';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FormControl, MenuItem } from '@material-ui/core';
import { FORM_CONFIG } from 'lib/constants';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';
import { FilterProps } from '../lib/dropdown-filter-factory';
import { useSelector } from 'react-redux';
import { selectVaccineTypes } from 'selectors/collections';

export default function VaccineTypeFilter({ value, onChange }) {
  const { classes } = useGetFilterClasses();
  const options = useSelector(selectVaccineTypes) || [];

  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="option-select">{FORM_CONFIG.vaccineType.label}</StyledInputLabel>
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
            {option.description}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

VaccineTypeFilter.propTypes = FilterProps;
