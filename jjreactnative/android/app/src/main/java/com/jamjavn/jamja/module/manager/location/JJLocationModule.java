package com.jamjavn.jamja.module.manager.location;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.net.Uri;
import android.os.Looper;
import android.provider.Settings;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.PermissionChecker;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.SettingsClient;
import com.jamjavn.jamja.BuildConfig;
import com.jamjavn.jamja.MainActivity;
import com.jamjavn.jamja.common.JJActivityLifecycleListener;
import com.jamjavn.jamja.util.ObjectUtil;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Created by sinhphan on 9/23/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class JJLocationModule extends ReactContextBaseJavaModule implements JJActivityLifecycleListener {

    private final String MODULE_NAME = "JJLocation";
    private final String LOCATION_UPDATE_EVENT = "location_update_event_listener";

    private final int REQUEST_PERMISSIONS_REQUEST_CODE = 1011;
    private final int REQUEST_CHECK_SETTINGS = 100;
    private FusedLocationProviderClient fusedLocationClient = null;
    private SettingsClient locationSettings = null;
    private LocationRequest locationRequest = null;
    private boolean onlyLocation = false;


    public JJLocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        Log.d(MODULE_NAME, "init JJLocation Module");
    }

    @ReactMethod
    public void fetchLocation(boolean onlyLocation) {
        Log.i(MODULE_NAME, "fetchLocation...");
        if (!isRunning()) return;
        this.onlyLocation = onlyLocation;

        try {
            MainActivity mainActivity = MainActivity.getInstance();
            if (mainActivity != null) {
                mainActivity.addLifecycleListener(this);
            }
        } catch (Exception e) {
            Log.e(MODULE_NAME, "Add MainActivity Lifecycle listener exception", e);
        }

        if (!checkPermissions()) {
            startLocationPermissionRequest();
        } else {
            checkLocationSetting();
        }
    }

    @Override
    public Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<>();
        constants.put("LOCATION_UPDATE_EVENT", LOCATION_UPDATE_EVENT);
        return constants;
    }

    @SuppressLint("MissingPermission")
    private void getLastLocation() {
        Log.i(MODULE_NAME, "getLastLocation...");
        if (!isRunning()) return;

        if (fusedLocationClient == null) fusedLocationClient = LocationServices.getFusedLocationProviderClient(getCurrentActivity());

        fusedLocationClient.getLastLocation()
                .addOnCompleteListener(getCurrentActivity(), task -> {
                    if (!isRunning()) return;

                    Log.e(MODULE_NAME, "getLastLocation:response:complete:" + task.getResult());

                    if (task.isSuccessful() && task.getResult() != null) {
                        Log.d(MODULE_NAME, "Latitude:" + task.getResult().getLatitude());
                        Log.d(MODULE_NAME, "Longitude:" + task.getResult().getLongitude());

                        fetchAddressByLocation(task.getResult());
                    }
                    else {
                        Log.e(MODULE_NAME, "getLastLocation:exception", task.getException());
                        emitLocation(null, null);
                    }
                });
    }

    @SuppressLint("MissingPermission")
    private void getSingleLocationUpdate() {
        Log.i(MODULE_NAME, "getLocationUpdate...");
        if (!isRunning()) return;

        if (fusedLocationClient == null) fusedLocationClient = LocationServices.getFusedLocationProviderClient(getCurrentActivity());

        LocationCallback locationCallback = new LocationCallback() {

            @Override
            public void onLocationResult(LocationResult locationResult) {
                super.onLocationResult(locationResult);

                if (!isRunning()) return;

                if (locationResult != null) {
                    Log.i(MODULE_NAME, "onLocationResult:" + locationResult.getLastLocation());
                    fetchAddressByLocation(locationResult.getLastLocation());
                }
                else {
                    emitLocation(null, null);
                }
                fusedLocationClient.removeLocationUpdates(this);
            }
        };

        fusedLocationClient.requestLocationUpdates(getLocationRequest(), locationCallback, Looper.myLooper());
    }

    private void checkLocationSetting() {
        if (!isRunning()) return;

        if (locationSettings == null) locationSettings = LocationServices.getSettingsClient(getCurrentActivity());

        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder();
        builder.addLocationRequest(getLocationRequest());

        locationSettings.checkLocationSettings(builder.build())
                .addOnCompleteListener(getCurrentActivity(), task -> {
                    if (!isRunning()) return;

                    if (task.isSuccessful() && task.getResult() != null) {
                        Log.i(MODULE_NAME, "checkLocationSettings:result:" + task.getResult().getLocationSettingsStates());
                        getLastLocation();
                    }
                    else {
                        Log.e(MODULE_NAME, "checkLocationSettings:exception", task.getException());
                        if (task.getException() == null || !(task.getException() instanceof ResolvableApiException)) {
                            emitLocation(null, null);
                        }
                    }
                })
                .addOnFailureListener(getCurrentActivity(), e -> {
                    Log.e(MODULE_NAME, "checkLocationSettings:fail", e);

                    if (!isRunning()) return;

                    if (e instanceof ResolvableApiException) {
                        try {
                            ((ResolvableApiException)e).startResolutionForResult(getCurrentActivity(), REQUEST_CHECK_SETTINGS);
                        } catch (IntentSender.SendIntentException ex) {
                            Log.e(MODULE_NAME, "checkLocationSettings:start location settings exception:", ex);
                            emitLocation(null, null);
                        }
                    }
                    else {
                        Log.e(MODULE_NAME, "checkLocationSettings:Location settings are inadequate, and cannot be fixed here. Fix in Settings.");
                        emitLocation(null, null);
                    }
                });
    }

    private LocationRequest getLocationRequest() {
        if (locationRequest == null) locationRequest = LocationRequest.create();
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        locationRequest.setFastestInterval(1);
        locationRequest.setInterval(1000);
        locationRequest.setMaxWaitTime(10000);
        locationRequest.setNumUpdates(1);
        return locationRequest;
    }

    private boolean checkPermissions() {
        if (!isRunning()) return false;
        return ActivityCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.ACCESS_COARSE_LOCATION) == PermissionChecker.PERMISSION_GRANTED &&
                ActivityCompat.checkSelfPermission(getCurrentActivity(), Manifest.permission.ACCESS_FINE_LOCATION) == PermissionChecker.PERMISSION_GRANTED;
    }

    private void startLocationPermissionRequest() {
        ActivityCompat.requestPermissions(
                getCurrentActivity(),
                new String[]{Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION},
                REQUEST_PERMISSIONS_REQUEST_CODE
        );
    }

    private boolean isRunning() {
        return getCurrentActivity() != null && !getCurrentActivity().isFinishing();
    }

    private void fetchAddressByLocation(Location lastLocation) {
        if (lastLocation == null) return;
        if (this.onlyLocation) {
            emitLocation(lastLocation, null);
            return;
        }
        Geocoder geocoder = new Geocoder(getCurrentActivity(), Locale.getDefault());

        try {
            List<Address> addresses = geocoder.getFromLocation(lastLocation.getLatitude(), lastLocation.getLongitude(), 1);
            if (addresses != null && addresses.size() > 0) {
                Address address = addresses.get(0);
                Log.i(MODULE_NAME, "Address fetched;" + address);
                emitLocation(lastLocation, address);
            } else {
                Log.e(MODULE_NAME, "Cannot get address of this location:");
                emitLocation(null, null);
            }
        } catch (IOException e) {
            Log.e(MODULE_NAME, "Cannot get address of this location:", e);
            emitLocation(null, null);
        }

    }

    private void emitLocation(Location location, Address address) {
        try {
            this.onlyLocation = false;
            if (location != null) {
                JJLocation jjLocation = new JJLocation();
                jjLocation.setLatitude(location.getLatitude());
                jjLocation.setLongitude(location.getLongitude());
                jjLocation.setAddress(address);
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(LOCATION_UPDATE_EVENT, ObjectUtil.convertObjectToWritableMap(jjLocation));
            }
            else {
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(LOCATION_UPDATE_EVENT, null);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.d(MODULE_NAME, "onActivityResult: " + requestCode + " - " + resultCode);
        if (!isRunning()) return;

        if (requestCode == REQUEST_CHECK_SETTINGS) {
            if (resultCode == Activity.RESULT_OK) {
                getSingleLocationUpdate();
            } else {
                Log.e(MODULE_NAME, "User has denied to open location");
                if (this.onlyLocation) {
                    emitLocation(null, null);
                }
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        Log.i(MODULE_NAME, "onRequestPermissionResult");
        if (!isRunning()) return;

        if (requestCode == REQUEST_PERMISSIONS_REQUEST_CODE) {
            if (grantResults.length < 1) {
                Log.i(MODULE_NAME, "User interaction was cancelled.");
            }
            else if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                checkLocationSetting();
            }
            else {
                Intent intent = new Intent();
                intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                intent.setData(Uri.fromParts("package", BuildConfig.APPLICATION_ID, null));
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                ContextCompat.startActivity(getCurrentActivity(), intent, null);
            }
        }
    }

    @Override
    public void onResume() {
        Log.i(MODULE_NAME, "onResume");
    }

    @Override
    public void onPause() {
        Log.i(MODULE_NAME, "onPause");
    }

    @Override
    public void onStop() {
        Log.i(MODULE_NAME, "onStop");
    }

    @Override
    public void onDestroy() {
        Log.i(MODULE_NAME, "onDestroy");
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }
}
