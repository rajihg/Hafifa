import React from 'react'
import TextField from '@material-ui/core/TextField';

const TextInput = ({ values, onChange }) =>
  <TextField
    name='taskName'
    label="TaskName"
    placeholder="Enter Your Task"
    multiline
    variant="outlined"
    value={values.taskName}
    onChange={(textInput) => {
      onChange(textInput)
    }
    }
  />

export default TextInput;
