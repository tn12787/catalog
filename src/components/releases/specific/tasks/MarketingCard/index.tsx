import {
  Stack,
  Heading,
  Button,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import React from 'react';
import { RiAddFill } from 'react-icons/ri';
import { rest } from 'msw';

import Card from 'components/Card';
import { ClientRelease } from 'types/common';
import TaskForm from 'components/releases/forms/TaskForm';

type Props = { releaseData: ClientRelease };

const MarketingCard = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card spacing={4}>
      <Stack justify={'space-between'} direction={{ base: 'column', md: 'row' }}>
        <Heading fontWeight="semibold" fontSize="2xl">
          Marketing & Promotion
        </Heading>
        <Button
          onClick={onOpen}
          variant="outline"
          leftIcon={<RiAddFill fontSize="1.25em" />}
          size="sm"
        >
          Add a task
        </Button>
      </Stack>
      <Stack w="100%" spacing={4} direction={{ base: 'column', lg: 'row' }}></Stack>
      <Modal closeOnOverlayClick={false} onClose={onClose} size="5xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalCloseButton></ModalCloseButton>
          <TaskForm release={releaseData} onSubmitSuccess={() => onClose()} />
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default MarketingCard;
