import {PermissionsAndroid} from 'react-native';

export async function requestReadStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Read Storage Permission',
        message: 'App needs access to read your storage',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Read storage permission granted');
    } else {
      console.log('Read storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
