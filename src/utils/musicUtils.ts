import { NativeModules } from 'react-native';

const { MusicScanner, MusicInfo } = NativeModules;

export interface IMusicFile {
  fileName: string;
  path: string;
  duration: number;
  authorAndTitle?: {
    author?: string;
    title?: string;
  };
}

export const getMusicFromFolders = async (folders: string[]) => {
  try {
    const result: IMusicFile[] = await MusicScanner.scanFolders(folders);
    return result;
  } catch (error) {
    console.log('Some error...');
  }
};

export const getAllMusic = async () => {
  try {
    const result: IMusicFile[] = await MusicScanner.scanMusic();
    return result;
  } catch (error) {
    console.log('Some error...');
  }
};
