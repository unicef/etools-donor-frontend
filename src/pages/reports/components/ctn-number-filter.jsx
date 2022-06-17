import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function CTNNumberFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="CTN Number"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        label="CTN Number"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

CTNNumberFilter.propTypes = FilterProps;
