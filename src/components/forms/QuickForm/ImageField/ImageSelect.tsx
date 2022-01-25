import { Flex, Spinner, Stack, useToast } from '@chakra-ui/react';
import React from 'react';

import ImageDropper from 'components/ImageDropper';
import { uploadImageToFirebase } from 'queries/artwork';
import useAppColors from 'hooks/useAppColors';

type Props = {
  value: string;
  onChange: (value: string) => void | Promise<void>;
};

const ImageSelect = ({ value, onChange }: Props) => {
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
    const url: string = await uploadImageToFirebase(image as File);
    setUploading(false);
    onChange(url);
  };

  return (
    <Stack alignItems={'flex-start'} spacing={0} p={2} position="relative" minW={'300px'} w="100%">
      <ImageDropper
        onChange={(e) => uploadImage(e.target.files?.[0] as File)}
        accept={'image/jpeg, image/png'}
        message="Click to upload an image"
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
