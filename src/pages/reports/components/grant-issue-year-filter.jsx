import React from 'react';
import { useSelector } from 'react-redux';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FormControl, MenuItem } from '@material-ui/core';
import { FORM_CONFIG } from 'lib/constants';
import { selectYears } from 'selectors/collections';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';
import { FilterProps } from '../lib/filters';

export default function GrantIssueYearFilter({ value, onChange }) {
  const { classes } = useGetFilterClasses();
  const years = useSelector(selectYears) || [];

  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="year-select">{FORM_CONFIG.grantIssueYear.label}</StyledInputLabel>
      <StyledSelect
        value={value}
        onChange={onChange}
        inputProps={{
          name: 'year',
          id: 'year-select'
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {years.map(year => (
          <MenuItem key={year.code} value={year.code}>
            {year.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

GrantIssueYearFilter.propTypes = FilterProps;
