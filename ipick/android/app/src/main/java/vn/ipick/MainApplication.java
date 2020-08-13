package vn.ipick;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.magus.fblogin.FacebookLoginPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.react.rnspinkit.RNSpinkitPackage;
import cl.json.RNSharePackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; 
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FacebookLoginPackage(),
            new WebViewBridgePackage(),
            new RNFirebaseNotificationsPackage(),
            new PickerPackage(),
            new RNDeviceInfo(),
            new ReactNativeYouTube(),
            new RNSpinkitPackage(),
            new RNSharePackage(),
            new ImageResizerPackage(),
            new RNFetchBlobPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAnalyticsPackage(),
            new RNFirebaseMessagingPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
