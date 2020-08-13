//
//  JJWebViewManager.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/27/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "JJWebViewManager.h"
#import "JJWebView.h"

#import <React/RCTBridge.h>
#import <React/RCTUtils.h>
#import <React/RCTUIManager.h>
#import <React/UIView+React.h>
#import <React/RCTBridgeModule.h>

#import <WebKit/WebKit.h>

@implementation JJWebViewManager

JJWebView *_wv;

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (UIView *)view
{
  NSLog(@"JJWebViewManager:initView");
  _wv = [[JJWebView alloc] init];
  return _wv;
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary)

@end
