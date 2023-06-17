import React from 'react';
import { TIcon, icons } from '../../icons/icons';

type Props = {
  name: TIcon;
  fill?: string;
  size?: number;
};

export const Icon: React.FC<Props> = ({ name, fill, size }) => {
  const IconComponent = icons[name];
  return <IconComponent fill={fill} />;
};
