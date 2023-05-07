import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from '../IconButton';

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
        foregroundColor={isShuffle ? '#000000' : '#c7c7c7'}
        onPress={onShuffle}
      />
      <View style={styles.controls}>
        <IconButton icon="skipLeft" onPress={onPrevious} />
        <IconButton
          icon={isPlaying ? 'pause' : 'play'}
          size={64}
          backgroundColor="#000000"
          foregroundColor="#ffffff"
          onPress={isPlaying ? onPause : onPlay}
        />
        <IconButton icon="skipRight" onPress={onNext} />
      </View>
      <IconButton
        icon="repeat"
        foregroundColor={isRepeat ? '#000000' : '#c7c7c7'}
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
