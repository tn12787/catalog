import Head from 'next/head';
import React from 'react';

interface Props {
  title: string;
}

const PageHead = ({ title }: Props) => {
  return (
    <Head>
      <title key="title">{`${title} | LaunchDay`}</title>
    </Head>
  );
};

export default PageHead;
