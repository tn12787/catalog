import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  titleTemplate?: string;
  description?: string;
  image?: string;
}

const PageHead = ({
  title,
  titleTemplate = ' | Catalog',
  description = 'First-rate tools for managing music releases.',
  image = `https://firebasestorage.googleapis.com/v0/b/launchday-mvp.appspot.com/o/admin%2Fog_image.png?alt=media&token=1d7142f6-ec52-4107-92e0-e276a3708891`,
}: Props) => {
  const derivedTitle = `${title}${titleTemplate}`;
  const router = useRouter();
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <title key="title">{derivedTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={router.asPath} key="ogurl" />
      <meta property="og:image" content={image} key="ogimage" />
      <meta property="og:image:url" content={image} />
      <meta property="og:image:width" content={'1200'} key="ogimagewidth" />
      <meta property="og:image:height" content={'630'} key="ogimageheight" />
      <meta property="og:site_name" content={'Catalog'} key="ogsitename" />
      <meta property="og:title" content={derivedTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:type" content="website" />

      <meta property="twitter:image" content="image" key="twitterImage" />
    </Head>
  );
};

export default PageHead;
