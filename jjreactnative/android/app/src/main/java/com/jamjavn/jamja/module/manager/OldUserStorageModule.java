package com.jamjavn.jamja.module.manager;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by sinhphan on 10/8/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class OldUserStorageModule extends ReactContextBaseJavaModule {

    public OldUserStorageModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "OldUserStorage";
    }

    @Override
    public @Nullable
    Map<String, Object> getConstants() {

        HashMap<String, Object> constants = new HashMap<>();

        try {
            if (getCurrentActivity() == null || getCurrentActivity().isFinishing()) return constants;

            SharedPreferences sharedPreferences = getCurrentActivity().getSharedPreferences("UserPreference", Context.MODE_PRIVATE);

            if (sharedPreferences == null) return constants;

            String userId = sharedPreferences.getString("userId", "");
            String userToken = sharedPreferences.getString("userToken", "");

            if (userId.isEmpty() || userToken.isEmpty()) return constants;

            userId = userId.trim();

            String[] result = userToken.split("\\s+");

            if (result.length < 2) return constants;

            String tokenType = result[0].trim();
            String accessToken = result[1].trim();

            constants.put("userId", userId);
            constants.put("accessToken", accessToken);
            constants.put("userAvatar", sharedPreferences.getString("avatar", ""));
            constants.put("userEmail", sharedPreferences.getString("email", ""));
            constants.put("userDisplayName", sharedPreferences.getString("displayName", ""));
            constants.put("userPhone", sharedPreferences.getString("phoneNumber", ""));
            constants.put("tokenType", tokenType);
            return constants;
        } catch (Exception e) {
            e.printStackTrace();
            return constants;
        }
    }
}
