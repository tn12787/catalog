import { Heading, HeadingProps } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

type Props = HeadingProps;

const PageTitle = forwardRef<HTMLHeadingElement, Props>((props, ref) => {
  return (
    <Heading
      as="h1"
      ref={ref}
      size="2xl"
      fontWeight="black"
      alignSelf="flex-start"
      py={3}
      {...props}
    />
  );
});

PageTitle.displayName = 'PageTitle';

export default PageTitle;
