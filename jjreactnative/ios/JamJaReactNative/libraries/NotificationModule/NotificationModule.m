//
//  NotificationModule.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 6/30/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//
//
//#import "NotificationModule.h"
//
//@implementation NotificationModule
//
//+ (void)didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
//{
//  RCTLog(@"***Native:didRegisterUserNotificationSettings: %@", notificationSettings);
//  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
//}
//
//+ (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
//{
//  RCTLog(@"***Native:didRegisterForRemoteNotificationsWithDeviceToken: %@", deviceToken);
//  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
//}
//
//+ (void)didReceiveRemoteNotification:(NSDictionary *)notification
//{
//  RCTLog(@"***Native:didReceiveRemoteNotification_1: %@", notification);
//  [RCTPushNotificationManager didReceiveRemoteNotification:notification];
//}
//
//+ (void)didReceiveRemoteNotification:(NSDictionary *)notification fetchCompletionHandler:(RCTRemoteNotificationCallback)completionHandler
//{
//  RCTLog(@"***Native:didReceiveRemoteNotification_2: %@ %@", notification, completionHandler);
//  [RCTPushNotificationManager didReceiveRemoteNotification:notification fetchCompletionHandler:completionHandler];
//}
//
//+ (void)didReceiveLocalNotification:(UILocalNotification *)notification
//{
//  RCTLog(@"***Native:didReceiveLocalNotification: %@", notification);
//  [RCTPushNotificationManager didReceiveLocalNotification:notification];
//}
//
//+ (void)didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
//{
//  RCTLog(@"***Native:didFailToRegisterForRemoteNotificationsWithError: %@", error);
//  [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
//}
//
//+ (void)showNotificationInForeground:(NSDictionary *)notification
//{
//  RCTLog(@"***Native:showNotificationInForeground: %@", notification);
//  
//  if ([notification objectForKey:@"type"] == nil ||
//      ![[notification objectForKey:@"type"] isEqualToString:@"coupon_alarm"]) return;
//  
//  NSArray *responders = @[
//                          [CRToastInteractionResponder
//                                            interactionResponderWithInteractionType: CRToastInteractionTypeTap
//                                            automaticallyDismiss:YES
//                                            block:^(CRToastInteractionType interactionType) {
//                                              RCTLog(@"***Native:---------------Completed CRToastInteractionTypeTap--------------");
//                                              [NotificationManager sendNotificationEvent:notification];
//                                            }],
//                          [CRToastInteractionResponder
//                                           interactionResponderWithInteractionType: CRToastInteractionTypeSwipe
//                                           automaticallyDismiss:YES
//                                           block:^(CRToastInteractionType interactionType) {
//                                             RCTLog(@"***Native:---------------Completed CRToastInteractionTypeSwipe--------------");
//                                           }]
//                          ];
//  
//  //rgb(231, 57, 72)
//  
//  NSDictionary *options = @{
//                            kCRToastTextKey : [[notification objectForKey:@"title"] stringByAppendingString: [notification objectForKey:@"message"]],
//                            kCRToastImageKey : [UIImage imageNamed:@"bell_o.png"],
//                            kCRToastImageAlignmentKey : @(CRToastAccessoryViewAlignmentLeft),
//                            kCRToastTimeIntervalKey : @4.0f,
//                            kCRToastNotificationTypeKey : @(CRToastTypeNavigationBar),
//                            kCRToastNotificationPreferredPaddingKey: @16,
//                            kCRToastTextAlignmentKey : @(NSTextAlignmentLeft),
//                            kCRToastBackgroundColorKey : [UIColor darkGrayColor],
//                            kCRToastAnimationInDirectionKey : @(CRToastAnimationDirectionTop),
//                            kCRToastAnimationOutDirectionKey : @(CRToastAnimationDirectionTop),
//                            kCRToastInteractionRespondersKey : responders
//                            };
//
//  [CRToastManager showNotificationWithOptions:options
//                              completionBlock:^{
//                                RCTLog(@"***Native:---------------dismiss foreground notification--------------");
//                              }];
//}
//
//@end
