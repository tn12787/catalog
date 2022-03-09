import { HStack, LinkBox, LinkOverlay } from '@chakra-ui/react';
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

type Props = { icon?: React.ReactElement; href?: string };

const ArtistLink: React.FC<Props> = ({ icon, href, children }) => {
  return (
    <LinkBox as={HStack}>
      {icon}
      <LinkOverlay
        _hover={{ textDecoration: 'underline' }}
        fontWeight={'medium'}
        isExternal
        href={href}
      >
        {children}
      </LinkOverlay>
      <FiExternalLink></FiExternalLink>
    </LinkBox>
  );
};

export default ArtistLink;
