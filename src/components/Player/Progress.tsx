import { Slider } from '@miblanchard/react-native-slider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  color?: string;
  currentTime: number;
  duration?: number;
  onRewind?: (value: number) => void;
};

// TODO: Move to global constants file on top
const DEFAULT_COLOR = '#000000';

export const Progress: React.FC<Props> = ({
  color,
  currentTime,
  duration,
  onRewind,
}) => {
  const trackStyle = { backgroundColor: !!color ? color : DEFAULT_COLOR };
  const thumbStyle = { borderColor: !!color ? color : DEFAULT_COLOR };

  const renderThumb = () => <View style={[styles.thumb, thumbStyle]}></View>;

  function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  const progress = duration ? currentTime / duration : 0;

  return (
    <View style={styles.container}>
      <Slider
        renderThumbComponent={renderThumb}
        trackStyle={styles.track}
        minimumTrackStyle={trackStyle}
        value={progress}
        onValueChange={value => {
          onRewind && onRewind(value[0]);
        }}
        onSlidingComplete={value => {
          onRewind && onRewind(value[0] * (duration || 0));
        }}
      />
      <View style={styles.timer}>
        <Text style={styles.time}>{formatTime(currentTime)}</Text>
        <Text style={styles.time}>{formatTime(duration || 0)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },
  thumb: {
    backgroundColor: '#ffffff',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000000',
  },
  track: {
    backgroundColor: '#f2f2f2',
    height: 6,
    borderRadius: 3,
  },
  timer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#c7c7c7',
    fontSize: 13,
  },
});
