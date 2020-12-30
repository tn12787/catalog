import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Nav from 'components/Nav';
import Account from 'pages/Accounts';
import { appLinks } from 'appLinks';
import Releases from 'pages/Releases';

const App = () => {
  return (
    <Router>
      <Flex minH="100vh">
        <Nav links={appLinks} />
        <Switch>
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
