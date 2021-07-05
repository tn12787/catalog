import { Button, ButtonProps } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

interface Props extends ButtonProps {
  href: string;
}

const BackButton = ({ href, ...rest }: Props) => {
  return (
    <Link href={href} passHref>
      <Button
        {...rest}
        variant="ghost"
        leftIcon={<FiArrowLeft />}
        outline="none"
        p={0}
        _hover={{ textDecoration: 'underline' }}
      >
        Back
      </Button>
    </Link>
  );
};

export default BackButton;
