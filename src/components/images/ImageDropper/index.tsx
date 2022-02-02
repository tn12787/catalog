import { Input } from '@chakra-ui/input';
import { Stack, StackProps, Text } from '@chakra-ui/layout';
import { ChangeEventHandler } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import useAppColors from 'hooks/useAppColors';

type ImageDropzoneProps = DropzoneOptions & {
  onChange: ChangeEventHandler<HTMLInputElement>;
  message?: string;
  containerProps?: StackProps;
};

const ImageDropper = ({
  onChange,
  message = 'Drop an image or click here...',
  containerProps = {},
  ...rest
}: ImageDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    ...rest,
  });

  const { bodySub } = useAppColors();

  return (
    <Stack
      {...getRootProps()}
      borderStyle="dashed"
      borderWidth={'1px'}
      flex={1}
      borderRadius="md"
      alignItems="center"
      cursor="pointer"
      justifyContent="center"
      p={2}
      w="100%"
      {...containerProps}
    >
      <Text color={bodySub}>{message}</Text>
      <Input {...getInputProps({ onChange })} accept={'image/jpeg, image/png'} />
    </Stack>
  );
};

export default ImageDropper;
