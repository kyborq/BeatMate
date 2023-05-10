package com.myuzeek;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableArray;
import java.util.Arrays;
import java.util.Objects;

public class MusicScannerModule extends ReactContextBaseJavaModule {

  public MusicScannerModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "MusicScanner";
  }

  @ReactMethod
  public void scanMusic(Promise promise) {
    try {
      ContentResolver contentResolver = getReactApplicationContext().getContentResolver();

      Uri uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
      String[] projection = {
        MediaStore.Audio.Media.DATA,
        MediaStore.Audio.Media.DISPLAY_NAME
      };

      Cursor cursor = contentResolver.query(uri, projection, null, null, null);

      WritableArray result = Arguments.createArray();

      if (cursor != null) {
        while (cursor.moveToNext()) {
          String filePath = cursor.getString(0);
          String fileName = cursor.getString(1);
          if (filePath.endsWith(".mp3")) {
            int index = filePath.lastIndexOf("/");
            String path = filePath.substring(0, index);
            WritableMap fileInfo = Arguments.createMap();
            fileInfo.putString("fileName", fileName);
            fileInfo.putString("path", path);
            result.pushMap(fileInfo);
          }
        }

        cursor.close();
      }

      promise.resolve(result);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void scanMusicFromFolder(ReadableArray folders, Promise promise) {
    try {
      ContentResolver contentResolver = getReactApplicationContext().getContentResolver();

      Uri uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
      String[] projection = {
              MediaStore.Audio.Media.DATA
      };

      // Build selection string based on folders
      StringBuilder selectionBuilder = new StringBuilder();
      for (int i = 0; i < folders.size(); i++) {
          String folder = folders.getString(i);
          if (folder != null && !folder.isEmpty()) {
              selectionBuilder.append(MediaStore.Audio.Media.DATA + " LIKE ?");
              if (i < folders.size() - 1) {
                  selectionBuilder.append(" OR ");
              }
          }
      }

      String[] selectionArgs = new String[folders.size()];
      for (int i = 0; i < folders.size(); i++) {
          String folder = folders.getString(i);
          if (folder != null && !folder.isEmpty()) {
              selectionArgs[i] = "%" + folder + "%";
          }
      }

      String selection = selectionBuilder.toString();
      String[] selectionArgsCleaned = Arrays.stream(selectionArgs)
              .filter(Objects::nonNull)
              .toArray(String[]::new);

      Cursor cursor = contentResolver.query(uri, projection, selection, selectionArgsCleaned, null);

      WritableArray result = Arguments.createArray();

      if (cursor != null) {
          while (cursor.moveToNext()) {
              String filePath = cursor.getString(0);
              if (filePath.endsWith(".mp3")) {
                  result.pushString(filePath);
              }
          }

          cursor.close();
      }

      promise.resolve(result);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }
}