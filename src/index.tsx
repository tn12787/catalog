import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import Root from './Root';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from 'firebase-details';
import { appTheme } from 'customTheme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={appTheme}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Root />
      </FirebaseAppProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
