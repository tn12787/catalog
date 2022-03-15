import { Modal, ModalCloseButton, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import React from 'react';
import { ReleaseTaskType } from '@prisma/client';

import { ClientRelease, TaskResponse } from 'types/common';
import TaskForm from 'components/releases/forms/TaskForm';
import useAppColors from 'hooks/useAppColors';

type Props = Omit<ModalProps, 'children'> & { task?: TaskResponse; release: ClientRelease };

const MarketingModal = ({ task, onClose, release, ...rest }: Props) => {
  const { bgSecondary } = useAppColors();

  return (
    <Modal onClose={onClose} size="2xl" {...rest}>
      <ModalOverlay />
      <ModalContent bg={bgSecondary} w="90%">
        <ModalCloseButton></ModalCloseButton>
        <TaskForm
          task={task}
          release={release as ClientRelease}
          onSubmitSuccess={() => onClose()}
          generic={!task || task.type === ReleaseTaskType.GENERIC}
        />
      </ModalContent>
    </Modal>
  );
};

export default React.memo(MarketingModal);
