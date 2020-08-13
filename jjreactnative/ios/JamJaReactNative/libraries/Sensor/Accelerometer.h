//
//  Accelerometer.h
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/8/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//


#import <Foundation/Foundation.h>
#import <CoreMotion/CMMotionManager.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface Accelerometer : RCTEventEmitter <RCTBridgeModule>

@property (strong, nonatomic) CMMotionManager *motionManager;
@property (strong, nonatomic) CMAccelerometerData *accelerometerData;
@property (strong, nonatomic) NSOperationQueue *queue;

@end
