package com.jamjavn.jamja;

import com.facebook.appevents.AppEventsLogger;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.iid.FirebaseInstanceId;
import com.jamjavn.jamja.common.JJActivityLifecycleListener;
import com.jamjavn.jamja.screen.splash.NormalSplashScreen;
import com.jamjavn.jamja.screen.splash.SplashScreen;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import android.app.FragmentTransaction;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import java.lang.ref.WeakReference;

public class MainActivity extends ReactActivity {

    private static WeakReference<MainActivity> mainActivityWeakReference;

    private JJActivityLifecycleListener activityLifecycleListener;

    private NormalSplashScreen splashScreen;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        super.onCreate(savedInstanceState);

        Log.e("JAMJA", "MainActivity:onCreate:" + getIntent());

        showSplash();

        Window window = getWindow();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.setStatusBarColor(Color.TRANSPARENT);
            window.getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
//                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                            | View.SYSTEM_UI_FLAG_IMMERSIVE
            );
        }
        else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
            window.getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
//                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                            | View.SYSTEM_UI_FLAG_IMMERSIVE
            );
        }
        else {
            window.setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        }

        if (mainActivityWeakReference != null) {
            mainActivityWeakReference.clear();
            mainActivityWeakReference = null;
        }
        mainActivityWeakReference = new WeakReference<>(this);

        KeyHash.printKeyHash(this);

        FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(MainActivity.this,  (instanceIdResult) -> {
            String newToken = instanceIdResult.getToken();
            try {
                Log.e("JAMJA", "MainActivity:onNewToken:" + newToken);
                AppEventsLogger.setPushNotificationsRegistrationId(newToken);
            } catch (Exception e) {
                Log.e("JAMJA", "MainActivity:onNewToken:", e);
            }
        });

        FirebaseAuth.getInstance().setLanguageCode("vi");
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    private void showSplash() {
        try {
//            Calendar calLimited = Calendar.getInstance();
//            calLimited.set(2018, 11, 30, 0, 0, 0);
//
//            Date dateLimited = calLimited.getTime();
//            Date currentDate = new Date();
//
//            if (currentDate.compareTo(dateLimited) >= 0) {
//                splashScreen = new NormalSplashScreen();
//            }
//            else {
//                splashScreen = new SplashScreen();
//            }

            splashScreen = new NormalSplashScreen();
            FragmentTransaction ft = getFragmentManager().beginTransaction();
            splashScreen.show(ft, NormalSplashScreen.TAG);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "JamJaReactNative";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
        if (activityLifecycleListener != null) activityLifecycleListener.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (activityLifecycleListener != null) activityLifecycleListener.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Log.e("JAMJA", "MainActivity:onNewIntent:" + intent);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (activityLifecycleListener != null) activityLifecycleListener.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (activityLifecycleListener != null) activityLifecycleListener.onPause();
    }

    @Override
    protected void onStop() {
        if (activityLifecycleListener != null) activityLifecycleListener.onStop();
        super.onStop();
    }

    @Override
    protected void onDestroy() {
        if (activityLifecycleListener != null) activityLifecycleListener.onDestroy();
        activityLifecycleListener = null;
        if (mainActivityWeakReference != null) {
            mainActivityWeakReference.clear();
            mainActivityWeakReference = null;
        }
        super.onDestroy();
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

    public void removeSplashView() {
        Log.i("JAMJA", "___removeSplashView");
        if (splashScreen == null) return;
        runOnUiThread(() -> {
            try {
                Window window = getWindow();
                if (window != null) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                    }
                    else {
                        getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
                    }
                }
                if (splashScreen == null) return;
                splashScreen.dismiss();
                splashScreen = null;
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public void addLifecycleListener(JJActivityLifecycleListener listener) {
        this.activityLifecycleListener = listener;
    }

    public static MainActivity getInstance() {
        if (mainActivityWeakReference == null) return null;
        return mainActivityWeakReference.get();
    }
}
