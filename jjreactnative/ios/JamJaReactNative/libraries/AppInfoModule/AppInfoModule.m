//
//  AppInfoModule.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 7/17/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "AppInfoModule.h"

#import <UIKit/UIKit.h>
#import <React/RCTLog.h>

@implementation AppInfoModule

RCT_EXPORT_MODULE(AppInfo);

- (NSDictionary<NSString *, id> *)constantsToExport
{
  
  NSString* uuid = [CommonFunction GetUUIDRenew:NO];
  NSString* buildType = [[NSBundle mainBundle] objectForInfoDictionaryKey: @"AppBuildType"];
  NSString* gaid = [[NSBundle mainBundle] objectForInfoDictionaryKey: @"GAID"];
  NSString* ggMapKey = [[NSBundle mainBundle] objectForInfoDictionaryKey: @"GGMAPKEY"];
  NSString* oneSignalKey = [[NSBundle mainBundle] objectForInfoDictionaryKey: @"ONESIGNAL_KEY"];
  NSString* insiderPartner = [[NSBundle mainBundle] objectForInfoDictionaryKey: @"INSIDER_PARTNER"];
  NSString* fcmSenderId = [[NSBundle mainBundle] objectForInfoDictionaryKey: @"FCM_SENDER_ID"];
  
  return @{
           @"OS"            : @"ios",
           @"VersionCode"   : [CommonFunction currentBundleVersion],
           @"VersionName"   : [CommonFunction currentAppVersion],
           @"UUID"          : uuid,
           @"BuildEnv"      : buildType,
           @"GA_ID"         : gaid,
           @"GG_MAP_KEY"    : ggMapKey,
           @"ONE_SIGNAL_KEY": oneSignalKey,
           @"INSIDER_PARTNER": insiderPartner,
           @"FCM_SENDER_ID" : fcmSenderId
           };
}
@end
