import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

import QuickFormField from '../QuickFormField';

import ImageSelect from './ImageSelect';

import useAppColors from 'hooks/useAppColors';

type Props = {
  url?: string;
  onChange: (value: string) => void | Promise<void>;
};

const ImageField = ({ url, onChange }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <QuickFormField
      fieldName="Artwork"
      value={url as string}
      renderValue={({ value }) => (
        <Box fontSize="sm">
          {value ? (
            <Image borderRadius="md" src={value} alt="artwork" />
          ) : (
            <Text fontSize="xs" color={bodySub}>
              {'No Image specified'}
            </Text>
          )}
        </Box>
      )}
      onSubmit={onChange}
      renderEditing={(props) => <ImageSelect {...props} filePath="artwork" />}
    />
  );
};

export default ImageField;
