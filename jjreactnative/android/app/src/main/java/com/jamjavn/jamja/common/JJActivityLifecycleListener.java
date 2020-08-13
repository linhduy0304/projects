package com.jamjavn.jamja.common;

import android.content.Intent;

/**
 * Created by sinhphan on 9/24/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public interface JJActivityLifecycleListener {

    void onActivityResult(int requestCode, int resultCode, Intent data);

    void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults);

    void onResume();

    void onPause();

    void onStop();

    void onDestroy();
}
