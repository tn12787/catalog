import React, { useRef } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdDragIndicator } from 'react-icons/md';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { BiPencil } from 'react-icons/bi';
import { rest } from 'lodash';

import { fields } from './fields';
import { TrackDndType } from './types';

import { ClientRelease, TrackResponse } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import useTrackMutations from 'hooks/data/tracks/useTrackMutations';
import CreateEditTrackForm from 'components/tracks/forms/TrackForm/CreateEditTrackForm';
import Dialog from 'components/Dialog';

type Props = {
  releaseData: ClientRelease;
  track: TrackResponse;
  index: number;
};

const TrackListItem = ({ releaseData, track, index }: Props) => {
  const { bodySub, bgSecondary } = useAppColors();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const [{ opacity }, drag, preview] = useDrag(() => ({
    type: TrackDndType.TRACK,
    item: () => {
      return { ...track, index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.8 : 1,
      isDragging: monitor.isDragging(),
      draggedItem: monitor.getItem(),
    }),
  }));

  const dropRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [isHovering, setIsHovering] = React.useState(false);

  const { updateTrackOrder, deleteSingleTrack } = useTrackMutations({ releaseId: track.releaseId });

  const [{ handlerId, isHoveringOver }, drop] = useDrop({
    accept: TrackDndType.TRACK,

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHoveringOver: monitor.isOver(),
      };
    },
    hover(item: TrackResponse, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
      const hoverBoundingHeight = hoverBoundingRect.bottom - hoverBoundingRect.top;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards, as soon as we cross the top of the item
      if (dragIndex < hoverIndex && hoverClientY < 0) {
        return;
      }

      // Dragging upwards, as soon as we cross the bottom
      if (dragIndex > hoverIndex && hoverClientY > hoverBoundingHeight) {
        return;
      }

      item.index = hoverIndex;
    },
    drop: (item, monitor) => {
      if (monitor.didDrop() || item.id === track.id) return;

      updateTrackOrder.mutate({
        id: item.id,
        newIndex: item.index,
        releaseId: item.releaseId,
      });
    },
  });

  drop(dropRef);

  const onDelete = async () => {
    await deleteSingleTrack.mutateAsync({ id: track.id });
    onDeleteClose();
  };

  return (
    <Box ref={dropRef} data-handler-id={handlerId} w="100%">
      <Flex
        direction={['column', 'column', 'row']}
        width={'100%'}
        justify="space-between"
        alignItems={['center', 'center', 'center']}
        ref={preview}
        fontSize="sm"
        py={1}
        opacity={opacity}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        borderTopWidth={3}
        borderTopColor={isHoveringOver ? 'auto' : 'transparent'}
        transition={'all 0.08s ease-out'}
      >
        <Flex opacity={isHovering ? 1 : 0} transition={'opacity 0.08s ease-out'} ref={drag}>
          <Icon cursor={'grab'} as={MdDragIndicator} color={bodySub} p={1} fontSize="3xl" />
        </Flex>
        <Text maxW="20px" w="100%">
          {index + 1}.
        </Text>
        {fields(track).map((field) => {
          return (
            <Flex
              width="100%"
              align={{ base: 'center', md: 'flex-start' }}
              direction={{ base: 'row', md: 'column' }}
              justify={{ base: 'space-between', md: 'center' }}
              key={field.name}
            >
              {field.content}
            </Flex>
          );
        })}
        <HStack>
          <Button
            leftIcon={<BiPencil></BiPencil>}
            minW="50px"
            opacity={isHovering ? 1 : 0}
            size="sm"
            variant="outline"
            onClick={onEditOpen}
          >
            Edit
          </Button>
          <Button
            minW="50px"
            opacity={isHovering ? 1 : 0}
            size="sm"
            variant="solid"
            colorScheme={'red'}
            onClick={onDeleteOpen}
          >
            Remove
          </Button>
        </HStack>
      </Flex>
      <Modal size="2xl" isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent p={3} bg={bgSecondary}>
          <ModalHeader>Edit track</ModalHeader>
          <ModalBody>
            <CreateEditTrackForm
              existingTrackId={track.id}
              releaseData={releaseData}
              onSubmitSuccess={onEditClose}
            />
          </ModalBody>
          <ModalCloseButton></ModalCloseButton>
        </ModalContent>
      </Modal>
      <Dialog
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={onDelete}
        leastDestructiveRef={cancelRef}
        loading={deleteSingleTrack.isLoading}
        title="Remove track?"
        message="Are you sure you want to delete this track? This action cannot be undone."
        buttons={
          <ButtonGroup>
            <Button ref={cancelRef} onClick={onDeleteClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              isLoading={deleteSingleTrack.isLoading}
              ml={3}
              onClick={onDelete}
            >
              Yes
            </Button>
          </ButtonGroup>
        }
        {...rest}
      />
    </Box>
  );
};

export default TrackListItem;
