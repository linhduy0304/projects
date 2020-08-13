package com.jamjavn.jamja.module.manager.common;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.jamjavn.jamja.MainActivity;
import com.jamjavn.jamja.module.BaseReactContextModule;
import com.jamjavn.jamja.module.manager.youtube.YoutubePlayerActivity;
import com.jamjavn.jamja.screen.image.ImagePreviewActivity;
import com.jamjavn.jamja.util.BundleKey;
import com.jamjavn.jamja.util.Constant;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by sinhphan on 11/26/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class CommonManager extends BaseReactContextModule implements LifecycleEventListener {

    private final String TAG = "CommonManager";
    public static final String COMMON_COMMAND_EVENT = "common_command_event";

    private static WeakReference<CommonManager> instance;

    public CommonManager(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
        instance = new WeakReference<>(this);
    }

    @Override
    public String getName() {
        return TAG;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constant = new HashMap<>();
        constant.put("EVENT", COMMON_COMMAND_EVENT);
        return constant;
    }

    @ReactMethod
    public void openUrl(String url) {
        try {
            if (url == null) return;
            DeeplinkUrlDetectUtil.detectUri(getCurrentActivity(), Uri.parse(url));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void openImagePreview(ReadableArray images, Integer position) {
        try {
            if (images == null) return;

            ArrayList<String> imageList = new ArrayList<>();
            for (int i = 0; i < images.size(); i++) {
                imageList.add(images.getString(i));
            }

            Intent imageIntent = new Intent(getCurrentActivity(), ImagePreviewActivity.class);
            imageIntent.putStringArrayListExtra(BundleKey.IMAGES, imageList);
            if (position != null) imageIntent.putExtra(BundleKey.POSITION, position);

            getCurrentActivity().startActivity(imageIntent);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void playVideo(String videoId) {
        try {
            if (!isAvailable()) return;

            if (videoId == null) {
                Toast.makeText(getCurrentActivity(), "Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!", Toast.LENGTH_LONG).show();
                return;
            }
            Intent player = new Intent(getCurrentActivity(), YoutubePlayerActivity.class);
            player.putExtra(Constant.KEY_YOUTUBE_VIDEO_ID, videoId);
            getCurrentActivity().startActivity(player);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void initCompleted() {
        MainActivity mainActivity = MainActivity.getInstance();
        Log.i("JAMJA", "initCompleted: " + mainActivity);
        if (mainActivity != null) {
            mainActivity.removeSplashView();
        }
    }

    public ReactApplicationContext getReactContext() {
        return getReactApplicationContext();
    }

    public static CommonManager getInstance() {
        if (instance == null) return null;
        return instance.get();
    }

    @Override
    public void onHostResume() {
        if (instance == null) {
            instance = new WeakReference<>(this);
        }
    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        try {
            if (instance != null) instance.clear();
            instance = null;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
