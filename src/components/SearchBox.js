import React from 'react'
import { TextField } from '@material-ui/core';

const SearchBox = ({ name, label, value, error = null, onChange, ...other }) => 

        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
        
export default SearchBox;