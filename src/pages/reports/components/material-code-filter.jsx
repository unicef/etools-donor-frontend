import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function MaterialCodeFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Material Code"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        label="Material Code"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

MaterialCodeFilter.propTypes = FilterProps;
