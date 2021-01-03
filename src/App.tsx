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
import SpecificRelease from 'pages/releases/SpecificRelease';

const App = () => {
  return (
    <Router>
      <Flex minH="100vh">
        <Nav links={appLinks} />
        <Flex width="100%" ml={[0, 0, "200px"]} overflowY="auto">
          <Switch>
            <Route path="/releases/new">
              <NewRelease />
            </Route>
            <Route path="/releases/:releaseId">
              <SpecificRelease />
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
      </Flex>
    </Router>
  );
};

export default App;
