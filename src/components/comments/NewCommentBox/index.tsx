import { Heading } from '@chakra-ui/react';
import React from 'react';

import CommentInput from '../CommentInput';

import { NewCommentFormData } from './types';

import Card from 'components/Card';

interface Props {
  onSubmit: (data: NewCommentFormData) => void | Promise<void>;
  loading?: boolean;
}

const NewCommentBox = ({ onSubmit, loading }: Props) => {
  return (
    <Card>
      <Heading size="sm">Write a comment</Heading>
      <CommentInput onSubmit={onSubmit} loading={loading} />
    </Card>
  );
};

export default NewCommentBox;
