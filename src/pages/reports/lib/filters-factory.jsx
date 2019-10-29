import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FormControl, MenuItem } from '@material-ui/core';
import { StyledInputLabel, StyledSelect } from '../components/styled-dropdown';
import { useGetFilterClasses } from 'styles/filter-styles';

export default function DropdownFilterFactory(selector, label) {
  const Component = ({ value, onChange }) => {
    const { classes } = useGetFilterClasses();
    const options = useSelector(selector);

    return (
      <FormControl className={classes.formControl}>
        <StyledInputLabel htmlFor={label}>{label}</StyledInputLabel>
        <StyledSelect
          value={value}
          onChange={onChange}
          inputProps={{
            name: 'option',
            id: label
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
  };
  Component.propTypes = FilterProps;
  return Component;
}

export const FilterProps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  selector: PropTypes.func
};
