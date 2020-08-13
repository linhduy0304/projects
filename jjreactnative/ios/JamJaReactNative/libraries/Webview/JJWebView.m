//
//  JJWebView.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/27/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "JJWebView.h"
#import "DeeplinkUrlDetectUtil.h"

#import "JAMJA-Swift.h"
@class WKCookieWebView;

@implementation JJWebView
{
  UIRefreshControl *_refreshControl;
  WKCookieWebView *_webView;
  NSString *originUrl;
  NSString *instanceId;
  NSString *lastPaymentDispatch;
  long loadFinishPageCount;
  BOOL enableReload;
}

- (instancetype)init
{
  NSLog(@"JJWebView:init");
  
  self = [super init];
  
  @try {
    enableReload = YES;
    
    __weak JJWebView *weakSelf = self;
    _webView = [[WKCookieWebView alloc] initWithFrame:self.bounds];
    _webView.navigationDelegate = weakSelf;
    
//    _webView.customUserAgent = @"app_web_ios";
    
    _refreshControl = [[UIRefreshControl alloc] init];
    [_webView.scrollView addSubview:_refreshControl];
    [_refreshControl addTarget:self action:@selector(refresh) forControlEvents:UIControlEventValueChanged];
    
  } @catch (NSException *exception) {
    NSLog(@"JJWebView:init:error: %@", exception);
  }
  
  return self;
}

- (void)refresh {
  if (_refreshControl == nil || _webView == nil) return;
  [_refreshControl endRefreshing];
  if (enableReload) [_webView reload];
}

- (void)layoutSubviews {
  NSLog(@"JJWebView:layoutSubviews");
  [super layoutSubviews];
  _webView.frame = self.bounds;
  [self addSubview:_webView];
}

- (void)dealloc
{
  [_refreshControl removeTarget:self action:@selector(refresh) forControlEvents:UIControlEventValueChanged];
  [_webView.scrollView willRemoveSubview:_refreshControl];
  _refreshControl = nil;
  _webView.navigationDelegate = nil;
  _webView.UIDelegate = nil;
  _webView.scrollView.delegate = nil;
}

#pragma mark - PropTypes
- (void)setSource:(NSDictionary *)source
{
  
  dispatch_async(dispatch_get_main_queue(), ^{
    @try {
      
      NSLog(@"JJWebView:setSource: %@", source);
      
      NSString* url = [source objectForKey:@"url"];
      id disableRefresh = [source objectForKey:@"disableRefresh"];
      if (disableRefresh != NULL) {
        enableReload = !disableRefresh;
      }
      else {
        enableReload = YES;
      }
      
      originUrl = url;
  
      if (!url) return;
      
      NSURL *urlRequest = [NSURL URLWithString:url];
      
      NSMutableURLRequest* request = [[NSMutableURLRequest alloc] initWithURL:urlRequest];
      [request setHTTPShouldHandleCookies:YES];
      [request setAllHTTPHeaderFields:[NSHTTPCookie requestHeaderFieldsWithCookies:[NSHTTPCookieStorage sharedHTTPCookieStorage].cookies]];
      
      NSDictionary* headers = [source objectForKey:@"headers"];
      if (headers) {
        NSLog(@"JJWebView:headers: %@", headers);
        [request setAllHTTPHeaderFields:headers];
      }
      
      if (
          [originUrl  rangeOfString:@"vnpayment.vn" options:NSCaseInsensitiveSearch].location != NSNotFound ||
          [originUrl  rangeOfString:@"vnpay.vn" options:NSCaseInsensitiveSearch].location != NSNotFound) {
        [_webView setHidden:YES];
      }
      
      [_webView loadRequest:request];
      loadFinishPageCount = 0;
      [_refreshControl beginRefreshing];
      
      instanceId = [source objectForKey:@"instanceId"];
      
    } @catch (NSException *exception) {
      NSLog(@"JJWebView:setSource:error: %@", exception);
    }
  });
}

#pragma WKNavigationDelegate
- (void)webView:(__unused WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler
{
  @try {
    NSLog(@"JJWebView:decidePolicyForNavigationAction: \n %ld \n %@", navigationAction.navigationType, navigationAction.request.URL);
    
    NSURLRequest* request;
    
    if (navigationAction) {
      request = navigationAction.request;
    }
    
    if (request && request.URL) {
      NSURL *url = request.URL;
      [DeeplinkUrlDetectUtil detectPaymentUrl:url instanceId:instanceId];
      if ([url.absoluteString  rangeOfString:@"vnpay" options:NSCaseInsensitiveSearch].location != NSNotFound) {
        return decisionHandler(WKNavigationActionPolicyAllow);
      }
    }

    if (navigationAction.navigationType != WKNavigationTypeLinkActivated) {
      return decisionHandler(WKNavigationActionPolicyAllow);
    }
    
    if ([DeeplinkUrlDetectUtil isWebUrl:request.URL]) {
      [DeeplinkUrlDetectUtil detectUrl:request.URL];
    }
    else if ([[UIApplication sharedApplication] canOpenURL:request.URL]) {
      [[UIApplication sharedApplication] openURL:request.URL];
    }
    
    return decisionHandler(WKNavigationActionPolicyCancel);
  } @catch (NSException *exception) {
    NSLog(@"JJWebView:decidePolicyForNavigationAction:error: %@", exception);
    return decisionHandler(WKNavigationActionPolicyAllow);
  }
}

- (void)webView:(WKWebView *)webView
didFinishNavigation:(WKNavigation *)navigation
{
  
  @try {
    
    NSLog(@"JJWebView:didFinishNavigation: %@", navigation);
    if (originUrl &&
        ([originUrl  rangeOfString:@"vnpayment.vn" options:NSCaseInsensitiveSearch].location != NSNotFound ||
         [originUrl  rangeOfString:@"vnpay.vn" options:NSCaseInsensitiveSearch].location != NSNotFound) &&
        loadFinishPageCount <= 0) {
      
      NSMutableURLRequest* request = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:originUrl]];
      [request setHTTPShouldHandleCookies:YES];
      [request setAllHTTPHeaderFields:[NSHTTPCookie requestHeaderFieldsWithCookies:[NSHTTPCookieStorage sharedHTTPCookieStorage].cookies]];
      
      [_webView stopLoading];
      [_webView loadRequest:request];
      
      loadFinishPageCount = 1;
      return;
    }
    
    if (originUrl &&
        ([originUrl  rangeOfString:@"vnpayment.vn" options:NSCaseInsensitiveSearch].location != NSNotFound ||
         [originUrl  rangeOfString:@"vnpay.vn" options:NSCaseInsensitiveSearch].location != NSNotFound)) {
          
          [NSTimer scheduledTimerWithTimeInterval:1.0
                                          repeats:NO
                                            block:^(NSTimer * _Nonnull timer) {
                                              if (_webView) [_webView setHidden:NO];
                                              if (_refreshControl) [_refreshControl endRefreshing];
                                            }];
          return;
    }
    
    [_webView setHidden:NO];
    [_refreshControl endRefreshing];
    
  } @catch (NSException *exception) {
    NSLog(@"JJWebView:didFinishNavigation: %@", exception);
  }
}
@end
