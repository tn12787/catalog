import fs from 'fs';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';

import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Stack } from '@chakra-ui/react';

import MarketingLayout from 'components/layouts/MarketingLayout';
import { getParsedFileContentBySlug } from 'utils/legal';
import { theme } from 'theme/customTheme';

type Props = ParsedUrlQuery & {
  slug: string;
};

type LegalPageProps = {
  content: string;
};

const StaticLegalPage = ({ content }: LegalPageProps) => {
  return (
    <Stack
      pt={'150px'}
      pb={'50px'}
      alignSelf="center"
      maxW={'container.lg'}
      w="90%"
      spacing={'30px'}
      textAlign={'justify'}
    >
      <ReactMarkdown components={ChakraUIRenderer(theme)} skipHtml>
        {content}
      </ReactMarkdown>
    </Stack>
  );
};

StaticLegalPage.getLayout = () => MarketingLayout;

const LEGAL_PATH = join(process.cwd(), 'src', 'legal');

export const getStaticProps: GetStaticProps<LegalPageProps> = async ({ params }) => {
  // read markdown file into content and frontmatter
  const articleMarkdownContent = getParsedFileContentBySlug(params?.slug as string, LEGAL_PATH);

  return {
    props: {
      content: articleMarkdownContent.toString(),
    },
  };
};

export const getStaticPaths: GetStaticPaths<Props> = async () => {
  const paths = fs
    .readdirSync(LEGAL_PATH)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.md$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default StaticLegalPage;
