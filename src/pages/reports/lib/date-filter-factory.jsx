import React, { useState, useEffect } from 'react';
import { useGetFilterClasses } from 'styles/filter-styles';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { format, parse, startOfYear, endOfYear } from 'date-fns';
import { FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { FilterProps } from './dropdown-filter-factory';
import { getColorTheme } from 'styles/theme';
import { DATE_FORMAT, DISPLAY_FORMAT } from '../constants';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: getColorTheme()
  }
});

export default function DateFilterFactory(label) {
  function DateFilter({ value, onChange }) {
    const { classes } = useGetFilterClasses();
    const [date, setDate] = useState(new Date());
    const maxDate = endOfYear(new Date());
    useEffect(() => {
      const newDate = value ? parse(value, DATE_FORMAT, new Date()) : null;
      setDate(newDate);
    }, [value]);

    const handleDateChange = date => {
      const newValue = date ? format(date, DATE_FORMAT) : null;
      onChange({ target: { value: newValue } });
    };

    return (
      <FormControl className={classes.formControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={defaultMaterialTheme}>
            <DatePicker
              // disableToolbar
              autoOk
              className={classes.textField}
              clearable
              // variant="inline"
              margin="none"
              maxDate={maxDate}
              id="grant-from"
              format={DISPLAY_FORMAT}
              label={label}
              value={date}
              onChange={handleDateChange}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </FormControl>
    );
  }

  DateFilter.propTypes = FilterProps;
  return DateFilter;
}
