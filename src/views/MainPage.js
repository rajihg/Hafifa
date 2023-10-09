import React from 'react'
import TasksForm from './TasksForm'
import Popup from '../components/Popup';
import { Paper, makeStyles, Toolbar, InputAdornment } from '@material-ui/core';
import Button from '../components/Button';
import { Search } from "@material-ui/icons";
import SearchBox from '../components/SearchBox';
import AddIcon from '@material-ui/icons/Add';
import PageHeader from '../components/PageHeader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TaskCard from '../components/TaskCard';
import DisplayMap from '../components/DisplayMap';
import useTaskLogic from '../hooks/useTaskLogic';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    cardWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '15px',
        marginLeft: '38px'
    },
}))

const MainPage = () => {
    const classes = useStyles();

    const {
        addOrEdit,
        deleteTask,
        onCompleteChange,
        handleSearch,
        openInPopup,
        tasks,
        openPopup,
        setOpenPopup,
        taskForEdit,
        setTaskForEdit,
        edit,
        setEdit,
    } = useTaskLogic();

    return (
        <>
            <PageHeader
                title='Todo List'
                subTitle='Your way to complete tasks easily'
                icon={<AssignmentIcon fontSize='large' />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <SearchBox
                        label='Search Tasks'
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Button
                        text="Add Task"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {
                            setOpenPopup(true);
                            setTaskForEdit(null);
                            setEdit(false);
                        }}
                    />
                </Toolbar>
            </Paper >
            <div className={classes.cardWrapper}>
                {
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={deleteTask}
                            onEdit={openInPopup}
                            onCompleteChange={onCompleteChange}
                        />
                    ))
                }
            </div>
            <div>
                <DisplayMap tasks={tasks}/>
            </div>

            <Popup
                title='New Task Form'
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <TasksForm
                    taskForEdit={taskForEdit}
                    addOrEdit={addOrEdit}
                    edit={edit}
                    openPopup={openPopup}
                />
            </Popup>
        </>
    )
}

export default MainPage;