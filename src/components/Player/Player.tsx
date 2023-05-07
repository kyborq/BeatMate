import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Sound from 'react-native-sound';

import {Header} from '../Header';
import {Information} from './Information';
import {Progress} from './Progress';
import {Controls} from './Controls';

type Props = {
  playlist: string[];
};

export const Player: React.FC<Props> = ({playlist}) => {
  const [sound, setSound] = useState<Sound>();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [playIndex, setPlayIndex] = useState(0);

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleShuffle = () => setShuffle(!shuffle);
  const handleRepeat = () => setRepeat(!repeat);

  const handlePlay = () => setPlaying(true);
  const handlePause = () => setPlaying(false);

  const handleRewind = (value: number) => {
    if (sound) {
      setCurrentTime(value);
      sound.setCurrentTime(value);
    }
  };

  const handleNext = () => {
    playIndex < playlist.length && setPlayIndex(playIndex + 1);
    handlePlay();
  };
  const handlePrev = () => {
    playIndex > 0 && setPlayIndex(playIndex - 1);
    handlePlay();
  };

  useEffect(() => {
    if (sound) {
      sound.setCurrentTime(0);
      sound.stop();
      handlePause();
    }

    const newSound = new Sound(playlist[playIndex], Sound.MAIN_BUNDLE, () => {
      setDuration(newSound.getDuration());
      setSound(newSound);
    });
  }, [playIndex]);

  useEffect(() => {
    if (sound && playing) {
      sound.play(() => {
        if (playIndex < playlist.length) {
          setPlayIndex(playIndex + 1);
          sound.play();
        }
      });
      const intervalId = setInterval(() => {
        sound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
        });
      }, 100);
      return () => clearInterval(intervalId);
    }

    if (sound && !playing) {
      sound.pause();
    }
  }, [playing]);

  return (
    <View style={styles.container}>
      <Text>{`${playIndex + 1} / ${playlist.length}`}</Text>
      <Progress
        currentTime={currentTime}
        duration={duration}
        onRewind={handleRewind}
      />
      <Controls
        isRepeat={repeat}
        isShuffle={shuffle}
        isPlaying={playing}
        onShuffle={handleShuffle}
        onRepeat={handleRepeat}
        onPlay={handlePlay}
        onPause={handlePause}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 48,
    paddingBottom: 32,
  },
});

//   const [sound, setSound] = useState<Sound>();
//   const [currentTime, setCurrentTime] = useState<number>(0);
//   const [isPlaying, setPlaying] = useState(false);

//   const playSong = () => {
//     sound &&
//       sound.play(success => {
//         if (success) {
//           console.log('finished');
//           setCurrentTime(0);
//           setPlaying(false);
//         }
//       });
//     setPlaying(true);
//   };

//   const pauseSong = () => {
//     sound && sound.pause();
//     setPlaying(false);
//   };

//   useEffect(() => {
//     setSound(new Sound(music, Sound.MAIN_BUNDLE));
//   }, []);

//   useEffect(() => {
//     if (isPlaying) {
//       const intervalId = setInterval(() => {
//         sound?.getCurrentTime(seconds => {
//           setCurrentTime(seconds);
//         });
//         sound;
//       }, 100);
//       return () => clearInterval(intervalId);
//     }
//   }, [isPlaying]);

//   return (
//     <View style={{flexGrow: 1, gap: 48, paddingBottom: 32}}>
//       <Header leftIcon="close" title="Плеер" rightIcon="more" />
//       <View style={{flex: 1}}>
//         <Information cover="" title="Some music..." author="Dunno..." />
//       </View>
//       <Progress
//         color="#000000"
//         currentTime={currentTime}
//         duration={sound && sound.getDuration()}
//         onRewind={value => {
//           setCurrentTime(value);
//           sound?.setCurrentTime(value);
//           // playSong();
//         }}
//       />
//       <Controls isPlaying={isPlaying} onPlay={playSong} onPause={pauseSong} />
//     </View>
//   );
// };
