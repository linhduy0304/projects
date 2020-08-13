package com.jamjavn.jamja;

import android.support.multidex.MultiDexApplication;
import android.webkit.WebView;

import com.crashlytics.android.Crashlytics;
import com.crashlytics.android.core.CrashlyticsCore;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.ReactApplication;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;
import com.jamjavn.jamja.config.JJConfig;
import com.microsoft.codepush.react.CodePush;
import com.reactlibrary.RNInsiderPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.google.firebase.FirebaseApp;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.jamjavn.jamja.module.manager.common.CommonPackage;
import com.jamjavn.jamja.module.manager.location.JJLocationPackage;
import com.jamjavn.jamja.module.manager.sensor.SensorPackage;
import com.jamjavn.jamja.module.manager.sound.SoundPackage;
import com.jamjavn.jamja.module.JJViewPackage;
import com.jamjavn.jamja.module.rnPackage.OldUserStoragePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.wix.interactable.Interactable;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;

import io.fabric.sdk.android.Fabric;

import com.facebook.reactnative.androidsdk.FBSDKPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.invites.RNFirebaseInvitesPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.realm.react.RealmReactPackage;

import com.jamjavn.jamja.module.AppInfoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends MultiDexApplication implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.asList(
                    new MainReactPackage(),
                    new BackgroundGeolocationPackage(),
                    new CodePush(JJConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG),
                    new RNGestureHandlerPackage(),
                    new RNInsiderPackage(),
                    new FastImageViewPackage(),
                    new LottiePackage(),
                    new GoogleAnalyticsBridgePackage(),
                    new RNVersionNumberPackage(),
                    new VectorIconsPackage(),
                    new MapsPackage(),
                    new LinearGradientPackage(),
                    new RNI18nPackage(),
                    new FBSDKPackage(mCallbackManager),
                    new SvgPackage(),
                    new Interactable(),
                    new ReactNativeOneSignalPackage(),
                    new AppInfoPackage(),

                    new RNFirebaseMessagingPackage(),
                    new RNFirebaseNotificationsPackage(),
                    new RNFirebasePerformancePackage(),
                    new RNFirebaseCrashlyticsPackage(),
                    new RNFirebasePackage(),
                    new RNFirebaseAnalyticsPackage(),
                    new RNFirebaseRemoteConfigPackage(),
                    new RNFirebaseLinksPackage(),
                    new RNFirebaseInvitesPackage(),
                    new RNFirebaseAuthPackage(),
                    new JJLocationPackage(),
                    new OldUserStoragePackage(),
                    new RealmReactPackage(),
                    new SensorPackage(),
                    new SoundPackage(),
                    new CommonPackage(),
                    new JJViewPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Nullable
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Crashlytics crashlyticsKit = new Crashlytics.Builder()
                .core(new CrashlyticsCore.Builder().disabled(BuildConfig.DEBUG).build())
//            .core(new CrashlyticsCore.Builder().build())
                .build();

        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        Fabric.with(this, crashlyticsKit);
        FirebaseApp.initializeApp(this);
        SoLoader.init(this, /* native exopackage */ false);
    }

    @Override
    public void onTrimMemory(int level) {
        super.onTrimMemory(level);
        try {
            Fresco.getImagePipeline().clearMemoryCaches();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        try {
            Fresco.getImagePipeline().clearMemoryCaches();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
