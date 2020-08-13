package com.jamjavn.jamja;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;


import java.security.MessageDigest;

/**
 * Created by Sinh Phan on 9/23/2017.
 * Email: pnsinh.hg92@gmail.com
 **/

public class KeyHash {
    @SuppressLint("PackageManagerGetSignatures")
    public static String printKeyHash(Context context) {
        Log.e("===", "========================");
        PackageInfo packageInfo;
        String key = null;
        String keyMd5 = null;
        try {
            //getting application package name, as defined in manifest
            String packageName = context.getPackageName();

            //Retriving package info
            packageInfo = context.getPackageManager().getPackageInfo(packageName,
                    PackageManager.GET_SIGNATURES);

            Log.e("Package Name=", context.getPackageName());

            for (Signature signature : packageInfo.signatures) {
                MessageDigest md = MessageDigest.getInstance("SHA");
                md.update(signature.toByteArray());
                key = new String(Base64.encode(md.digest(), 0));

                MessageDigest md5 = MessageDigest.getInstance("MD5");
                md5.update(signature.toByteArray());
                keyMd5 = new String(Base64.encode(md5.digest(), 0));

                // String key = new String(Base64.encodeBytes(md.digest()));
                Log.d("JAMJA", "KEYHASH: " + key + "\nSHA1: " + keyMd5);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return key;
    }
}