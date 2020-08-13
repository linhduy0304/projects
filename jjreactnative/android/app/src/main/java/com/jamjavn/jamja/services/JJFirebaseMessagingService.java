package com.jamjavn.jamja.services;

import android.content.ComponentName;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;

import com.facebook.appevents.AppEventsLogger;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.messaging.RemoteMessage;
import com.google.gson.Gson;

import io.invertase.firebase.analytics.RNFirebaseAnalytics;
import io.invertase.firebase.messaging.RNFirebaseMessagingService;

/**
 * Created by Sinhpn on 08/20/2018.
 * Email: pnsinh.hg92@gmail.com
 */
public class JJFirebaseMessagingService extends RNFirebaseMessagingService {

    @Override
    public void onNewToken(String s) {
        super.onNewToken(s);
        try {
            Log.e("JAMJA", "JJFirebaseMessagingService:onNewToken:" + s);
            AppEventsLogger.setPushNotificationsRegistrationId(s);
        } catch (Exception e) {
            Log.e("JAMJA", "JJFirebaseMessagingService:onNewToken:", e);
        }
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {

        Log.d(
                "JAMJA",
                "JJFirebaseMessagingService:onMessageReceived: \n" + remoteMessage +
                        "\ngetFrom: " + remoteMessage.getFrom() +
                        "\ngetTo: " + remoteMessage.getTo() +
                        "\ngetCollapseKey: " + remoteMessage.getCollapseKey() +
                        "\ngetMessageId: " + remoteMessage.getMessageId() +
                        "\ngetMessageType: " + remoteMessage.getMessageType() +
                        "\ngetOriginalPriority: " + remoteMessage.getOriginalPriority() +
                        "\ngetSentTime: " + remoteMessage.getSentTime() +
                        "\ngetTtl: " + remoteMessage.getTtl() +
                        "\ngetData: " + remoteMessage.getData() +
                        "\ngetNotification: " + remoteMessage.getNotification()

        );

        logReceiveToFirebaseAnalytics(remoteMessage);

        super.onMessageReceived(remoteMessage);
    }

    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();

        Log.e("JAMJA", "JJFirebaseMessagingService:onDeletedMessages");
    }

    @Override
    public void onMessageSent(String s) {
        super.onMessageSent(s);
        Log.e("JAMJA", "JJFirebaseMessagingService:onMessageSent:" + s);
    }

    @Override
    public void onSendError(String s, Exception e) {
        super.onSendError(s, e);
        Log.e("JAMJA", "JJFirebaseMessagingService:onSendError:" + s, e);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Log.e("JAMJA", "JJFirebaseMessagingService:onConfigurationChanged:" + newConfig);
    }

    @Override
    public ComponentName startForegroundService(Intent service) {
        Log.e("JAMJA", "JJFirebaseMessagingService:startForegroundService:" + service.getAction());
        return super.startForegroundService(service);
    }

    private void logReceiveToFirebaseAnalytics(RemoteMessage remoteMessage) {

        if (getApplicationContext() == null) return;

        try {

            Bundle params = new Bundle();

            params.putString("collector", "jamja");
            params.putString("nof_from", remoteMessage.getFrom());
            params.putString("nof_to", remoteMessage.getTo());
            params.putLong("nof_sent_time", remoteMessage.getSentTime());
            params.putString("nof_message_id", remoteMessage.getMessageId());

            if (remoteMessage.getMessageType() != null) {
                params.putString("nof_message_type", remoteMessage.getMessageType());
            }
            else {
                params.putString("nof_message_type", remoteMessage.getNotification() == null ? "DATA_MESSAGE" : "DISPLAY_NOTIFICATION");
            }

            FirebaseAnalytics
                    .getInstance(getApplicationContext())
                    .logEvent("nof_receive", params);


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
