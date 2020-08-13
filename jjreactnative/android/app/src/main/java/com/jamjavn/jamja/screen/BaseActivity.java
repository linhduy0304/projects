package com.jamjavn.jamja.screen;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;

/**
 * Created by sinhphan on 11/26/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class BaseActivity extends AppCompatActivity {

    private boolean created = false;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        created = true;
    }

    @Override
    public void onDetachedFromWindow() {
        created = false;
        super.onDetachedFromWindow();
    }

    @Override
    protected void onDestroy() {
        created = false;
        super.onDestroy();
    }

    public boolean isAvailable() {
        return getApplicationContext() != null && !isFinishing() && created;
    }
}
