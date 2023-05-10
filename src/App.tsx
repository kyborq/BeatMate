import React, { useEffect, useState } from 'react';
import {
  NativeModules,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Player } from './components/Player/Player';
import { Header } from './components/Header';
import { TabPages } from './components/TabPages';
import { TrackItem } from './components/Track/TrackItem';
import { TMusic } from './models/musicModel';
import { requestReadStoragePermission } from './permissions/storagePermissions';

export const App = () => {
  const [playList, setPlayList] = useState<TMusic[]>([]);
  const [currentTrack, setTrack] = useState<TMusic>();
  const [isPlayerVisible, setPlayerVisible] = useState(false);

  const { MusicScanner, MusicInfo } = NativeModules;

  const nextTrack = () => {
    if (currentTrack) {
      const currentIndex = playList.indexOf(currentTrack);
      if (currentIndex < playList.length) {
        setTrack(playList[currentIndex + 1]);
      }
    }
  };

  useEffect(() => {
    requestReadStoragePermission().then(() => {
      MusicScanner.scanMusic().then((result: any) => {
        const musicList = result as TMusic[];

        MusicInfo.getMusicInfoArray(musicList).then((result: any) => {
          const music = result as TMusic[];
          setPlayList(music);
        });
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Header />
      <View style={styles.content}>
        <TabPages pages={['Библиотека']} current="Библиотека" />

        <FlatList
          data={playList}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item, index }) => (
            <TrackItem
              key={index}
              track={item}
              isCurrent={
                currentTrack && playList.indexOf(currentTrack) === index
              }
              onPress={() => {
                setTrack(item);
                setPlayerVisible(true);
              }}
            />
          )}
        />
      </View>
      {isPlayerVisible && (
        <Player
          track={currentTrack}
          onTrackEnd={nextTrack}
          onPlaylistEnd={() => {
            setTrack(undefined);
            setPlayerVisible(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    shadowColor: '#c7c7c7',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});
