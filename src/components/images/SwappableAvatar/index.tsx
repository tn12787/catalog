import { Avatar, AvatarProps, Box, HStack, Icon, Input, Stack } from '@chakra-ui/react';
import React, { ChangeEventHandler } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { FiEdit } from 'react-icons/fi';

type Props = AvatarProps & {
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const SwappableAvatar = ({ onChange, ...rest }: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
  });

  return (
    <HStack {...getRootProps()}>
      <Avatar {...rest}></Avatar>
      <HStack {...getInputProps({ onChange })}>
        <Icon as={FiEdit} cursor={'pointer'} fontSize="sm"></Icon>
      </HStack>
    </HStack>
  );
};

export default SwappableAvatar;
