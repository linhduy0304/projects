package com.jamjavn.jamja.module.rnPackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.jamjavn.jamja.module.manager.OldUserStorageModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by sinhphan on 10/8/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class OldUserStoragePackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new OldUserStorageModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
