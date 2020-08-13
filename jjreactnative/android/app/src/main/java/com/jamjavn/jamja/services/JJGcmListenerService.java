package com.jamjavn.jamja.services;

import android.os.Bundle;
import android.util.Log;

import com.google.android.gms.gcm.GcmListenerService;

/**
 * Created by Sinhpn on 08/20/2018.
 * Email: pnsinh.hg92@gmail.com
 */
public class JJGcmListenerService extends GcmListenerService {

    @Override
    public void onMessageReceived(String s, Bundle bundle) {
        Log.e("JAMJA", "JJGcmListenerService:onMessageReceived:" + bundle);
        super.onMessageReceived(s, bundle);
    }
}
