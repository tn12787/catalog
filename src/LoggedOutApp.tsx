import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

const LoggedOutApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <div>login</div>
        </Route>
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default LoggedOutApp;
