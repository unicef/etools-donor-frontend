import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function VendorFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Vendor"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        label="Vendor"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

VendorFilter.propTypes = FilterProps;
