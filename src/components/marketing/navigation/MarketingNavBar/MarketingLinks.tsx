import { HStack, Link, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { MarketingNavLink } from './types';

import useAppColors from 'hooks/useAppColors';

type Props = { links: MarketingNavLink[] };

const MarketingLinks = ({ links }: Props) => {
  const { primary, bodyText } = useAppColors();
  const router = useRouter();
  return (
    <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: 4, lg: 8 }}>
      {links.map(({ label, href, rightContent }) => (
        <HStack key={href}>
          <NextLink href={href} passHref>
            <Link
              textAlign={{ base: 'center', lg: 'left' }}
              color={router.pathname.match(new RegExp(`^${href}$`)) ? primary : bodyText}
              fontSize={'sm'}
              fontWeight="semibold"
            >
              {label}
            </Link>
          </NextLink>
          {rightContent}
        </HStack>
      ))}
    </Stack>
  );
};

export default MarketingLinks;
