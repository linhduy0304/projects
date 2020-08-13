package com.jamjavn.jamja.module.manager.location;

/**
 * Created by sinhphan on 9/23/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class JJLocationException extends Exception {

    public JJLocationException(String detailMessage, Throwable throwable) {
        super(detailMessage, throwable);
    }

    public JJLocationException(String detailMessage) {
        super(detailMessage);
    }
}
