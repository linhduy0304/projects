//
//  CommonFunction.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 7/17/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "CommonFunction.h"
#import "GSKeychain.h"

@implementation CommonFunction

+ (NSString *)GetUUIDRenew:(BOOL)renew
{
  NSString *uuid = [[GSKeychain systemKeychain] secretForKey:@"uuid"];
  if (uuid == nil || uuid == NULL || uuid.length < 1 || renew) {
    uuid = [CommonFunction createUUID];
  } else {
    uuid = [[GSKeychain systemKeychain] secretForKey:@"uuid"];
  }
  
  if (uuid.length) {
    [[GSKeychain systemKeychain] setSecret:uuid forKey:@"uuid"];
  }
  
  return uuid;
}

+(NSString*)createUUID
{
  CFUUIDRef theUUID = CFUUIDCreate(NULL);
  CFStringRef string = CFUUIDCreateString(NULL, theUUID);
  CFRelease(theUUID);
  return (__bridge NSString *)string;
}

+ (NSString*)currentAppVersion
{
  return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
}

+ (NSString*)currentBundleVersion
{
  return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"];
}

+ (NSString*)buildName
{
  return [[[NSBundle mainBundle] infoDictionary] objectForKey:(NSString *)kCFBundleVersionKey];
}

@end
