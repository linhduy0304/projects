package com.jamjavn.jamja.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

/**
 * Created by sinhphan on 11/8/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public abstract class BaseReactContextModule extends ReactContextBaseJavaModule {


    public BaseReactContextModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public boolean isAvailable() {
        return getReactApplicationContext() != null &&
                getCurrentActivity() != null &&
                !getCurrentActivity().isFinishing();
    }
}
