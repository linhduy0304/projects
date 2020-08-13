package com.jamjavn.jamja.module.manager.location;

import android.location.Address;

/**
 * Created by sinhphan on 9/23/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class JJLocation {

    private double latitude;

    private double longitude;

    private Address address;

    public JJLocation() {}

    public JJLocation(double lat, double lon, Address addr) {
        this.latitude = lat;
        this.longitude = lon;
        this.address = addr;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
