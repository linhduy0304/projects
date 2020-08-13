package com.jamjavn.jamja.screen.image;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;


import com.bumptech.glide.Glide;
import com.bumptech.glide.RequestManager;
import com.jamjavn.jamja.model.Image;
import com.jamjavn.jamja.photoview.JJViewPager;
import com.jamjavn.jamja.screen.BaseActivity;
import com.jamjavn.jamja.R;
import com.jamjavn.jamja.util.BundleKey;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;


/**
 * Created by sinhphan on 12/11/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class ImagePreviewActivity extends BaseActivity implements View.OnClickListener, ViewPager.OnPageChangeListener {

    private JJViewPager viewPager;
    private RequestManager requestManager;
    private TextView textViewCount;
    private int totalCount = 0;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_preview);

        Window window = getWindow();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.setStatusBarColor(Color.TRANSPARENT);
            window.getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_IMMERSIVE
            );
        }
        else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
            window.getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_IMMERSIVE
            );
        }
        else {
            window.setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        }

        viewPager = findViewById(R.id.view_pager);
        textViewCount = findViewById(R.id.text_view_count);
        findViewById(R.id.button_close).setOnClickListener(this);

        if (getIntent() != null && getIntent().getExtras() != null) {

            List<String> images = getIntent().getExtras().getStringArrayList(BundleKey.IMAGES);
            if (images == null) return;

            List<Image> imageList = new ArrayList<>();
            for (String image : images) {
                imageList.add(new Image(image));
            }

            requestManager = Glide.with(ImagePreviewActivity.this);

            Log.i("JAMJA", "images: " + images);

            totalCount = imageList.size();

            ImagePreviewAdapter adapter = new ImagePreviewAdapter(imageList, requestManager);
            viewPager.setAdapter(adapter);
            viewPager.addOnPageChangeListener(this);

            int initPos = getIntent().getIntExtra(BundleKey.POSITION, 0);
            viewPager.setCurrentItem(initPos);

            textViewCount.setText(String.format(Locale.getDefault(), "%d/%d", initPos + 1, totalCount));
        }
    }

    @Override
    protected void onDestroy() {
        try {
            if (requestManager != null) {
                requestManager.onDestroy();
            }
            Glide.get(ImagePreviewActivity.this).clearMemory();
            viewPager.clearOnPageChangeListeners();
        } catch (Exception e) {
            e.printStackTrace();
        }
        super.onDestroy();
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.button_close:
                onBackPressed();
                return;
        }
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

    }

    @Override
    public void onPageSelected(int position) {
        if (textViewCount != null) {
            textViewCount.setText(String.format(Locale.getDefault(), "%d/%d", position + 1, totalCount));
        }
    }

    @Override
    public void onPageScrollStateChanged(int state) {

    }
}
