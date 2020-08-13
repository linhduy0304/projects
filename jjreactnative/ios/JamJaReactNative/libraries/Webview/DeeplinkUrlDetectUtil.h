//
//  DeeplinkUrlDetectUtil.h
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/28/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DeeplinkUrlDetectUtil : NSObject
+(void)detectUrl:(NSURL*)url;
+(BOOL)isWebUrl:(NSURL*)url;
+(NSString*)getQuery:(NSURL*)url key:(NSString*)key;
+(BOOL)detectPaymentUrl:(NSURL*)url instanceId:(NSString*)instanceId;
@end
