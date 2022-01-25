import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

import QuickFormField from '../QuickFormField';

import UrlSelect from './UrlSelect';

import useAppColors from 'hooks/useAppColors';

type Props = {
  url?: string;
  onChange: (value: string) => void | Promise<void>;
};

const UrlField = ({ url, onChange }: Props) => {
  const { bodySub, primary } = useAppColors();
  return (
    <QuickFormField
      fieldName="url"
      value={url as string}
      renderValue={({ value }) => (
        <Box fontSize="sm">
          {value ? (
            <Link color={primary} isExternal href={value}>
              {value}
            </Link>
          ) : (
            <Text fontSize="xs" color={bodySub}>
              {'No URL specified'}
            </Text>
          )}
        </Box>
      )}
      onSubmit={onChange}
      renderEditing={UrlSelect}
    />
  );
};

export default UrlField;
