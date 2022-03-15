import {
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { IEmojiData } from 'emoji-picker-react';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import dynamic from 'next/dynamic';
import { BiX } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

type Props = Pick<ControllerRenderProps, 'onChange'> & {
  value: {
    text: string;
    emoji: string;
  };
};

const EmojiInput = ({ onChange, value, ...props }: Props) => {
  const { bodySub } = useAppColors();

  const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    onChange({
      target: { value: { ...value, emoji: emojiObject.emoji } },
    });
    onClose();
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      target: { value: { ...value, text: e.target.value } },
    });
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <InputGroup>
      <InputLeftAddon>
        <Popover isOpen={isOpen} onClose={onClose}>
          <PopoverTrigger>
            <HStack spacing={0}>
              <IconButton
                onClick={onOpen}
                fontSize="xl"
                color={bodySub}
                icon={
                  value.emoji ? (
                    <Text>{value.emoji}</Text>
                  ) : (
                    <Icon as={MdOutlineEmojiEmotions}></Icon>
                  )
                }
                aria-label="selected emoji"
              ></IconButton>
              {value.emoji && (
                <IconButton
                  onClick={() => {
                    onChange({
                      target: { value: { text: value.text } },
                    });
                  }}
                  size="20"
                  p={0}
                  color={bodySub}
                  icon={<Icon as={BiX}></Icon>}
                  aria-label="remove selected emoji"
                ></IconButton>
              )}
            </HStack>
          </PopoverTrigger>
          <PopoverContent w="auto" border="none">
            <PopoverArrow></PopoverArrow>
            <EmojiPicker native onEmojiClick={onEmojiClick} />
          </PopoverContent>
        </Popover>
      </InputLeftAddon>
      <Input {...props} value={value.text} onChange={onValueChange}></Input>
    </InputGroup>
  );
};

export default EmojiInput;
