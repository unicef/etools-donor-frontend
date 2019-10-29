import React from 'react';
import { useSelector } from 'react-redux';
import { FormControl, MenuItem } from '@material-ui/core';
import { StyledInputLabel, StyledSelect } from './styled-dropdown';
import { FORM_CONFIG } from 'lib/constants';
import { selectReportType } from 'selectors/collections';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/filters';

export default function ReportTypeFilter({ value, onChange }) {
  const { classes } = useGetFilterClasses();

  const reportTypes = useSelector(selectReportType);
  return (
    <FormControl className={classes.formControl}>
      <StyledInputLabel htmlFor="select-theme">{FORM_CONFIG.reportType.label}</StyledInputLabel>
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
        {reportTypes.map(type => (
          <MenuItem key={type.code} value={type.code}>
            {type.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

ReportTypeFilter.propTypes = FilterProps;
