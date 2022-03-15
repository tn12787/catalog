import emojiRegex from 'emoji-regex';

import { TaskNameData } from './types';

export const deriveEmojiValueData = (name?: string | null): TaskNameData => {
  if (!name) return { emoji: '', text: '' };

  const defaultReturn = { emoji: '', text: name };

  try {
    const matches = name.match(emojiRegex());
    if (!matches?.length) {
      return defaultReturn;
    }

    const [emoji] = matches;

    return emoji ? { emoji, text: name?.replace(emoji, '').trimStart() } : defaultReturn;
  } catch (e) {
    console.error(e);
    return { emoji: '', text: name };
  }
};
