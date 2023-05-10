import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Icon } from '../Icon';

type Props = {
  image?: string;
  isPlaying?: boolean;
  darkContent?: boolean;
};

export const TrackCover: React.FC<Props> = ({
  image,
  isPlaying,
  darkContent,
}) => {
  return (
    <View
      style={[
        styles.root,
        darkContent && { backgroundColor: 'rgba(255, 255, 255, 0.4)' },
      ]}
    >
      {!image && (
        <Icon name="music" fill={darkContent ? '#ffffff' : '#c7c7c7'} />
      )}
      {!!image && (
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      )}
      {isPlaying && (
        <View style={styles.overlay}>
          <Icon name="play" fill="#ffffff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 48,
    height: 48,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f2f2f2',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 6,
    position: 'relative',
  },
  image: {
    width: 48,
    height: 48,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000044',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
