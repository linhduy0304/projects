package com.jamjavn.jamja.module.manager.common;

/**
 * Created by sinhphan on 11/26/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class EventWithSlugData extends CommonEventData {

    private String slug;

    public EventWithSlugData(){}

    public EventWithSlugData(String action, String url, String slug) {
        setAction(action);
        setUrl(url);
        setSlug(slug);
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }
}
