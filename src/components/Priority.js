import React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const CustomizedRatings = ({ values, onChange }) => 

    <>
      <Box component="fieldset" mb={3} borderColor="transparent" >
        <Typography component="legend">Priority</Typography>
        <Rating
          name='myPriority'
          value={values.myPriority}
          onChange= {(rating) => onChange(rating)}
          defaultValue={2} max={10} />
      </Box>
    </>

export default CustomizedRatings;

