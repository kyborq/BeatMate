import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {NativeModules} from 'react-native';
import {IconButton} from '../IconButton';

type Props = {
  link?: string;
  cover?: string;
  title?: string;
  author?: string;
  duration?: string;
  onPress?: () => void;
};

export const CatalogItem: React.FC<Props> = ({
  link,
  cover,
  duration,
  title,
  onPress,
}) => {
  const {AlbumCover} = NativeModules;
  // const [ccover, setCover] = useState('');
  // const [au, setCover] = useState('');

  useEffect(() => {
    AlbumCover.getAlbumCover(link)
      .then((result: any) => {
        setCover(result.cover);
      })
      .catch((error: any) => {
        console.log(error); // Вывести сообщение об ошибке
      });
  }, []);

  return (
    <View style={styles.container}>
      {ccover && (
        <Image
          style={styles.image}
          source={{
            uri: ccover,
          }}
        />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
      </View>
      <View style={styles.actions}>
        <Text style={styles.duration}>{duration}</Text>
        <IconButton icon="more" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    paddingVertical: 8,
    gap: 16,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  info: {
    justifyContent: 'center',
    gap: 2,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  author: {
    fontSize: 13,
    color: '#c7c7c7',
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: -12,
  },
  duration: {
    fontSize: 12,
    color: '#c7c7c7',
  },
});
