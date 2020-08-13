//
//  CommonFunction.h
//  JamJaReactNative
//
//  Created by Sinh Phan on 7/17/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CommonFunction : NSObject

+ (NSString*)currentAppVersion;
+ (NSString*)currentBundleVersion;
+ (NSString*)GetUUIDRenew:(BOOL)renew;
+ (NSString*)buildName;

@end
