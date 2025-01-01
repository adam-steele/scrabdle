// utils/scoreUtils.ts
import KEYS from '../data/keys';

export const getLetterScore = (letter: string): number => {
  return KEYS.find((item) => item.key === letter)?.letterScore || 0;
};
