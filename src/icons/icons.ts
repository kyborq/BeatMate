import play from './play.svg';
import skipLeft from './skip-left.svg';
import skipRight from './skip-right.svg';
import repeat from './repeat.svg';
import shuffle from './shuffle.svg';
import more from './more.svg';
import close from './close.svg';
import pause from './pause.svg';
import user from './user.svg';
import search from './search.svg';
import dropDown from './drop-down.svg';

export const icons = {
  play,
  skipLeft,
  skipRight,
  repeat,
  shuffle,
  more,
  close,
  pause,
  user,
  search,
  dropDown,
};

export type TIcon = keyof typeof icons;
