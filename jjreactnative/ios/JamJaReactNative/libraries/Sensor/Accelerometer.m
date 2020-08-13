//
//  Accelerometer.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/8/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "Accelerometer.h"
#import <math.h>

#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>
#import <React/RCTUtils.h>

#define SHAKE_UPDATE_EVENT @"accelerometer_update"
#define SHAKE_THRESHOLD 2

@implementation Accelerometer

RCT_EXPORT_MODULE(Accelerometer);

//@synthesize bridge = _bridge;

float mAccelCurrent = 0;
float mAccel = 0;

- (NSArray<NSString *> *)supportedEvents
{
  return @[SHAKE_UPDATE_EVENT];
}

- (NSDictionary<NSString *, id> *)constantsToExport
{
  
  return @{@"EVENT" : SHAKE_UPDATE_EVENT};
}

RCT_EXPORT_METHOD(startHandler)
{
  NSLog(@"Accelerometer:startHandler");
  
  mAccelCurrent = 0;
  mAccel = 0;
  
  self.queue = [[NSOperationQueue alloc] init];
  self.accelerometerData = [[CMAccelerometerData alloc] init];
  self.motionManager = [[CMMotionManager alloc] init];
  
  [self.motionManager setAccelerometerUpdateInterval: 0.1f];
  [self.motionManager startAccelerometerUpdatesToQueue:self.queue
                                           withHandler:^(CMAccelerometerData *accelerometerData, NSError *error) {
                                             
                                             @try {
                                               self.accelerometerData = self.motionManager.accelerometerData;
                                               
                                               double x = self.accelerometerData.acceleration.x;
                                               double y = self.accelerometerData.acceleration.y;
                                               double z = self.accelerometerData.acceleration.z;
                                               
//                                               NSLog(@"X: %f, Y: %f, Z: %f", x, y, z);
                                               
                                               float mAccelLast = mAccelCurrent;
                                               mAccelCurrent = (float) sqrt((double) (x * x + y * y + z * z));
                                               float delta = mAccelCurrent - mAccelLast;
                                               mAccel = mAccel * 0.9f + delta; // perform low-cut filter
                                               
                                               float speed = (float) fabsf(mAccel);
                                               
                                               if (speed > SHAKE_THRESHOLD) {
                                                 NSLog(@"Accelerometer:speed: %f", speed);
                                                 
                                                 [self sendEventWithName:SHAKE_UPDATE_EVENT
                                                                    body:@{
                                                                           @"power": @(speed)
                                                                           }];
                                                 
                                               }
      
                                             } @catch (NSException *exception) {
                                               NSLog(@"%@", exception);
                                             }
  }];
}

RCT_EXPORT_METHOD(stopHandler)
{
  NSLog(@"Accelerometer:stopHandler");
  
  if (self.queue) {
    [self.queue cancelAllOperations];
    self.queue = nil;
  }
  if (self.motionManager) {
    [self.motionManager stopAccelerometerUpdates];
    self.motionManager = nil;
  }
  if (self.accelerometerData) {
    self.accelerometerData = nil;
  }
}

@end
