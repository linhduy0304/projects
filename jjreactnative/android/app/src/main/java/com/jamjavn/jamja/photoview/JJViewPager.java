package com.jamjavn.jamja.photoview;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.view.MotionEvent;

/**
 * Created by sinhphan on 12/12/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class JJViewPager extends ViewPager {

    public JJViewPager(@NonNull Context context) {
        super(context);
    }

    public JJViewPager(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        try {
            return super.onInterceptTouchEvent(ev);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
