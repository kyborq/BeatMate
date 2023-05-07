import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type Props = {
  cover?: string;
  title?: string;
  author?: string;
};

export const Information: React.FC<Props> = ({author, cover, title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.cover}
          source={{
            uri:
              cover ||
              'https://images.unsplash.com/photo-1616663395731-d70897355fd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          }}
        />
      </View>
      <View style={styles.information}>
        <Text style={styles.title}>{title || 'Unknown'}</Text>
        <Text style={styles.author}>by {author || 'Unknown'}</Text>
      </View>
    </View>
  );
};

// TODO: For shadow box in cover make dominant color from cover image (Native module?)
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 32,
  },
  imageContainer: {
    borderRadius: 16,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10.24,
    elevation: 19,

    overflow: 'hidden',
  },
  cover: {
    width: 256,
    height: 256,
    // width: '100%',
    // height: '100%',
  },
  information: {
    gap: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    color: '#000000',
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#c7c7c7',
  },
});
