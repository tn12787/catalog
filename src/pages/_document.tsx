import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href={`${process.env.PUBLIC_URL}/favicon.ico`} />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <script src="https://apis.google.com/js/api.js" />
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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
