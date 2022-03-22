import { HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import useAppColors from 'hooks/useAppColors';

type Props = { links: { label: string; href: string }[] };

const MarketingLinks = ({ links }: Props) => {
  const { primary, bodyText } = useAppColors();
  const router = useRouter();
  return (
    <HStack display={{ base: 'none', md: 'flex' }} spacing={8}>
      {links.map(({ label, href }) => (
        <NextLink href={href} passHref key={href}>
          <Link
            color={router.pathname.match(new RegExp(`^${href}$`)) ? primary : bodyText}
            fontSize={'sm'}
            fontWeight="semibold"
          >
            {label}
          </Link>
        </NextLink>
      ))}
    </HStack>
  );
};

export default MarketingLinks;
