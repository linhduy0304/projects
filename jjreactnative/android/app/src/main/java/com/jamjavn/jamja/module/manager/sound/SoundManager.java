package com.jamjavn.jamja.module.manager.sound;

import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.PlaybackParams;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.jamjavn.jamja.module.BaseReactContextModule;

/**
 * Created by sinhphan on 11/8/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class SoundManager extends BaseReactContextModule implements MediaPlayer.OnCompletionListener, MediaPlayer.OnErrorListener, MediaPlayer.OnPreparedListener {

    private MediaPlayer mMediaPlayer;
    private boolean repeat = false;
    private String currentFileName;

    public SoundManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SoundManager";
    }

    private void initMediaPlayer() {
        if (mMediaPlayer == null) {
            mMediaPlayer = new MediaPlayer();

            mMediaPlayer.setOnCompletionListener(this);
            mMediaPlayer.setOnPreparedListener(this);
            mMediaPlayer.setOnErrorListener(this);
            mMediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
        }
    }

    @ReactMethod
    public void play(String fileName, boolean repeat) {
        if (!isAvailable() || fileName == null) return;
        this.repeat = repeat;
        Log.e("JAMJA", "SoundManager:play:" + fileName);

        try{
            if (fileName.equals(currentFileName) && mMediaPlayer != null) {
                mMediaPlayer.start();
                return;
            }
            try {
                if (mMediaPlayer != null) {
                    mMediaPlayer.pause();
                    mMediaPlayer.stop();
                    mMediaPlayer.reset();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            initMediaPlayer();
            currentFileName = fileName;

            String filename = "android.resource://" + getCurrentActivity().getPackageName() + "/raw/" + fileName;
            mMediaPlayer.setDataSource(getCurrentActivity(), Uri.parse(filename));
            mMediaPlayer.prepareAsync();

        } catch(Exception e){
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void resume(String action) {
        Log.e("JAMJA", "SoundManager:resume");
        try {
            if (mMediaPlayer != null && currentFileName != null) {
                mMediaPlayer.start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void pause(String action) {
        Log.e("JAMJA", "SoundManager:pause");
        try {
            if (mMediaPlayer != null) {
                mMediaPlayer.pause();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void release(String action) {
        Log.e("JAMJA", "SoundManager:release");
        try {
            if (mMediaPlayer != null) {
                mMediaPlayer.stop();
                mMediaPlayer.reset();
                mMediaPlayer.release();
            }
            mMediaPlayer = null;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onCompletion(MediaPlayer mp) {
        Log.e("JAMJA", "SoundManager:onCompletion:" + repeat);
        if (repeat && mMediaPlayer != null) {
            mMediaPlayer.start();
        }
    }

    @Override
    public boolean onError(MediaPlayer mp, int what, int extra) {
        Log.e("JAMJA", "SoundManager:error:" + what);
        return false;
    }

    @Override
    public void onPrepared(MediaPlayer mp) {
        Log.e("JAMJA", "SoundManager:onPrepared:");
        if (mMediaPlayer != null) {
            mMediaPlayer.start();
        }
    }
}
