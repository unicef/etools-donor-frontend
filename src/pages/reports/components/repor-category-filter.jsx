import React from 'react';
import { useSelector } from 'react-redux';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FormControl, MenuItem } from '@material-ui/core';
import { FORM_CONFIG } from 'lib/constants';
import { selectDonorCategory } from 'selectors/collections';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';
import { FilterProps } from '../lib/filters';

export default function ReportCategoryFilter({ value, onChange }) {
  const { classes } = useGetFilterClasses();
  const categories = useSelector(selectDonorCategory);

  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="category-select">
        {FORM_CONFIG.reportCategory.label}
      </StyledInputLabel>
      <StyledSelect
        value={value}
        onChange={onChange}
        inputProps={{
          name: 'category',
          id: 'category-select'
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {categories.map(category => (
          <MenuItem key={category.code} value={category.code}>
            {category.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

ReportCategoryFilter.propTypes = FilterProps;
