import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(4),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(10),


  },
  input: {
    display: 'none',
  },
}));

export default function ContainedButtons(props) {
  const classes = useStyles();

  return (
   <Button variant="contained" color={props.colour} className={classes.button}  onClick={props.clicked} >
        {props.children}
      </Button>
    
  );
}