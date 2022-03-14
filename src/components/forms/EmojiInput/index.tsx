import {
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
import React, { ChangeEvent, useMemo, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { IEmojiData } from 'emoji-picker-react';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import dynamic from 'next/dynamic';

import useAppColors from 'hooks/useAppColors';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const emojiRegexChars =
  '[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]';

type Props = Pick<ControllerRenderProps, 'onChange'> & {
  value: string;
};

const EmojiInput = ({ onChange, value, ...props }: Props) => {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
  const { bodySub } = useAppColors();

  const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject);
    onClose();
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      target: { value: chosenEmoji ? `${chosenEmoji.emoji} ${e.target.value}` : e.target.value },
    });
  };

  const splitValue = useMemo(() => {
    if (!value) return value;

    const emojiRegex = new RegExp(`${emojiRegexChars} .*`, 'gu');

    const startsWithEmoji = emojiRegex.test(value);

    if (!startsWithEmoji) {
      return value;
    }

    const restofName = value.match(emojiRegex)?.[1];
    return restofName;
  }, [value]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <InputGroup>
      <InputLeftAddon>
        <Popover isOpen={isOpen} onClose={onClose}>
          <PopoverTrigger>
            <IconButton
              onClick={onOpen}
              fontSize="xl"
              color={bodySub}
              icon={
                chosenEmoji?.emoji ? (
                  <Text>{chosenEmoji?.emoji}</Text>
                ) : (
                  <Icon as={MdOutlineEmojiEmotions}></Icon>
                )
              }
              aria-label="selected-emoji"
            ></IconButton>
          </PopoverTrigger>
          <PopoverContent w="auto" border="none">
            <PopoverArrow></PopoverArrow>
            <EmojiPicker native onEmojiClick={onEmojiClick} />
          </PopoverContent>
        </Popover>
      </InputLeftAddon>
      <Input {...props} value={splitValue} onChange={onValueChange}></Input>
    </InputGroup>
  );
};

export default EmojiInput;
