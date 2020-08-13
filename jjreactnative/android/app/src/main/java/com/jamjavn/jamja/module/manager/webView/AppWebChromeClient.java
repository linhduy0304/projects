package com.jamjavn.jamja.module.manager.webView;

import android.graphics.Bitmap;
import android.os.Build;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.GeolocationPermissions;
import android.webkit.JsPromptResult;
import android.webkit.JsResult;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

/**
 * Created by sinhphan on 11/26/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class AppWebChromeClient extends WebChromeClient {

    private final String TAG = "AppWebChromeClient";

    /**
     * Tell the host application the current progress of loading a page.
     * @param view The WebView that initiated the callback.
     * @param newProgress Current page loading progress, represented by
     *                    an integer between 0 and 100.
     */
    public void onProgressChanged(WebView view, int newProgress) {
        log("onProgressChanged", newProgress, view.getUrl(), view.getTitle());
    }

    /**
     * Notify the host application of a change in the document title.
     * @param view The WebView that initiated the callback.
     * @param title A String containing the new title of the document.
     */
    public void onReceivedTitle(WebView view, String title) {
        log("onReceivedTitle", title);
    }

    /**
     * Notify the host application of a new favicon for the current page.
     * @param view The WebView that initiated the callback.
     * @param icon A Bitmap containing the favicon for the current page.
     */
    public void onReceivedIcon(WebView view, Bitmap icon) {
        log("onReceivedIcon");
    }

    /**
     * Notify the host application of the url for an apple-touch-icon.
     * @param view The WebView that initiated the callback.
     * @param url The icon url.
     * @param precomposed {@code true} if the url is for a precomposed touch icon.
     */
    public void onReceivedTouchIconUrl(WebView view, String url,
                                       boolean precomposed) {

        log("onReceivedTouchIconUrl", url, precomposed);
    }

    /**
     * Notify the host application that the current page has entered full
     * screen mode. The host application must show the custom View which
     * contains the web contents &mdash; video or other HTML content &mdash;
     * in full screen mode. Also see "Full screen support" documentation on
     * {@link WebView}.
     * @param view is the View object to be shown.
     * @param callback invoke this callback to request the page to exit
     * full screen mode.
     */
    public void onShowCustomView(View view, WebChromeClient.CustomViewCallback callback) {
        log("onShowCustomView");
    }

    /**
     * Notify the host application that the current page has exited full
     * screen mode. The host application must hide the custom View, ie. the
     * View passed to {@link #onShowCustomView} when the content entered fullscreen.
     * Also see "Full screen support" documentation on {@link WebView}.
     */
    public void onHideCustomView() {
        log("onHideCustomView");
    }

    /**
     * Request the host application to create a new window. If the host
     * application chooses to honor this request, it should return {@code true} from
     * this method, create a new WebView to host the window, insert it into the
     * View system and send the supplied resultMsg message to its target with
     * the new WebView as an argument. If the host application chooses not to
     * honor the request, it should return {@code false} from this method. The default
     * implementation of this method does nothing and hence returns {@code false}.
     * <p>
     * Applications should typically not allow windows to be created when the
     * {@code isUserGesture} flag is false, as this may be an unwanted popup.
     * <p>
     * Applications should be careful how they display the new window: don't simply
     * overlay it over the existing WebView as this may mislead the user about which
     * site they are viewing. If your application displays the URL of the main page,
     * make sure to also display the URL of the new window in a similar fashion. If
     * your application does not display URLs, consider disallowing the creation of
     * new windows entirely.
     * <p class="note"><b>Note:</b> There is no trustworthy way to tell which page
     * requested the new window: the request might originate from a third-party iframe
     * inside the WebView.
     *
     * @param view The WebView from which the request for a new window
     *             originated.
     * @param isDialog {@code true} if the new window should be a dialog, rather than
     *                 a full-size window.
     * @param isUserGesture {@code true} if the request was initiated by a user gesture,
     *                      such as the user clicking a link.
     * @param resultMsg The message to send when once a new WebView has been
     *                  created. resultMsg.obj is a
     *                  {@link WebView.WebViewTransport} object. This should be
     *                  used to transport the new WebView, by calling
     *                  {@link WebView.WebViewTransport#setWebView(WebView)
     *                  WebView.WebViewTransport.setWebView(WebView)}.
     * @return This method should return {@code true} if the host application will
     *         create a new window, in which case resultMsg should be sent to
     *         its target. Otherwise, this method should return {@code false}. Returning
     *         {@code false} from this method but also sending resultMsg will result in
     *         undefined behavior.
     */
    public boolean onCreateWindow(WebView view, boolean isDialog,
                                  boolean isUserGesture, Message resultMsg) {

        log("onCreateWindow", isDialog, isUserGesture, resultMsg);
        return false;
    }

    /**
     * Request display and focus for this WebView. This may happen due to
     * another WebView opening a link in this WebView and requesting that this
     * WebView be displayed.
     * @param view The WebView that needs to be focused.
     */
    public void onRequestFocus(WebView view) {
        log("onRequestFocus");
    }

    /**
     * Notify the host application to close the given WebView and remove it
     * from the view system if necessary. At this point, WebCore has stopped
     * any loading in this window and has removed any cross-scripting ability
     * in javascript.
     * <p>
     * As with {@link #onCreateWindow}, the application should ensure that any
     * URL or security indicator displayed is updated so that the user can tell
     * that the page they were interacting with has been closed.
     *
     * @param window The WebView that needs to be closed.
     */
    public void onCloseWindow(WebView window) {
        log("onCloseWindow");
    }

    /**
     * Tell the client to display a javascript alert dialog.  If the client
     * returns {@code true}, WebView will assume that the client will handle the
     * dialog.  If the client returns {@code false}, it will continue execution.
     * @param view The WebView that initiated the callback.
     * @param url The url of the page requesting the dialog.
     * @param message Message to be displayed in the window.
     * @param result A JsResult to confirm that the user hit enter.
     * @return boolean Whether the client will handle the alert dialog.
     */
    public boolean onJsAlert(WebView view, String url, String message,
                             JsResult result) {

        log("onJsAlert", url, message, result);
        return false;
    }

    /**
     * Tell the client to display a confirm dialog to the user. If the client
     * returns {@code true}, WebView will assume that the client will handle the
     * confirm dialog and call the appropriate JsResult method. If the
     * client returns false, a default value of {@code false} will be returned to
     * javascript. The default behavior is to return {@code false}.
     * @param view The WebView that initiated the callback.
     * @param url The url of the page requesting the dialog.
     * @param message Message to be displayed in the window.
     * @param result A JsResult used to send the user's response to
     *               javascript.
     * @return boolean Whether the client will handle the confirm dialog.
     */
    public boolean onJsConfirm(WebView view, String url, String message,
                               JsResult result) {

        log("onJsConfirm", url, message, result);
        return false;
    }

    /**
     * Tell the client to display a prompt dialog to the user. If the client
     * returns {@code true}, WebView will assume that the client will handle the
     * prompt dialog and call the appropriate JsPromptResult method. If the
     * client returns false, a default value of {@code false} will be returned to to
     * javascript. The default behavior is to return {@code false}.
     * @param view The WebView that initiated the callback.
     * @param url The url of the page requesting the dialog.
     * @param message Message to be displayed in the window.
     * @param defaultValue The default value displayed in the prompt dialog.
     * @param result A JsPromptResult used to send the user's reponse to
     *               javascript.
     * @return boolean Whether the client will handle the prompt dialog.
     */
    public boolean onJsPrompt(WebView view, String url, String message,
                              String defaultValue, JsPromptResult result) {

        log("onJsPrompt", url, message, defaultValue, result);
        return false;
    }

    /**
     * Tell the client to display a dialog to confirm navigation away from the
     * current page. This is the result of the onbeforeunload javascript event.
     * If the client returns {@code true}, WebView will assume that the client will
     * handle the confirm dialog and call the appropriate JsResult method. If
     * the client returns {@code false}, a default value of {@code true} will be returned to
     * javascript to accept navigation away from the current page. The default
     * behavior is to return {@code false}. Setting the JsResult to {@code true} will navigate
     * away from the current page, {@code false} will cancel the navigation.
     * @param view The WebView that initiated the callback.
     * @param url The url of the page requesting the dialog.
     * @param message Message to be displayed in the window.
     * @param result A JsResult used to send the user's response to
     *               javascript.
     * @return boolean Whether the client will handle the confirm dialog.
     */
    public boolean onJsBeforeUnload(WebView view, String url, String message, JsResult result) {
        log("onJsBeforeUnload", url, message, result);
        return false;
    }

    /**
     * Notify the host application that web content from the specified origin
     * is attempting to use the Geolocation API, but no permission state is
     * currently set for that origin. The host application should invoke the
     * specified callback with the desired permission state. See
     * {@link GeolocationPermissions} for details.
     *
     * <p>Note that for applications targeting Android N and later SDKs
     * (API level > {@link android.os.Build.VERSION_CODES#M})
     * this method is only called for requests originating from secure
     * origins such as https. On non-secure origins geolocation requests
     * are automatically denied.
     *
     * @param origin The origin of the web content attempting to use the
     *               Geolocation API.
     * @param callback The callback to use to set the permission state for the
     *                 origin.
     */
    public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
        log("onGeolocationPermissionsShowPrompt", origin);
    }

    /**
     * Notify the host application that a request for Geolocation permissions,
     * made with a previous call to
     * {@link #onGeolocationPermissionsShowPrompt(String, GeolocationPermissions.Callback) onGeolocationPermissionsShowPrompt()}
     * has been canceled. Any related UI should therefore be hidden.
     */
    public void onGeolocationPermissionsHidePrompt() {
        log("onGeolocationPermissionsHidePrompt");
    }

    /**
     * Notify the host application that web content is requesting permission to
     * access the specified resources and the permission currently isn't granted
     * or denied. The host application must invoke {@link PermissionRequest#grant(String[])}
     * or {@link PermissionRequest#deny()}.
     *
     * If this method isn't overridden, the permission is denied.
     *
     * @param request the PermissionRequest from current web content.
     */
    public void onPermissionRequest(PermissionRequest request) {
        log("onPermissionRequest", request.toString());
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            request.deny();
        }
    }

    /**
     * Notify the host application that the given permission request
     * has been canceled. Any related UI should therefore be hidden.
     *
     * @param request the PermissionRequest that needs be canceled.
     */
    public void onPermissionRequestCanceled(PermissionRequest request) {
        log("onPermissionRequestCanceled", request.toString());
    }

    /**
     * Report a JavaScript console message to the host application. The ChromeClient
     * should override this to process the log message as they see fit.
     * @param consoleMessage Object containing details of the console message.
     * @return {@code true} if the message is handled by the client.
     */
    public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
        log("onConsoleMessage", consoleMessage.message(), consoleMessage.lineNumber(), consoleMessage.sourceId());
        return false;
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
