import React from 'react';
import { View } from 'react-native';
import { IMusicFile } from '../utils/musicUtils';

type Props = {
  musicFiles?: IMusicFile[];
};

export const PlayList: React.FC<Props> = ({ musicFiles }) => {
  return <View></View>;
};
