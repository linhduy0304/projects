
package com.testintegratenativeandroid.pedometer;

import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.hardware.Sensor;
import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.LifecycleEventListener;
import java.util.Map;
import java.util.HashMap;

public class PedometerModule extends ReactContextBaseJavaModule implements SensorEventListener, StepListener, LifecycleEventListener {

    private float numberStep;
    private StepDetector simpleStepDetector;
    private SensorManager sensorManager;
    private Sensor accel;
    public PedometerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        numberStep = 0;
        sensorManager = (SensorManager) reactContext.getSystemService(Context.SENSOR_SERVICE);
        accel = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        simpleStepDetector = new StepDetector();
        simpleStepDetector.registerListener(this);
    }

    @Override
    public String getName() {
        return "PedometerModule";
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        if (sensorEvent.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            simpleStepDetector.updateAccel(
                    sensorEvent.timestamp, sensorEvent.values[0], sensorEvent.values[1], sensorEvent.values[2]);
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }

    @Override
    public void step(long timeNs) {
        sendEvent("incre", "incre");
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }

    @ReactMethod
    public void start() {
        sensorManager.registerListener(PedometerModule.this, accel, SensorManager.SENSOR_DELAY_FASTEST);
    }

    @ReactMethod
    public void pause() {
        sensorManager.unregisterListener(PedometerModule.this);
    }

    private void sendEvent(String eventName, Object params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}