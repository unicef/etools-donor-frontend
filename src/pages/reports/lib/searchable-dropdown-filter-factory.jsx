import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { prop, propEq, propOr } from 'ramda';

import { useSelector } from 'react-redux';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    '&> :first-child': {
      margin: 0
    }
  }
});

export default function SearchableDropdownFilterFactory(selector, label, filterProp = 'label') {
  const Component = ({ value = '', onChange, ...props }) => {
    const { classes } = useGetFilterClasses();
    const options = useSelector(selector) || [];
    const [dropdownValue, setDropdownValue] = useState(null);
    const classes2 = useStyles();

    useEffect(() => {
      const val = options.find(propEq(filterProp, value));
      setDropdownValue(val);
    }, [value, options]);

    return (
      <FormControl className={classes.formControl} {...props}>
        <Autocomplete
          options={options}
          getOptionLabel={prop(filterProp)}
          value={dropdownValue}
          onChange={(event, newValue) => {
            onChange(propOr('', filterProp, newValue));
          }}
          classes={classes2}
          renderInput={params => <TextField {...params} label={label} margin="normal" fullWidth />}
        />
      </FormControl>
    );
  };
  Component.propTypes = FilterProps;
  return Component;
}

export const FilterProps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  selector: PropTypes.func,
  disabled: PropTypes.bool,
  filterProp: PropTypes.string
};
