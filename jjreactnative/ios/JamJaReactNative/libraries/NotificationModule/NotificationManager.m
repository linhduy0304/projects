//
//  NotificationManager.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 7/2/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//
//
//#import "NotificationManager.h"
//
//static NSString *const kNotificationReminder = @"kNotificationReminder";
//
//@implementation NotificationManager
//{
//  bool hasListeners;
//}
//
//RCT_EXPORT_MODULE();
//
//// Will be called when this module's first listener is added.
//-(void)startObserving {
//  hasListeners = YES;
//  [[NSNotificationCenter defaultCenter] addObserver:self
//                                           selector:@selector(sendEvent:)
//                                               name:kNotificationReminder
//                                             object:nil];
//  // Set up any upstream listeners or background tasks as necessary
//}
//
//// Will be called when this module's last listener is removed, or on dealloc.
//-(void)stopObserving {
//  hasListeners = NO;
//  [[NSNotificationCenter defaultCenter] removeObserver:self];
//  // Remove upstream listeners, stop unnecessary background tasks
//}
//
//- (NSArray<NSString *> *)supportedEvents
//{
//  return @[@"NotificationReminder"];
//}
//
//- (void)sendEvent:(NSNotification *)notification
//{
//  RCTLog(@"***Native:NotificationReminder:sendEvent: %@", notification.userInfo);
//  if (hasListeners) [self sendEventWithName:@"NotificationReminder" body:notification.userInfo];
//}
//
//+ (void)sendNotificationEvent:(NSDictionary *)userInfo
//{
//  [[NSNotificationCenter defaultCenter] postNotificationName:kNotificationReminder
//                                                      object:self
//                                                    userInfo:userInfo
//   ];
//}
//
//@end
//
//
