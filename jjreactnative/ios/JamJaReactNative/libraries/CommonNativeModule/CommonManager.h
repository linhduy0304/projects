//
//  CommonManager.h
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/28/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CommonManager : RCTEventEmitter <RCTBridgeModule>
+ (instancetype)manager;

- (void)detectAndOpenUrl:(NSString*)url;
- (void)openWebView:(NSString*)url;
- (void)emitEventWithSlug:(NSString*)action url:(NSString*)url slug:(NSString*)slug instanceId:(NSString*)instanceId;
- (void)emitEventWithSlug:(NSString*)action url:(NSString*)url slug:(NSString*)slug;
- (void)emitEventWithOnlyAction:(NSString*)action url:(NSString*)url;
@end
