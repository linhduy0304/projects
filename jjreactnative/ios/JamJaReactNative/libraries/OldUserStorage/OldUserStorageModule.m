//
//  OldUserStorageModule.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 10/7/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "OldUserStorageModule.h"

#import <UIKit/UIKit.h>
#import <React/RCTLog.h>

@implementation OldUserStorageModule

RCT_EXPORT_MODULE(OldUserStorage);

- (NSDictionary<NSString *, id> *)constantsToExport
{
  @try {
    NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
    
    if (prefs == nil) return @{};
    
    NSString *userID = [prefs objectForKey:@"userID"];
    NSString *userDisplayName = [prefs objectForKey:@"displayName"];
    NSString *userAvatar = [prefs objectForKey:@"avatar"];
    NSString *userPhone = [prefs objectForKey:@"phone_number"];
    NSString *accessToken = [prefs objectForKey:@"access_token"];
    NSString *tokenType = [prefs objectForKey:@"token_type"];
    NSString *userEmail = [prefs objectForKey:@"email"];
    
    if (userID == nil ||
        accessToken == nil ||
        tokenType == nil) return @{};
    
    if (userDisplayName == nil) userDisplayName = @"";
    if (userAvatar == nil) userAvatar = @"";
    if (userPhone == nil) userPhone = @"";
    if (userEmail == nil) userEmail = @"";
    
    return @{
             @"userId"          : userID,
             @"userDisplayName" : userDisplayName,
             @"userAvatar"      : userAvatar,
             @"userPhone"       : userPhone,
             @"accessToken"     : accessToken,
             @"tokenType"       : tokenType,
             @"userEmail"       : userEmail,
             };
  }
  @catch(NSException* error) {
    
    return @{};
  }
  
}

@end
