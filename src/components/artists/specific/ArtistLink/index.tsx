import { HStack, LinkBox, LinkOverlay } from '@chakra-ui/react';
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

type Props = {
  icon?: React.ReactElement;
  href?: string;
  iconOnly?: boolean;
  children?: React.ReactNode;
};

const ArtistLink: React.FC<Props> = ({ icon, href, iconOnly, children }) => {
  return (
    <LinkBox as={HStack}>
      <LinkOverlay
        _hover={{ textDecoration: 'underline' }}
        fontWeight={'medium'}
        isExternal
        href={href}
      >
        {icon}
      </LinkOverlay>
      {!iconOnly && (
        <>
          <LinkOverlay
            _hover={{ textDecoration: 'underline' }}
            fontWeight={'medium'}
            isExternal
            href={href}
          >
            {children}
          </LinkOverlay>
          <FiExternalLink></FiExternalLink>
        </>
      )}
    </LinkBox>
  );
};

export default ArtistLink;
