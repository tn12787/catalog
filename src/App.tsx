import React from 'react';
import Home from 'pages/Home';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </Router>
  );
};

export default App;
