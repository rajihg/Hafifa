import React, { useCallback, useState } from 'react'
import { makeStyles } from "@material-ui/core";
import useTaskLogic from './useTaskLogic';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        },
    }
}))

export function Form(props) {
    const classes = useStyles();

    const { children, ...other } = props;

    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

export function useForm(initialFValues) {
    const [values, setValues] = useState(initialFValues);

    const { addOrEdit } = useTaskLogic();

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    };

    const handleDateChange = useCallback((name, value) => {
        setValues({
            ...values,
            [name]: value
        })
    }, [values]);

    

    const resetForm = () => {
        setValues(initialFValues);
    }

    const handleSubmit = e => {
        addOrEdit(values);
        resetForm();
    }

    const onClick = (subject) => setValues({ ...values, taskSubject: subject });

    const handleLocationSelected = (location) => setValues(prevValues => ({ ...prevValues, taskLocation: location }));

    return {
        values,
        setValues,
        handleInputChange,
        handleDateChange,
        resetForm,
        handleSubmit,
        onClick,
        handleLocationSelected,
    }
};