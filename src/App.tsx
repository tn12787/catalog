import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Nav from 'components/Nav';
import Account from 'pages/Account';
import { appLinks } from 'appLinks';
import Releases from 'pages/releases/AllReleases';
import NewRelease from 'pages/releases/NewRelease';

const App = () => {
  return (
    <Router>
      <Flex minH="100vh">
        <Nav links={appLinks} />
        <Switch>
          <Route exact path="/releases/new">
            <NewRelease />
          </Route>
          <Route path="/releases">
            <Releases />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Redirect to="/releases" />
        </Switch>
      </Flex>
    </Router>
  );
};

export default App;
