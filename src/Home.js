import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Container from "./MaterialUI/Container";
import AppBar from "./MaterialUI/AppBar";
import Stepper from "./MaterialUI/Stepper";
import TextField from "./MaterialUI/TextInput";
import Picker from "./MaterialUI/Picker";

class App extends Component {
  state = {
    Assignment_group: "",
    from_date : '',
    to_date : ''
  };
  handleChange = event => {
    this.setState({ Assignment_group: event.target.value });
    console.log(this.state.Assignment_group)
  };

  handleFromDateChange = event => {
    this.setState({ from_date: event.target.value });
  }

  handleFromToChange = event => {
    this.setState({ to_date: event.target.value });
  }

 
  
  render() {
    return (
      <Container maxWidth="xl">
        <AppBar logout1={this.props.logout}>
          <Stepper Assignment_group={this.state.Assignment_group} fromDate={this.state.from_date} toDate={this.state.to_date}>
            <TextField
              id={"Assignment_group"}
              label="Assignment_Group"
              value={this.state.Assignment_group}
              changed={event => this.handleChange(event)}
            />
            <Picker id="FromDate" label="From Date"   changed={event => this.handleFromDateChange(event)}  value={this.state.from_date} />
            <Picker id="ToDate" label="To Date"     changed={event => this.handleFromToChange(event)} value={this.state.to_date} />
          </Stepper>
        </AppBar>
      </Container>
    );
  }
}

export default App;