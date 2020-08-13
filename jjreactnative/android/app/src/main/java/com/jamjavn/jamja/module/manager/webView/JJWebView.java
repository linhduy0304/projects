package com.jamjavn.jamja.module.manager.webView;

import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.support.constraint.ConstraintLayout;
import android.support.v4.content.ContextCompat;
import android.support.v4.widget.SwipeRefreshLayout;
import android.util.AttributeSet;
import android.util.Log;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.jamjavn.jamja.R;
import com.jamjavn.jamja.module.manager.common.CommonManager;
import com.jamjavn.jamja.module.manager.common.EventWithSlugData;
import com.jamjavn.jamja.util.ObjectUtil;

import java.util.HashMap;
import java.util.Locale;

/**
 * Created by sinhphan on 11/26/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class JJWebView extends ConstraintLayout implements WebViewClientListener {

    private WebView webView;
    private SwipeRefreshLayout swipeRefreshLayout;
    private String instanceId;
    private String lastPaymentHandleUrl;
    private String originUserAgent;
    private final String CUSTOM_USER_AGENT = "app_web_android";

    public JJWebView(Context context) {
        super(context);
        init();
    }

    public JJWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public JJWebView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        inflate(getContext(), R.layout.view_webview, this);

        Log.i("JJWebView", "JJWebView:init");

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
            CookieSyncManager.createInstance(getContext());
        }

        webView = findViewById(R.id.web_view);
        swipeRefreshLayout = findViewById(R.id.swipe_refresh_layout);
        swipeRefreshLayout.setOnRefreshListener(() -> {
            if (webView != null) webView.reload();
        });
        setupWebView();
    }

    private void setupWebView() {
        try {
            CookieSyncManager.createInstance(getContext());
            CookieSyncManager.getInstance().run();
            CookieManager.getInstance().setAcceptCookie(true);
            CookieManager.getInstance().setAcceptFileSchemeCookies(true);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);
            }

            WebSettings settings = webView.getSettings();

            originUserAgent = settings.getUserAgentString();

            settings.setAppCacheEnabled(true);
            settings.setAllowUniversalAccessFromFileURLs(true);
            settings.setAllowContentAccess(true);
            settings.setDomStorageEnabled(true);
            settings.setJavaScriptEnabled(true);
            settings.setJavaScriptCanOpenWindowsAutomatically(true);
            settings.setLoadWithOverviewMode(true);
            settings.setLoadsImagesAutomatically(true);
            settings.setMediaPlaybackRequiresUserGesture(true);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                settings.setOffscreenPreRaster(true);
            }
            settings.setUserAgentString(String.format(Locale.getDefault(), "%s;%s", this.originUserAgent, CUSTOM_USER_AGENT));

            webView.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.background_grey_1));
            webView.setWebViewClient(new AppWebViewClient(this));
            webView.setWebChromeClient(new AppWebChromeClient());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setSource(ReadableMap source) {
        try {
            if (webView == null || source == null) return;

            if (!source.hasKey("url")) return;

            if (source.hasKey("instanceId")) {
                instanceId = source.getString("instanceId");
            }

//            boolean disableCustomUserAgent = false;
//            if (source.hasKey("disableCustomUserAgent")) {
//                disableCustomUserAgent = source.getBoolean("disableCustomUserAgent");
//                if (webView.getSettings() != null) {
//                    webView.getSettings().setUserAgentString(disableCustomUserAgent ? this.originUserAgent : CUSTOM_USER_AGENT);
//                }
//            }

            String url = source.getString("url");

            swipeRefreshLayout.setEnabled(!(source.hasKey("disableRefresh") && source.getBoolean("disableRefresh")));

            HashMap<String, String> headerMap = new HashMap<>();

            try {
                if (source.hasKey("headers")) {
                    ReadableMap headers = source.getMap("headers");
                    ReadableMapKeySetIterator iter = headers.keySetIterator();
                    while (iter.hasNextKey()) {
                        String key = iter.nextKey();
                        if ("user-agent".equals(key.toLowerCase(Locale.ENGLISH))) {
//                            if (webView.getSettings() != null && !disableCustomUserAgent) {
//                                webView.getSettings().setUserAgentString(getString(headers, key));
//                            }
                        } else {
                            headerMap.put(key, getString(headers, key));
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            webView.loadUrl(url, headerMap);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String getString(ReadableMap headers, String key) {
        try {
            return headers.getString(key);
        } catch (Exception e) {
            return getDouble(headers, key);
        }
    }

    private String getDouble(ReadableMap headers, String key) {
        try {
            return String.valueOf(headers.getDouble(key));
        } catch (Exception e) {
            return getInt(headers, key);
        }
    }

    private String getInt(ReadableMap headers, String key) {
        try {
            return String.valueOf(headers.getInt(key));
        } catch (Exception e) {
            return "";
        }
    }

    @Override
    public void onPageFinished() {
        if (swipeRefreshLayout != null && swipeRefreshLayout.isRefreshing()) swipeRefreshLayout.setRefreshing(false);
    }

    @Override
    public void onPaymentHandler(String url) {
        if (instanceId == null) return;
        if (url == null || !url.contains("jamja.vn/payment/vnpay-return/")) return;

        if (url.equals(this.lastPaymentHandleUrl)) return;

        Log.e("JJWebView", "onPaymentHandler__1:" +
                "\nlastPaymentHandleUrl: " + this.lastPaymentHandleUrl +
                "\nurl: " + url +
                "\nequals: " + url.equals(this.lastPaymentHandleUrl)
        );

        try {
            if (CommonManager.getInstance() == null) return;

            Uri uri = Uri.parse(url);

            String slug = uri.getQuery();

            Log.e("JJWebView", "onPaymentHandler: " + slug);

            EventWithSlugData event = new EventWithSlugData();
            event.setId(instanceId);
            event.setAction("payment_action");
            event.setUrl(url);
            event.setSlug(slug);

            this.lastPaymentHandleUrl = url;

            CommonManager.getInstance().getReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(CommonManager.COMMON_COMMAND_EVENT, ObjectUtil.convertObjectToWritableMap(event));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
