package com.myuzeek;

import java.io.ByteArrayOutputStream;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Base64;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableMap;

public class MusicInfoModule extends ReactContextBaseJavaModule {

  public MusicInfoModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "MusicInfo";
  }

  @ReactMethod
  public void getMusicInfo(String songUri, Promise promise) {
    try {
      MediaMetadataRetriever retriever = new MediaMetadataRetriever();
      retriever.setDataSource(songUri);

      String title = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE);
      String artist = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST);
      byte[] coverBytes = retriever.getEmbeddedPicture();

      WritableMap result = Arguments.createMap();
      result.putString("title", title);
      result.putString("authorName", artist);

      if (coverBytes != null) {
        Bitmap coverBitmap = BitmapFactory.decodeByteArray(coverBytes, 0, coverBytes.length);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        coverBitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);

        byte[] compressedBytes = outputStream.toByteArray();
        String base64 = Base64.encodeToString(compressedBytes, Base64.NO_WRAP);

        result.putString("coverImage", "data:image/png;base64," + base64);
      }

      promise.resolve(result);

    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void getMusicInfoArray(ReadableArray songs, Promise promise) {
    try {
      WritableArray result = Arguments.createArray();

      for (int i = 0; i < songs.size(); i++) {
        ReadableMap song = songs.getMap(i);

        String songUri = song.getString("path");
        String fileName = song.getString("fileName");

        MediaMetadataRetriever retriever = new MediaMetadataRetriever();
        retriever.setDataSource(songUri + "/" + fileName);

        String title = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE);
        String artist = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST);
        byte[] coverBytes = retriever.getEmbeddedPicture();

        WritableMap songInfo = Arguments.createMap();
        songInfo.putString("title", title);
        songInfo.putString("authorName", artist);
        songInfo.putString("path", songUri);
        songInfo.putString("fileName", fileName);

        if (coverBytes != null) {
          Bitmap coverBitmap = BitmapFactory.decodeByteArray(coverBytes, 0, coverBytes.length);

          ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
          coverBitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);

          byte[] compressedBytes = outputStream.toByteArray();
          String base64 = Base64.encodeToString(compressedBytes, Base64.NO_WRAP);

          songInfo.putString("coverImage", "data:image/png;base64," + base64);
        }

        result.pushMap(songInfo);
      }

      promise.resolve(result);

    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void getAlbumCover(String songUri, Promise promise) {
    try {
      MediaMetadataRetriever retriever = new MediaMetadataRetriever();
      retriever.setDataSource(songUri);

      byte[] coverBytes = retriever.getEmbeddedPicture();

      if (coverBytes != null) {
        Bitmap coverBitmap = BitmapFactory.decodeByteArray(coverBytes, 0, coverBytes.length);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        coverBitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);

        byte[] compressedBytes = outputStream.toByteArray();
        String base64 = Base64.encodeToString(compressedBytes, Base64.NO_WRAP);

        WritableMap result = Arguments.createMap();
        result.putString("uri", "data:image/png;base64," + base64);
        promise.resolve(result);
      } else {
        promise.reject("No album cover found");
      }
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }
}