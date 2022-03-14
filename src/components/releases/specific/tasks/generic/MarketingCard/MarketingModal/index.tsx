import { Modal, ModalCloseButton, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import React from 'react';

import { ClientRelease, TaskResponse } from 'types/common';
import TaskForm from 'components/releases/forms/TaskForm';

type Props = Omit<ModalProps, 'children'> & { task?: TaskResponse; release: ClientRelease };

const MarketingModal = ({ task, onClose, release, ...rest }: Props) => {
  return (
    <Modal onClose={onClose} closeOnOverlayClick={false} size="2xl" {...rest}>
      <ModalOverlay />
      <ModalContent w="90%">
        <ModalCloseButton></ModalCloseButton>
        <TaskForm
          task={task}
          release={release as ClientRelease}
          onSubmitSuccess={() => onClose()}
        />
      </ModalContent>
    </Modal>
  );
};

export default MarketingModal;
