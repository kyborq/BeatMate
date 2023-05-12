import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Sound from 'react-native-sound';

import { Touchable } from '../Touchable';
import { IconButton } from '../IconButton';
import { BaseModal } from '../Modal/BaseModal';
import { Progress } from './Progress';
import { Controls } from './Controls';
import { IMusicFile } from '../../utils/musicUtils';
import useInterval from '../../hooks/useInterval';

type Props = {
  track?: IMusicFile;
  onTrackEnd?: () => void;
  onPlaylistEnd?: () => void;
};

export const Player: React.FC<Props> = ({
  track,
  onTrackEnd,
  onPlaylistEnd,
}) => {
  const [currentSound, setCurrentSound] = useState<Sound>();
  const [isPlaying, setPlaying] = useState(false);
  const [maximized, setMaximize] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleMaximize = () => setMaximize(true);

  useInterval(() => {
    currentSound &&
      currentSound.getCurrentTime(seconds => {
        setCurrentTime(seconds);
      });
  }, 100);

  useEffect(() => {
    setPlaying(false);
    setCurrentSound(undefined);

    if (!track) {
      onPlaylistEnd && onPlaylistEnd();
      return;
    }

    currentSound && currentSound.release();

    setPlaying(false);
    const sound = new Sound(
      `${track.path}/${track.fileName}`,
      Sound.MAIN_BUNDLE,
      () => {
        setCurrentSound(sound);
        setDuration(sound.getDuration());
        setPlaying(true);
      },
    );

    return () => {
      setPlaying(false);
      currentSound && currentSound.release();
      setCurrentSound(undefined);
    };
  }, [track]);

  useEffect(() => {
    return () => {
      setPlaying(false);
      currentSound && currentSound.release();
      setCurrentSound(undefined);
    };
  }, []);

  useEffect(() => {
    if (currentSound && isPlaying) {
      currentSound?.play(() => {
        setPlaying(false);
        onTrackEnd && onTrackEnd();
      });
    }

    if (currentSound && !isPlaying) {
      currentSound?.pause();
    }
  }, [isPlaying]);

  const progress = duration ? currentTime / duration : 0;

  return (
    <View style={styles.root}>
      <Touchable
        style={styles.player}
        contentStyle={styles.content}
        onPress={handleMaximize}
      >
        <View
          style={[styles.playerProgress, { width: `${progress * 100}%` }]}
        />
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <View style={styles.actions}>
            <IconButton icon="skipBack" color="#ffffff" />
            <IconButton
              icon={isPlaying ? 'pause' : 'play'}
              color="#ffffff"
              onPress={() => setPlaying(!isPlaying)}
            />
            <IconButton icon="skipForward" color="#ffffff" />
          </View>
        </View>
      </Touchable>

      {maximized && (
        <BaseModal onClose={() => setMaximize(false)}>
          <View style={{ flex: 1, paddingVertical: 24, paddingBottom: 32 }}>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <IconButton icon="arrowDown" />
              <IconButton icon="more" />
            </View>
            <Progress
              currentTime={currentTime}
              duration={duration}
              onRewind={value => {
                currentSound?.setCurrentTime(value);
              }}
              color="#FFD763"
            />
            <Controls
              isPlaying={isPlaying}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onNext={onTrackEnd}
            />
          </View>
        </BaseModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 999,
  },
  playerProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FFD763',
    bottom: 0,
  },
  player: {
    position: 'relative',
    margin: 16,
    flexDirection: 'row',
    backgroundColor: '#FEC835',
    borderRadius: 16,
    shadowColor: '#c7c7c7',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: -10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
});
