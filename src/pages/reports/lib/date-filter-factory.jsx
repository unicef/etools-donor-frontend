import React, { useState, useEffect } from 'react';
import { useGetFilterClasses } from 'styles/filter-styles';
import { format, parse } from 'date-fns';
import { FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { FilterProps } from './filters-factory';

export const DATE_FORMAT = 'yyyy-mm-dd';
export const DISPLAY_FORMAT = 'yyyy-MMM-dd';

export default function DateFilterFactory(label) {
  function DateFilter({ value, onChange }) {
    const { classes } = useGetFilterClasses();
    const [date, setDate] = useState(new Date());

    useEffect(() => {
      if (value) {
        setDate(parse(value, DATE_FORMAT, new Date()));
      }
    }, [value]);

    const handleDateChange = date => {
      onChange({ target: { value: format(date, DATE_FORMAT) } });
    };

    return (
      <FormControl className={classes.formControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            className={classes.textField}
            variant="inline"
            margin="none"
            id="grant-from"
            format={DISPLAY_FORMAT}
            label={label}
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    );
  }

  DateFilter.propTypes = FilterProps;
  return DateFilter;
}
