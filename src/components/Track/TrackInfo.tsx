import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title?: string;
  darkContent?: boolean;
  author?: string;
};

export const TrackInfo: React.FC<Props> = ({ author, title, darkContent }) => {
  const normalInfo = author && title && parseMusicFilename(title, author);

  return (
    <View style={styles.root}>
      <Text
        style={[
          styles.title,
          darkContent && { color: 'rgba(255, 255, 255, 0.7)' },
        ]}
        numberOfLines={1}
      >
        {(normalInfo && normalInfo.title) || 'Sample name'}
      </Text>
      <Text
        style={[
          styles.author,
          darkContent && { color: 'rgba(255, 255, 255, 0.7)' },
        ]}
        numberOfLines={1}
      >
        {(normalInfo && normalInfo.author) || 'No Name'}
      </Text>
    </View>
  );
};

export function parseMusicFilename(filename: string, author: string) {
  const separatorIndex = filename.indexOf(' - ');
  const extensionIndex = filename.lastIndexOf('.mp3');

  if (separatorIndex >= 0 && extensionIndex >= 0) {
    const author = filename.substring(0, separatorIndex);
    const title = filename.substring(separatorIndex + 3, extensionIndex);

    return { author, title };
  } else {
    return { title: filename, author };
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  author: {
    color: '#c7c7c7',
    fontSize: 11,
  },
});
