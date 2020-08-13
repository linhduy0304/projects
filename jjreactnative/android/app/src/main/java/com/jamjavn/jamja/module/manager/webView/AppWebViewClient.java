package com.jamjavn.jamja.module.manager.webView;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.os.Message;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.ClientCertRequest;
import android.webkit.HttpAuthHandler;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.jamjavn.jamja.module.manager.common.DeeplinkUrlDetectUtil;

/**
 * Created by sinhphan on 11/26/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class AppWebViewClient extends WebViewClient {

    private final String TAG = "AppWebViewClient";

    private WebViewClientListener listener;

    AppWebViewClient(WebViewClientListener listener) {
        this.listener = listener;
        Log.i(TAG, "AppWebViewClient:init");
    }

    @Override
    public void onFormResubmission(WebView view, Message dontResend, Message resend) {
        log("onFormResubmission", dontResend, resend);
        super.onFormResubmission(view, dontResend, resend);
    }

    //Call when resource is loading
//    @Override
//    public void onLoadResource(WebView view, String url) {
//        log("onLoadResource", url);
//        super.onLoadResource(view, url);
//    }

    @Override
    public void onPageCommitVisible(WebView view, String url) {
        log("onPageCommitVisible", url);
        super.onPageCommitVisible(view, url);
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        log("onPageFinished", url);
        if (this.listener != null) this.listener.onPageFinished();
        super.onPageFinished(view, url);
    }

    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        log("onPageStarted", url);
        super.onPageStarted(view, url, favicon);
    }

    @Override
    public void onReceivedClientCertRequest(WebView view, ClientCertRequest request) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            log("onReceivedClientCertRequest", request.getHost());
        }
        super.onReceivedClientCertRequest(view, request);
    }

    @Override
    public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
        log("onReceivedError", error);
        super.onReceivedError(view, request, error);
    }

    @Override
    public void onReceivedHttpAuthRequest(WebView view, HttpAuthHandler handler, String host, String realm) {
        log("onReceivedHttpAuthRequest", host, realm);
        super.onReceivedHttpAuthRequest(view, handler, host, realm);
    }

    @Override
    public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            log("onReceivedHttpError", request.getUrl());
        }
        super.onReceivedHttpError(view, request, errorResponse);
    }

    @Override
    public void onReceivedLoginRequest(WebView view, String realm, @Nullable String account, String args) {
        log("onReceivedLoginRequest", account, args);
        super.onReceivedLoginRequest(view, realm, account, args);
    }

    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        log("onReceivedSslError", error);
        super.onReceivedSslError(view, handler, error);
    }

    @Override
    public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
        log("onRenderProcessGone");
        return super.onRenderProcessGone(view, detail);
    }

    @Override
    public boolean shouldOverrideKeyEvent(WebView view, KeyEvent event) {
        log("shouldOverrideKeyEvent", event.getAction());
        return super.shouldOverrideKeyEvent(view, event);
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Boolean isRedirect = null;
            String url = request.getUrl().toString();

            //enable payment redirect
            if (url.contains("vnpay.vn/") || url.contains("vnpayment.vn/") || url.contains("jamja.vn/payment/")) {
                if (this.listener != null) this.listener.onPaymentHandler(url);
                return super.shouldOverrideUrlLoading(view, request);
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                isRedirect = request.isRedirect();
            }
            log("shouldOverrideUrlLoading", url, isRedirect, request.isForMainFrame(), request.hasGesture());
            if (request.hasGesture()) {
                if (!url.contains("http") && !url.contains("https")) {
                    openIntent(view, url);
                    return true;
                }
                else {
                    DeeplinkUrlDetectUtil.detectUri(view.getContext(), request.getUrl());
                    return true;
                }
            }
        }
        return super.shouldOverrideUrlLoading(view, request);
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        try {
            log("shouldOverrideUrlLoading", url, view.getHitTestResult().getType(), view.getHitTestResult().getExtra());

            //enable payment redirect
            if (url.contains("vnpay.vn/") || url.contains("vnpayment.vn/") || url.contains("jamja.vn/payment/")) {
                if (this.listener != null) this.listener.onPaymentHandler(url);
                return super.shouldOverrideUrlLoading(view, url);
            }

            if (view.getHitTestResult() == null || view.getHitTestResult().getType() <= 0) {
                return super.shouldOverrideUrlLoading(view, url);
            }
            if (!url.contains("http") && !url.contains("https")) {
                openIntent(view, url);
                return true;
            }
            else {
                DeeplinkUrlDetectUtil.detectUri(view.getContext(), Uri.parse(url));
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.shouldOverrideUrlLoading(view, url);
    }

    private void openIntent(WebView view, String url) {
        try {
            Context context = view.getContext();
            Intent intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
            PackageManager packageManager = context.getPackageManager();
            ResolveInfo info = packageManager.resolveActivity(intent, PackageManager.MATCH_DEFAULT_ONLY);

            Log.i("JAMJA", "openIntent: " + url + " / " + info);
            if (info != null) {
                context.startActivity(intent);
            } else {
                String fallbackUrl = intent.getStringExtra("browser_fallback_url");
                view.loadUrl(fallbackUrl);
                // or call external broswer
//                    Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(fallbackUrl));
//                    context.startActivity(browserIntent);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void log(Object...args) {
        if (args == null || args.length < 1) return;
        StringBuilder message = new StringBuilder();
        for (Object s : args) {
            message.append(s).append("\n");
        }
        Log.e(TAG, message.toString());
    }
}
