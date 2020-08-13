package com.jamjavn.jamja.screen.image;

import android.support.annotation.NonNull;
import android.support.v4.view.PagerAdapter;
import android.view.View;
import android.view.ViewGroup;

import com.bumptech.glide.RequestManager;
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions;
import com.bumptech.glide.request.RequestOptions;
import com.jamjavn.jamja.model.Image;
import com.jamjavn.jamja.photoview.PhotoView;

import java.util.List;

/**
 * Created by sinhphan on 12/11/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class ImagePreviewAdapter extends PagerAdapter {

    private List<Image> images;
    private RequestManager requestManager;

    public ImagePreviewAdapter(List<Image> imgs, RequestManager requestManager) {
        this.images = imgs;
        this.requestManager = requestManager;
    }

    @Override
    public int getCount() {
        return images != null ? images.size() : 0;
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {
        PhotoView photoView = new PhotoView(container.getContext());

        if (requestManager != null) {
            requestManager.load(images.get(position).getLink())
                    .apply(RequestOptions.fitCenterTransform())
                    .transition(DrawableTransitionOptions.withCrossFade())
                    .into(photoView);
        }

        container.addView(photoView, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        return photoView;
    }

    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        try {
            if (requestManager != null) requestManager.clear((View) object);
            container.removeView((View) object);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view == object;
    }
}
