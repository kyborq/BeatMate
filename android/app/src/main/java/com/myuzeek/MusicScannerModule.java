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
import java.util.List;

public class MusicScannerModule extends ReactContextBaseJavaModule {

  public MusicScannerModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "MusicScanner";
  }

  @ReactMethod
  public void scanFolders(List<String> folders, Promise promise) {
    try {
      ContentResolver contentResolver = getReactApplicationContext().getContentResolver();

      Uri uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
      String[] projection = {
          MediaStore.Audio.Media.DATA,
          MediaStore.Audio.Media.DISPLAY_NAME,
          MediaStore.Audio.Media.DURATION
      };

      String selection = MediaStore.Audio.Media.DATA + " LIKE ?";
      String[] selectionArgs = new String[folders.size()];
      for (int i = 0; i < folders.size(); i++) {
        selectionArgs[i] = folders.get(i) + "%";
      }

      Cursor cursor = contentResolver.query(uri, projection, selection, selectionArgs, null);
      WritableArray result = Arguments.createArray();

      if (cursor != null) {
        while (cursor.moveToNext()) {
          String filePath = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA));
          String fileName = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DISPLAY_NAME));
          long duration = cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media.DURATION));

          if (filePath != null && filePath.endsWith(".mp3")) {
            WritableMap fileInfo = createFileInfo(fileName, filePath, duration);
            result.pushMap(fileInfo);
          }
        }

        cursor.close();
      }

      promise.resolve(result);
    } catch (Exception e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void scanMusic(Promise promise) {
    try {
      ContentResolver contentResolver = getReactApplicationContext().getContentResolver();

      Uri uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
      String[] projection = {
          MediaStore.Audio.Media.DATA,
          MediaStore.Audio.Media.DISPLAY_NAME,
          MediaStore.Audio.Media.DURATION
      };

      Cursor cursor = contentResolver.query(uri, projection, null, null, null);
      WritableArray result = Arguments.createArray();

      if (cursor != null) {
        while (cursor.moveToNext()) {
          String filePath = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA));
          String fileName = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DISPLAY_NAME));
          long duration = cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media.DURATION));

          if (filePath != null && filePath.endsWith(".mp3")) {
            WritableMap fileInfo = createFileInfo(fileName, filePath, duration);
            result.pushMap(fileInfo);
          }
        }

        cursor.close();
      }

      promise.resolve(result);
    } catch (Exception e) {
      promise.reject(e);
    }
  }

  private WritableMap createFileInfo(String fileName, String filePath, long duration) {
    int index = filePath.lastIndexOf("/");
    String path = filePath.substring(0, index);

    WritableMap fileInfo = Arguments.createMap();
    fileInfo.putString("fileName", fileName);
    fileInfo.putString("path", path);
    fileInfo.putDouble("duration", duration / 1000.0);

    WritableMap authorAndTitle = parseAuthorAndTitle(fileName);
    fileInfo.putMap("authorAndTitle", authorAndTitle);

    return fileInfo;
  }

  private WritableMap parseAuthorAndTitle(String fileName) {
    WritableMap authorAndTitle = Arguments.createMap();

    int hyphenIndex = fileName.indexOf("-");

    if (hyphenIndex >= 0) {
      String author = fileName.substring(0, hyphenIndex).trim();
      String title = fileName.substring(hyphenIndex + 1, fileName.length() - 4).trim();

      authorAndTitle.putString("author", author);
      authorAndTitle.putString("title", title);
    } else {
      authorAndTitle.putNull("author");
      authorAndTitle.putNull("title");
    }

    return authorAndTitle;
  }
}