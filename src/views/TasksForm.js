import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import DatePicker from '../components/DatePicker';
import { useForm, Form } from '../hooks/useForm';
import Button from '../components/Button';
import Priority from '../components/Priority'
import Subject from '../components/Subject';
import initialValues from '../utils/taskInitialValues';
import TextInput from '../components/TextInput';
import useTaskLogic from '../hooks/useTaskLogic';
import DisplayMap from '../components/DisplayMap';

const TasksForm = ({ taskForEdit, edit, openPopup }) => {
    const {
        values,
        setValues,
        handleInputChange,
        handleDateChange,
        resetForm,
        handleSubmit,
        onClick,
        handleLocationSelected,
    } = useForm(initialValues);

    const {
        tasks
    } = useTaskLogic();

    useEffect(() => {
        if (taskForEdit != null)
            setValues({
                ...taskForEdit
            })
    }, [taskForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextInput
                        values={values}
                        onChange={handleInputChange}
                    />
                    <DatePicker
                        values={values}
                        onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Priority
                        values={values}
                        onChange={handleInputChange}
                    />
                    <Subject
                        onClick={onClick}
                        values={values}
                    />
                </Grid>
                
                <DisplayMap 
                    onLocationSelected={handleLocationSelected} 
                    tasks={tasks} 
                    openPopup={openPopup}
                />
                
                <div>
                    {
                        edit ? (
                            <Button text="Edit" type="submit" />
                        )
                            : (<Button text="Create" type="submit" />)
                    }

                    <Button text='Reset' color='default' onClick={resetForm} />
                </div>
            </Grid>
        </Form>
    )
};

export default TasksForm;