package com.jamjavn.jamja.module.manager.common;

import android.content.Context;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;
import com.google.gson.Gson;
import com.jamjavn.jamja.util.Constant;
import com.jamjavn.jamja.util.ObjectUtil;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by sinhphan on 11/27/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class DeeplinkUrlDetectUtil {

    public static final String TAG = "DeeplinkUrlDetectUtil";

    public static boolean detectUri(Context context, Uri uri) {
        try {
            if (context == null || uri == null) return false;

            String url = uri.toString();

            String deepLink = uri.getQueryParameter("deeplink");

            if (deepLink != null) {
                try {
                    url = URLDecoder.decode(deepLink, "UTF-8");
                    uri = Uri.parse(url);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            if (uri.getScheme() != null && uri.getScheme().contains("jamjalinks")) {
                DeeplinkUrlDetectUtil.detectUrlScheme(context, uri, url);
                return true;
            }

            if (url.contains(".page.link/")) {
                DeeplinkUrlDetectUtil.fetchDynamicLinks(context, uri);
                return true;
            }

            List<String> paths = uri.getPathSegments();

            Log.i(TAG,
                    "detectUri: " + url +
                            "\ngetAuthority: " + uri.getAuthority() +
                            "\ngetEncodedAuthority: " + uri.getEncodedAuthority() +
                            "\ngetEncodedFragment: " + uri.getEncodedFragment() +
                            "\ngetEncodedPath: " + uri.getEncodedPath() +
                            "\ngetEncodedQuery: " + uri.getEncodedQuery() +
                            "\ngetEncodedSchemeSpecificPart: " + uri.getEncodedSchemeSpecificPart() +
                            "\ngetEncodedUserInfo: " + uri.getEncodedUserInfo() +
                            "\ngetFragment: " + uri.getFragment() +
                            "\ngetLastPathSegment: " + uri.getLastPathSegment() +
                            "\ngetHost: " + uri.getHost() +
                            "\ngetPath: " + uri.getPath() +
                            "\ngetPathSegments: " + uri.getPathSegments() +
                            "\ngetPort: " + uri.getPort() +
                            "\ngetQuery: " + uri.getQuery() +
                            "\ngetQueryParameterNames: " + uri.getQueryParameterNames() +
                            "\ngetScheme: " + uri.getScheme() +
                            "\ngetSchemeSpecificPart: " + uri.getSchemeSpecificPart() +
                            "\ngetUserInfo: " + uri.getUserInfo()
            );

            if (uri.getQueryParameter("deeplink") != null) {
                DeeplinkUrlDetectUtil.detectUri(context, Uri.parse(uri.getQueryParameter("deeplink")));
                return true;
            }

            if (paths == null || paths.size() < 1) {
                openWebView(context, url);
                return true;
            }

            if (paths.size() == 1) {
                detectUrlWithOnePath(context, url, paths);
                return true;
            }
            else if (paths.size() == 2) {
                detectUrlWithTwoPath(context, url, paths);
                return true;
            }
            else if (paths.size() == 3) {
                detectUrlWithThreePath(context, url, paths);
                return true;
            }

            openWebView(context, url);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    public static void fetchDynamicLinks(Context context, Uri uri) {
        try {
            if (uri == null) return;

            FirebaseDynamicLinks.getInstance()
                    .getDynamicLink(uri)
                    .addOnCompleteListener(task -> {
                        if (task.isSuccessful() && task.getResult() != null) {
                            DeeplinkUrlDetectUtil.detectUri(context, task.getResult().getLink());
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void detectUrlWithOnePath(Context context, String url, List<String> paths) {
        try {
            String path1 = paths.get(0);

            if (path1.contains("bo-suu-tap")) {
                emitEventWithOnlyAction("open_collection_list", url);
            }
            else if (path1.contains("doc-quyen")) {
                emitEventWithOnlyAction("open_exclusive_category", url);
            }
            else if (path1.contains("ma-giam-gia")) {
                emitEventWithOnlyAction("open_ecoupon_category", url);
            }
            else {
                openWebView(context, url);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void detectUrlWithTwoPath(Context context, String url, List<String> paths) {
        try {
            String path1 = paths.get(0);
            String path2 = paths.get(1);

            if (path1.contains("bo-suu-tap")) {
                emitEventWithSlug("open_collection_detail", url, path2);
            }
            else if (path1.contains("khuyen-mai")) {
                emitEventWithSlug("open_brand_detail", url, path2);
            }
            else if (path1.contains("thuong-hieu")) {
                emitEventWithSlug("open_brand_detail", url, path2);
            }
            else {
                openWebView(context, url);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void detectUrlWithThreePath(Context context, String url, List<String> paths) {
        try {
            String path1 = paths.get(0);
            String path3 = paths.get(2);

            if (path1.contains("khuyen-mai")) {
                emitEventWithSlug("open_deal_detail", url, path3);
            }
            else {
                openWebView(context, url);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void detectUrlScheme(Context context, Uri uri, String url) {
        try {
            if (uri.getHost() == null) return;

            switch (uri.getHost()) {
                case "dealdetail":
                    emitEventWithSlug("open_deal_detail", url, uri.getQueryParameter("slug"));
                    return;

                case "coupon":
                    emitEventWithOnlyAction("open_coupon_detail", url);
                    return;

                case "collection":
                    emitEventWithSlug("open_collection_detail", url, uri.getQueryParameter("slug"));
                    return;

                case "category-page":
                    emitEventWithOnlyAction("open_category", url);
                    return;

                case "game":
                    emitEventWithOnlyAction("open_game", url);
                    return;

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void openWebView(Context context, String url) {
        try {
            Log.i(TAG, "openWebView: " + url);
            if (context == null || url == null) return;

            emitEventWithOnlyAction("open_web_view", url);
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(context, Constant.UNKNOW_ERROR_MESSAGE, Toast.LENGTH_LONG).show();
        }
    }

    public static void emitEventWithSlug(String action, String url, String slug) {
        try {
            if (CommonManager.getInstance() == null) return;

            if (slug != null) {
                EventWithSlugData event = new EventWithSlugData();
                event.setAction(action);
                event.setUrl(url);
                event.setSlug(slug);

                CommonManager.getInstance().getReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(CommonManager.COMMON_COMMAND_EVENT, ObjectUtil.convertObjectToWritableMap(event));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void emitEventWithOnlyAction(String action, String url) {
        try {
            if (CommonManager.getInstance() == null) return;

            if (action != null) {
                CommonEventData event = new CommonEventData();
                event.setAction(action);
                event.setUrl(url);

                CommonManager.getInstance().getReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(CommonManager.COMMON_COMMAND_EVENT, ObjectUtil.convertObjectToWritableMap(event));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
