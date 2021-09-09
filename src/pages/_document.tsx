/* eslint-disable @next/next/no-document-import-in-page */
import { theme, ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href={`${process.env.PUBLIC_URL}/favicon.ico`} />
          <meta name="theme-color" content="#000000" />
          <script src="https://apis.google.com/js/api.js" async />
          <link
            rel="apple-touch-icon"
            href={`${process.env.PUBLIC_URL}/logo192.png`}
          />
          <link
            rel="manifest"
            href={`${process.env.PUBLIC_URL}/manifest.json`}
          />
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </Head>

        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
