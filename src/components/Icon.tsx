import React from 'react';
import {TIcon, icons} from '../icons/icons';

type Props = {
  name: TIcon;
  fill?: string;
};

export const Icon: React.FC<Props> = ({name, fill}) => {
  const IconComponent = icons[name];
  return <IconComponent fill={fill} width={24} height={24} />;
};
