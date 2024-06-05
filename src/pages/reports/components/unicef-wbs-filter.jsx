import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useGetFilterClasses } from 'styles/filter-styles';
import { FilterProps } from '../lib/dropdown-filter-factory';

export default function UNICEFWBSFilter({ value = '', onChange, ...props }) {
  const classes = useGetFilterClasses();

  return (
    <FormControl className={classes.formControl} {...props}>
      <TextField
        placeholder="UNICEF WBS"
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        label="UNICEF WBS"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}

UNICEFWBSFilter.propTypes = FilterProps;
