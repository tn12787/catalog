import Login from 'pages/auth/login';
import SignUp from 'pages/auth/signup';
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
