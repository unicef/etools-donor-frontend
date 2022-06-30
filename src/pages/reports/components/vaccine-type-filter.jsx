import React from 'react';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FormControl, TextField } from '@material-ui/core';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function VaccineTypeFilter({ value = '', onChange, ...props }) {
  const { classes } = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="Vaccine Type"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        label="Vaccine Type"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

VaccineTypeFilter.propTypes = FilterProps;
