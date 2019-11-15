import React from 'react';
import { useSelector } from 'react-redux';
import { FormControl, MenuItem } from '@material-ui/core';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';
import { FORM_CONFIG } from 'lib/constants';
import { selectThemeCollection } from 'selectors/collections';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function ThemeFilter({ value, onChange }) {
  const { classes } = useGetFilterClasses();

  const themesCollection = useSelector(selectThemeCollection);
  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="select-theme">{FORM_CONFIG.theme.label}</StyledInputLabel>
      <StyledSelect
        value={value}
        onChange={onChange}
        inputProps={{
          name: 'select-theme',
          id: 'select-theme'
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {themesCollection.map(theme => (
          <MenuItem key={theme.id} value={theme.id}>
            {theme.name}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

ThemeFilter.propTypes = FilterProps;
