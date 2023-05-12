import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';
import { Touchable } from '../Touchable';
import { IMusicFile } from '../../utils/musicUtils';

type Props = {
  track: IMusicFile;
  isCurrent?: boolean;
  onPress?: () => void;
};

export const TrackItem: React.FC<Props> = ({ track, isCurrent, onPress }) => {
  return (
    <Touchable
      style={[styles.root, isCurrent && { backgroundColor: '#fafafa' }]}
      contentStyle={styles.content}
      onPress={onPress}
    >
      {/* <TrackCover image={track.coverImage} isPlaying={isCurrent} />
      <TrackInfo
        title={track.title || track.fileName}
        author={track.authorName || track.path}
      /> */}
      <IconButton icon="more" color="#c7c7c7" />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 8,
    flexDirection: 'row',
    paddingRight: 20,
    gap: 12,
    alignItems: 'center',
  },
});
