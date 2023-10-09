import React from 'react';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const DatePicker = ({ values, onChange }) =>

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker 
        disableToolbar 
        variant="inline" 
        inputVariant="outlined"
        format="MMM/dd/yyyy"
        name='myDate'
        value={values.myDate}
        onChange={date => onChange('myDate', date)}
        autoOk={true}
      />
    </MuiPickersUtilsProvider>

export default DatePicker;



