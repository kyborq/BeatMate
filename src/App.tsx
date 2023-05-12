import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Header } from './components/Header';
import { View } from 'react-native';
import { PlayList } from './components/PlayList';
import { getMusicFromFolders, IMusicFile } from './utils/musicUtils';
import { TabPages } from './components/TabPages';
import { Player } from './components/Player/Player';

export const App = () => {
  const [musicList, setMusicList] = useState<IMusicFile[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<IMusicFile>();
  const [playerVisible, setPlayerVisible] = useState(false);
  const [tabPage, setTabPage] = useState('Устройство');

  const getLocalMusic = async () => {
    const result = await getMusicFromFolders(['Music']);
    if (result) {
      setMusicList(result);
    }
  };

  useEffect(() => {
    tabPage === 'Устройство' && getLocalMusic();
  }, [tabPage]);

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Музыка" />
      <View style={styles.page}>
        <TabPages current={tabPage} pages={['Устройство']} />
        <PlayList musicFiles={musicList} />
      </View>
      {playerVisible && <Player />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  page: {
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
