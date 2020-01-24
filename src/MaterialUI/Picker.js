import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    
  },
  textField: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: 200,

  },
}));



export default function DatePickers(props) {
  const classes = useStyles();

  return (
      
      <TextField
        id={props.id}
        label={props.label}
        type="date"
        defaultValue="2019-05-24"
        className={classes.textField}
        onChange={props.changed}
       // checkValidation={props.changed}
        InputLabelProps={{
          shrink: true,
        }}
      />
     
     
    
  );
}
