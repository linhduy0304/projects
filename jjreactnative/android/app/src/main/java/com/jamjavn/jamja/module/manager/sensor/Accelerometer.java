package com.jamjavn.jamja.module.manager.sensor;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by sinhphan on 11/1/18.
 * Email: pnsinh.hg92@gmail.com
 **/
public class Accelerometer extends ReactContextBaseJavaModule implements SensorEventListener {

    private final String NAME = "Accelerometer";
    private final String EVENT = "accelerometer_update";

    private float mAccel = 0;
    private float mAccelCurrent= 0;

    private long firstShake = 0;
    private long firstUnShake = 0;
    private int currentState = -1;
    private final int SHAKE_THRESHOLD = 4;

    private SensorManager mSensorManager;

    public Accelerometer(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private boolean isAvailable() {
        return getReactApplicationContext() != null && getCurrentActivity() != null && !getCurrentActivity().isFinishing();
    }

    public SensorManager getSensorManager() {
        if (mSensorManager == null) {
            mSensorManager = (SensorManager)getReactApplicationContext().getSystemService(Context.SENSOR_SERVICE);
        }
        return mSensorManager;
    }

    @Override
    public Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<>();
        constants.put("EVENT", EVENT);
        return constants;
    }

    @ReactMethod
    public void startHandler() {
        if (!isAvailable()) return;

        Log.i("JAMJA", "Accelerometer:startHandler");

        Sensor accelerometer = getSensorManager().getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        if (accelerometer != null) {
            mSensorManager.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    @ReactMethod
    public void stopHandler() {
        Log.i("JAMJA", "Accelerometer:stopHandler");
        if (mSensorManager != null) {
            mSensorManager.unregisterListener(this);
            mSensorManager = null;
        }
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (!isAvailable() || event == null || event.sensor == null) return;
        if (event.sensor.getType() != Sensor.TYPE_ACCELEROMETER) return;

        float x = event.values[0];
        float y = event.values[1];
        float z = event.values[2];
        float mAccelLast = mAccelCurrent;
        mAccelCurrent = (float) Math.sqrt((double) (x * x + y * y + z * z));
        float delta = mAccelCurrent - mAccelLast;
        mAccel = mAccel * 0.9f + delta; // perform low-cut filter

        float speed = Math.abs(mAccel);

//        Log.e("JAMJA", "onSensorChanged: " + speed);

        if (speed > SHAKE_THRESHOLD) {
            if (firstShake > 0 && event.timestamp - firstShake > 100) {
                firstUnShake = 0;
                if (currentState != 1) {
                    Log.i("JAMJA", "shaked: " + speed);
                }
                currentState = 1;
                updatePoint(speed, event.timestamp);
            }
            if (firstShake == 0) firstShake = event.timestamp;
        }
        else {
            if (firstUnShake > 0 && event.timestamp - firstUnShake > 100) {
                firstShake = 0;
                if (currentState != -1) {
                    Log.i("JAMJA", "unshaked: " + speed);
                }
                currentState = -1;
            }
            if (firstUnShake == 0) firstUnShake = event.timestamp;
        }
    }

    private void updatePoint(float value, long time) {
        Log.i("JAMJA", "updatePoint: " + value);
        WritableMap map = new WritableNativeMap();
        map.putDouble("power", value/1.5);
        map.putDouble("timestamp", time);

        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT, map);

    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        if (sensor.getType() != Sensor.TYPE_ACCELEROMETER) return;
        Log.e("JAMJA", "Accelerometer:onAccuracyChanged:" + accuracy);
    }

    @Override
    public String getName() {
        return NAME;
    }
}
