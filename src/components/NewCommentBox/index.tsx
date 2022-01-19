import { Button, Heading, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import { NewCommentFormData } from './types';

import Card from 'components/Card';

interface Props {
  onSubmit: (data: NewCommentFormData) => void | Promise<void>;
  loading?: boolean;
}

const NewCommentBox = ({ onSubmit, loading }: Props) => {
  const { register, reset, handleSubmit } = useForm<NewCommentFormData>({});

  const onSubmitForm = async (data: NewCommentFormData) => {
    console.log(data);
    await onSubmit(data);
    reset();
  };

  return (
    <Card as="form" onSubmit={handleSubmit(onSubmitForm)}>
      <Heading size="sm">Write a comment</Heading>
      <Stack>
        <Textarea
          resize={'vertical'}
          noOfLines={100}
          placeholder="Type something..."
          {...register('text')}
        ></Textarea>
        <Button type="submit" isLoading={loading} alignSelf="flex-end" colorScheme={'purple'}>
          Submit
        </Button>
      </Stack>
    </Card>
  );
};

export default NewCommentBox;
