package com.jamjavn.jamja.module;

import android.os.Build;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.jamjavn.jamja.BuildConfig;
import com.jamjavn.jamja.config.JJConfig;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by sinhphan on 7/17/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class AppInfoModule extends ReactContextBaseJavaModule {

    public AppInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AppInfo";
    }

    @Override
    public @Nullable Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<>();
        constants.put("OS", "android");
        constants.put("VersionCode", BuildConfig.VERSION_CODE);
        constants.put("VersionName", BuildConfig.VERSION_NAME);
        constants.put("BuildType", BuildConfig.BUILD_TYPE);
        constants.put("BuildEnv", BuildConfig.FLAVOR);
        constants.put("Release", Build.VERSION.RELEASE);
        constants.put("Fingerprint", Build.FINGERPRINT);
        constants.put("Model", Build.MODEL);
        constants.put("UUID", Settings.Secure.getString(getReactApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID));
        constants.put("GA_ID", JJConfig.GA_ID);
        constants.put("ONE_SIGNAL_KEY", JJConfig.ONE_SIGNAL_KEY);

        constants.put("INSIDER_PARTNER", JJConfig.INSIDER_PARTNER);
        constants.put("FCM_SENDER_ID", JJConfig.FCM_SENDER_ID);

        constants.put("CODEPUSH_KEY", JJConfig.CODEPUSH_KEY);
        return constants;
    }
}
