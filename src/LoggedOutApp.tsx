import Login from 'pages/Login';
import SignUp from 'pages/Signup';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

const LoggedOutApp = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    </>
  );
};

export default LoggedOutApp;
