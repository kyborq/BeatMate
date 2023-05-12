import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { IMusicFile } from '../utils/musicUtils';
import { TrackItem } from './Track/TrackItem';

type Props = {
  musicFiles?: IMusicFile[];
  currentTrack?: IMusicFile;
  isPlaying?: boolean;
  onSelect?: (track: IMusicFile) => void;
};

export const PlayList: React.FC<Props> = ({ musicFiles }) => {
  const handleSelectTrack = (track: IMusicFile) => {};

  const renderTrackItem = ({ item, index }: ListRenderItemInfo<IMusicFile>) => (
    <TrackItem key={index} track={item} />
  );

  return (
    <FlatList
      data={musicFiles}
      contentContainerStyle={{ paddingBottom: 100 }}
      renderItem={renderTrackItem}
    />
  );
};
