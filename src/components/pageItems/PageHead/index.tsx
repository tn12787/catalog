import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import og_image from 'images/og_image.png';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const PageHead = ({
  title,
  description = 'First-rate tools for managing music releases.',
  image = og_image,
}: Props) => {
  const titleTemplate = `${title} | Catalog`;
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

      <title key="title">{titleTemplate}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={router.asPath} key="ogurl" />
      <meta property="og:image" content={image} key="ogimage" />
      <meta property="og:site_name" content={'Catalog'} key="ogsitename" />
      <meta property="og:title" content={titleTemplate} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
    </Head>
  );
};

export default PageHead;
