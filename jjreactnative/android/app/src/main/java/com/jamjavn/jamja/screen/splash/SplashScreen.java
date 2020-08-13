package com.jamjavn.jamja.screen.splash;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.jamjavn.jamja.R;

/**
 * Created by sinhphan on 11/1/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class SplashScreen extends NormalSplashScreen {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.view_splashscreen, container, false);
    }
}
