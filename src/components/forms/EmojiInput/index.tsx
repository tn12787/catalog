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
import React, { ChangeEvent, useMemo } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { IEmojiData } from 'emoji-picker-react';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import dynamic from 'next/dynamic';
import { BiX } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const emojiRegex =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]) (.*)/;

type Props = Pick<ControllerRenderProps, 'onChange'> & {
  value: string;
};

const EmojiInput = ({ onChange, value, ...props }: Props) => {
  const { bodySub } = useAppColors();

  const [emoji, stringValue] = useMemo(() => {
    if (!value) return [undefined, value] as const;

    const startsWithEmoji = emojiRegex.test(value);

    const [, emoji, stringValue] = emojiRegex.exec(value) ?? [];

    if (!startsWithEmoji) {
      return [undefined, value] as const;
    }

    return [emoji, stringValue ?? ''] ?? ([undefined, value] as const);
  }, [value]);

  const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    onChange({
      target: { value: emojiObject ? `${emojiObject.emoji} ${stringValue ?? ''}` : value },
    });
    onClose();
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      target: { value: emoji ? `${emoji} ${e.target.value}` : e.target.value },
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
                icon={emoji ? <Text>{emoji}</Text> : <Icon as={MdOutlineEmojiEmotions}></Icon>}
                aria-label="selected-emoji"
              ></IconButton>
              {emoji && (
                <IconButton
                  onClick={() => {
                    onChange({
                      target: { value: stringValue },
                    });
                  }}
                  size="20"
                  p={0}
                  color={bodySub}
                  icon={<Icon as={BiX}></Icon>}
                  aria-label="selected-emoji"
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
      <Input {...props} value={stringValue} onChange={onValueChange}></Input>
    </InputGroup>
  );
};

export default EmojiInput;
