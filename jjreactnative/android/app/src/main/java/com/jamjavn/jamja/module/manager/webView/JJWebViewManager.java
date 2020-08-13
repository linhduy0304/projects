package com.jamjavn.jamja.module.manager.webView;

import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by sinhphan on 11/26/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class JJWebViewManager extends SimpleViewManager<JJWebView> {

    private final String TAG = "JJWebView";

    @Override
    public String getName() {
        return TAG;
    }

    @Override
    protected JJWebView createViewInstance(ThemedReactContext reactContext) {
        return new JJWebView(reactContext);
    }

    @ReactProp(name = "source")
    public void setSource(JJWebView view, ReadableMap source) {
        Log.i(TAG, "setSource: " + source);
        if (view != null) view.setSource(source);
    }
}
