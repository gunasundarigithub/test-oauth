import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";

import AppBar from "./MaterialUI/AppBar";
import LoginLogout from "./components/LoginLogout";
import Home from "./Home";
import Login from "./components/Login";

import "./App.css";

function onAuthRequired({ history }) {
  history.push("/login");
}


class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer="https://dev-998150.okta.com/oauth2/default"
          client_id="0oaq2o4b0NFMFrPo5356"
          redirect_uri={window.location.origin + "/implicit/callback"}
          onAuthRequired={onAuthRequired}
        >
          <Route path="/" exact={true} component={LoginLogout} />
          <SecureRoute path="/home" component={Home} />
          <Route
            path="/login"
            render={() => <Login baseUrl="https://dev-998150.okta.com" />}
          />
          <Route path="/implicit/callback" component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

export default App;
