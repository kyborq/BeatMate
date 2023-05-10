import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '../IconButton';

type Props = {
  isPlaying?: boolean;
  isShuffle?: boolean;
  isRepeat?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onShuffle?: () => void;
  onRepeat?: () => void;
};

export const Controls: React.FC<Props> = ({
  isPlaying,
  isRepeat,
  isShuffle,
  onNext,
  onPause,
  onPlay,
  onPrevious,
  onRepeat,
  onShuffle,
}) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="shuffle"
        color={isShuffle ? '#FFD763' : '#c7c7c7'}
        onPress={onShuffle}
      />
      <View style={styles.controls}>
        <IconButton color="#c7c7c7" icon="skipBack" onPress={onPrevious} />
        <IconButton
          icon={isPlaying ? 'pause' : 'play'}
          size={64}
          background="#FFD763"
          color="#ffffff"
          onPress={isPlaying ? onPause : onPlay}
        />
        <IconButton color="#c7c7c7" icon="skipForward" onPress={onNext} />
      </View>
      <IconButton
        icon="repeat"
        color={isRepeat ? '#FFD763' : '#c7c7c7'}
        onPress={onRepeat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
