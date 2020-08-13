package com.jamjavn.jamja.module;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.jamjavn.jamja.module.manager.textView.JJTextViewManager;
import com.jamjavn.jamja.module.manager.webView.JJWebViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by sinhphan on 11/26/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class JJViewPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> views = new ArrayList<>();
        views.add(new JJWebViewManager());
        views.add(new JJTextViewManager());
        return views;
    }
}
