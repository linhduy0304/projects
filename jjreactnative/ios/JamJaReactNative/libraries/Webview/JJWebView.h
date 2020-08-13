//
//  JJWebView.h
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/27/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>
#import <UIKit/UIKit.h>

@class JJWebView;

@interface JJWebView : UIView<WKNavigationDelegate>

@property (nonatomic, copy) NSDictionary* source;

@end
