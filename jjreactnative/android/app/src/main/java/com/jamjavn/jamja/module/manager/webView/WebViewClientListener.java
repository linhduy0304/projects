package com.jamjavn.jamja.module.manager.webView;

/**
 * Created by sinhphan on 11/27/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public interface WebViewClientListener {

    void onPageFinished();

    void onPaymentHandler(String url);
}
