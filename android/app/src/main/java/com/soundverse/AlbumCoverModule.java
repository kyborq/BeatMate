package com.soundverse;

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
import com.facebook.react.bridge.WritableMap;

public class AlbumCoverModule extends ReactContextBaseJavaModule {

  public AlbumCoverModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "AlbumCover";
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
      result.putString("artist", artist);
      promise.resolve(result);

      if (coverBytes != null) {
        Bitmap coverBitmap = BitmapFactory.decodeByteArray(coverBytes, 0, coverBytes.length);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        coverBitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);

        byte[] compressedBytes = outputStream.toByteArray();
        String base64 = Base64.encodeToString(compressedBytes, Base64.NO_WRAP);

        result.putString("cover", "data:image/png;base64," + base64);
        promise.resolve(result);
      } else {
        promise.reject("No album cover found");
      }
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