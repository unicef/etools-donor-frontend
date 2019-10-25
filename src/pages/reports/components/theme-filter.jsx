import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormControl, MenuItem } from '@material-ui/core';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';
import { FORM_CONFIG } from 'lib/constants';
import { setValueFromEvent } from 'lib/helpers';
import { selectThemeCollection } from 'selectors/collections';
import { useGetFilterClasses } from 'styles/filter-styles';

export default function ThemeFilter() {
  const { classes } = useGetFilterClasses();

  const [theme, setTheme] = useState('');
  const themesCollection = useSelector(selectThemeCollection);
  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="select-theme">{FORM_CONFIG.themes.label}</StyledInputLabel>
      <StyledSelect
        value={theme}
        onChange={setValueFromEvent(setTheme)}
        inputProps={{
          name: 'select-theme',
          id: 'select-theme'
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {themesCollection.map(theme => (
          <MenuItem key={theme.id} value={theme.name}>
            {theme.name}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}
