import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import chipData from '../utils/chipData';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'justifty-start',
        gap: '15px',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const Chips = ({ onClick, values }) => {
    const classes = useStyles();

    const handleClick = (subject) => {
        onClick(subject);
    };

    return (
        <div className={classes.root} style={{ paddingTop: '15px' }}>
            {chipData.map((chip, index) => (
                <Chip 
                    key={index}
                    avatar={<Avatar> {chip.label.at(0)} </Avatar>}
                    label={chip.label}
                    clickable
                    style={
                        values.taskSubject == chip.label
                        ? {backgroundColor: '#333996', color: 'white'} 
                        : {}
                    }
                    onClick={() => handleClick(chip.label)}
                    deleteIcon={<DoneIcon />}
                />
            ))}
        </div>
    );
};

export default Chips;