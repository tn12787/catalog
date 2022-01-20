import { Stack, Textarea, Button, TextareaProps, HStack, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { NewCommentFormData } from '../NewCommentBox/types';

interface Props extends Omit<TextareaProps, 'onSubmit'> {
  onSubmit: (data: NewCommentFormData) => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

const CommentInput = ({ onSubmit, onCancel, loading, ...rest }: Props) => {
  const { register, reset, handleSubmit } = useForm<NewCommentFormData>({});

  const onSubmitForm = async (data: NewCommentFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmitForm)}>
      <Textarea
        resize={'vertical'}
        noOfLines={100}
        placeholder="Type something..."
        {...register('text')}
        {...rest}
      ></Textarea>
      <ButtonGroup size="sm" spacing="2" alignSelf="flex-end">
        <Button type="submit" isLoading={loading} colorScheme={'purple'}>
          Submit
        </Button>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
      </ButtonGroup>
    </Stack>
  );
};

export default CommentInput;
