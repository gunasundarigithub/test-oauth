import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(5),
    width: 200,
    marginTop: 0.25,
   
  }
 
}));


export default function TextFields(props) {
  const classes = useStyles();
  
 


  return (

    <TextField
    id={props.id}
    label={props.label}
    className={classes.textField}
    value={props.value}
    onChange={props.changed}
    margin="normal"
  />
      
  
  );
}