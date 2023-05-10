import appLogo from './app-logo.svg';
import play from './play.svg';
import pause from './pause.svg';
import music from './music.svg';
import skipForward from './skip-forward.svg';
import skipBack from './skip-back.svg';
import user from './user.svg';
import more from './more.svg';
import shuffle from './shuffle.svg';
import repeat from './repeat.svg';
import arrowDown from './arrow-down.svg';

export const icons = {
  appLogo,
  play,
  music,
  skipForward,
  skipBack,
  user,
  more,
  pause,
  shuffle,
  repeat,
  arrowDown,
};

export type TIcon = keyof typeof icons;
