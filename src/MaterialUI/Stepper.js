import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from './VirtualizedTable'
import ScenarioPage from './ScenarioPage'

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
  },
  button: {
    marginRight: theme.spacing(1),
    float:"none"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));



function getSteps() {
  return ['Select Assignment Group', 'Select From Date', 'Select End Date'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Assignment Group which you want to track ...';
    case 1:
      return 'The date from which we need the data';
    case 2:
      return 'The date until we want to track';
    default:
      return 'Yay!! You are done';
  }
}

 function HorizontalLinearStepper(props) {

  const [showTable, setShowTable] = useState(false);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  function isStepOptional(step) {
    return false;
  }

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  function handleNext(activeStep) {
      console.log(activeStep)
    let newSkipped = skipped;
    
  
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);




  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleSkip() {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }
  
  function renderChildren(activeStep) {
    let children=[];
    for (var i=0; i <= activeStep; i++) {
      children.push(props.children[i])
    }
    children.reverse();
    console.log(children)
    return children.reverse();
  }
  

  function handleReset() {
    setActiveStep(0);
  }

  

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
     
     
     { 
        renderChildren(activeStep)
     }
    
   
   
    
        {activeStep === steps.length ? (
        
         <div>
<br />
            <Button  onClick={handleReset} className={classes.button}>
              Reset
            </Button>
            </div>
       
        ) : (
          <div>
          
            <div>
              <br />
          
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
{activeStep === steps.length - 1 ? 

<Button
  variant="contained"
  color="secondary"
  onClick={() => setShowTable(true)}
  className={classes.button}
> Finish  </Button> :


<Button
  variant="contained"
  color="primary"
  onClick={()=>handleNext(activeStep)}
  className={classes.button}
> Next  </Button>}


            </div>
            
            {showTable ? <div>
            <ScenarioPage Assignment_group={props.Assignment_group}/> </div>
            // <Table assignment_group={props.Assignment_group} fromDate={props.fromDate} toDate={props.toDate}/>
            : null}
        
        </div>
        )}

<div>


</div>

      </div>

    
  
  );
}

export default HorizontalLinearStepper;