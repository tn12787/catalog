import { Flex, Spinner, Stack, StackProps, useToast } from '@chakra-ui/react';
import React from 'react';

import ImageDropper from 'components/images/ImageDropper';
import { uploadImageToFirebase } from 'queries/artwork';
import useAppColors from 'hooks/useAppColors';

type Props = Omit<StackProps, 'onChange'> & {
  onChange: (value: string) => void | Promise<void>;
  message?: string;
  filePath?: string;
  entityId?: string;
};

const ImageSelect = ({
  onChange,
  filePath,
  entityId,
  message = 'Click to upload an image',
  ...rest
}: Props) => {
  const [uploading, setUploading] = React.useState(false);
  const { bgPrimary } = useAppColors();
  const toast = useToast();

  const uploadImage = async (image: File) => {
    if (image.size > 5000000) {
      if (!toast.isActive('file-too-large')) {
        toast({
          id: 'file-too-large',
          status: 'error',
          title: 'Image too large',
          description: 'Please upload an image less than 5MB',
        });
      }
      return;
    }

    setUploading(true);
    const url: string = await uploadImageToFirebase(image as File, entityId, filePath);
    setUploading(false);
    onChange(url);
  };

  return (
    <Stack alignItems={'flex-start'} spacing={0} position="relative" w="100%" {...rest}>
      <ImageDropper
        onChange={(e) => uploadImage(e.target.files?.[0] as File)}
        accept={'image/jpeg, image/png'}
        message={message}
      />
      {uploading && (
        <Flex
          position={'absolute'}
          top={0}
          bottom={0}
          right={0}
          left={0}
          justifyContent={'center'}
          alignItems={'center'}
          w="100%"
          h="100%"
          bg={bgPrimary}
          opacity={0.7}
        >
          <Spinner isLoading={uploading} />
        </Flex>
      )}
    </Stack>
  );
};

export default ImageSelect;
