//
//  CommonManager.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/28/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "CommonManager.h"
#import "DeeplinkUrlDetectUtil.h"
#import "YouTubePlayerController.h"

#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>

#import <Firebase.h>

#define COMMON_COMMAND_EVENT @"common_command_event"

@implementation CommonManager

static id sharedInstance;

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;

+ (instancetype)manager {
  static dispatch_once_t once;
  dispatch_once(&once, ^{
    if (sharedInstance == nil) {
      sharedInstance = [[self alloc] init];
    }
  });
  return sharedInstance;
}

-(instancetype)init
{
  self = [super init];
  sharedInstance = self;
  return self;
}

- (NSDictionary *)constantsToExport
{
  return @{@"EVENT": COMMON_COMMAND_EVENT};
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[COMMON_COMMAND_EVENT];
}

RCT_EXPORT_METHOD(openUrl:(NSString*)url)
{
  [self detectAndOpenUrl:url];
}


RCT_EXPORT_METHOD(playVideo:(NSString*)videoId)
{
  @try {
    NSLog(@"CommonManager:playVideo: %@", videoId);
    
    if (!videoId) return;
    
    dispatch_async(dispatch_get_main_queue(), ^{
      UIWindow *topWindow = [UIApplication sharedApplication].windows.lastObject;
      if (!topWindow) return;
      
      YouTubePlayerController* player = [[YouTubePlayerController alloc] init];
      player.videoId = videoId;
      
      [topWindow.rootViewController presentViewController:player animated:YES completion:nil];
    });
    
  } @catch (NSException *exception) {
    NSLog(@"CommonManager:playVideo:error: %@", exception);
  }
}

- (void)detectAndOpenUrl:(NSString *)url
{
  @try {
    NSLog(@"CommonManager:detectAndOpenUrl: %@", url);
    
    NSURL* link = [NSURL URLWithString:url];
    
    if ([url rangeOfString:@".page.link/" options:NSCaseInsensitiveSearch].location != NSNotFound) {
      
      [[FIRDynamicLinks dynamicLinks] handleUniversalLink:link
                                               completion:^(FIRDynamicLink * _Nullable dynamicLink, NSError * _Nullable error) {
                                                 
                                                 NSLog(@"CommonManager:handleUniversalLink:url: %@ %@", dynamicLink.url, error);
                                                 if (dynamicLink && dynamicLink.url && !error) {
                                                   [DeeplinkUrlDetectUtil detectUrl:dynamicLink.url];
                                                 }
                                                 
                                               }];
      
      return;
    }
    
    NSString* deeplink = [DeeplinkUrlDetectUtil getQuery:link key:@"deeplink"];
    if (deeplink) {
      link = [NSURL URLWithString:deeplink];
    }
    [DeeplinkUrlDetectUtil detectUrl:link];
  } @catch (NSException *exception) {
    NSLog(@"CommonManager:openUrl:error: %@", exception);
  }
}

- (void)openWebView:(NSString*)url
{
  @try {
    NSLog(@"CommonManager:openWebView: %@", url);
    [self emitEventWithOnlyAction:@"open_web_view" url:url];
  } @catch (NSException *exception) {
    NSLog(@"CommonManager:openWebView:error: %@", exception);
  }
}

- (void)emitEventWithSlug:(NSString*)action
                      url:(NSString*)url
                     slug:(NSString*)slug
               instanceId:(NSString*)instanceId
{
  @try {
    NSDictionary* event =@{
                           @"action": action,
                           @"url": url,
                           @"slug": slug,
                           @"id": instanceId
                           };
    [self sendEventWithName:COMMON_COMMAND_EVENT
                       body:event];
  } @catch (NSException *exception) {
    NSLog(@"CommonManager:emitEventWithSlug:error: %@", exception);
  }
}

- (void)emitEventWithSlug:(NSString*)action url:(NSString*)url slug:(NSString*)slug
{
  @try {
    NSDictionary* event =@{
                           @"action": action,
                           @"url": url,
                           @"slug": slug
                           };
    [self sendEventWithName:COMMON_COMMAND_EVENT
                       body:event];
  } @catch (NSException *exception) {
    NSLog(@"CommonManager:emitEventWithSlug:error: %@", exception);
  }
}

- (void)emitEventWithOnlyAction:(NSString*)action url:(NSString*)url
{
  @try {
    NSDictionary* event =@{
                           @"action": action,
                           @"url": url
                           };
    [self sendEventWithName:COMMON_COMMAND_EVENT
                       body:event];
  } @catch (NSException *exception) {
    NSLog(@"CommonManager:emitEventWithOnlyAction:error: %@", exception);
  }
}

@end
