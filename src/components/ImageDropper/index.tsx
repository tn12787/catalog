import { Input } from '@chakra-ui/input';
import { Stack, Text } from '@chakra-ui/layout';
import { ChangeEventHandler } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import useAppColors from 'hooks/useAppColors';

type ImageDropzoneProps = DropzoneOptions & {
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const ImageDropzone = ({ onChange, ...rest }: ImageDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    ...rest,
  });

  const { bodySub } = useAppColors();

  return (
    <Stack
      {...getRootProps()}
      borderStyle="dashed"
      borderWidth={'1px'}
      minH="200px"
      borderRadius="md"
      alignItems="center"
      cursor="pointer"
      justifyContent="center"
    >
      <Text color={bodySub}>Drop an image or click here...</Text>
      <Input {...getInputProps({ onChange })} accept={'image/jpeg, image/png'} />
    </Stack>
  );
};

export default ImageDropzone;
