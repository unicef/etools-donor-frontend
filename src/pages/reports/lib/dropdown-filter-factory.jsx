import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FormControl, MenuItem } from '@material-ui/core';
import { StyledInputLabel, StyledSelect } from '../components/styled-dropdown';
import { useGetFilterClasses } from 'styles/filter-styles';
import clsx from 'clsx';

export default function DropdownFilterFactory(selector, label, filterProp = 'label') {
  const Component = ({ value = '', onChange, ...props }) => {
    const { classes } = useGetFilterClasses();
    const options = useSelector(selector) || [];

    return (
      <FormControl
        className={clsx(classes.formControl, props.disabled && classes.disabled)}
        {...props}
      >
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
          {options.slice(0, 5).map(option => (
            <MenuItem key={option.code} value={option[filterProp]}>
              {option[filterProp]}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    );
  };
  Component.propTypes = FilterProps;
  return Component;
}

export function Factory({ children, ...props }) {}

export const FilterProps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  selector: PropTypes.func,
  disabled: PropTypes.bool,
  filterProp: PropTypes.string
};
