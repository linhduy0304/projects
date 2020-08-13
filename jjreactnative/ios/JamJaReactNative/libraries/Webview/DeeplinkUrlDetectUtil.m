//
//  DeeplinkUrlDetectUtil.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/28/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "DeeplinkUrlDetectUtil.h"
#import "CommonManager.h"

@implementation DeeplinkUrlDetectUtil

+(void)detectUrl:(NSURL*)url
{
  @try {
    CommonManager* manager = [CommonManager manager];
    if (manager == nil) return;
    
    NSString* host = url.host;
    
    NSLog(@"DeeplinkUrlDetectUtil:host: %@ %@", url, host);
    
    if ([host  rangeOfString:@".page.link" options:NSCaseInsensitiveSearch].location != NSNotFound) {
      [manager detectAndOpenUrl:url.absoluteString];
      return;
    }
    
    if ([self isWebUrl:url] && [host  rangeOfString:@"jamja.vn" options:NSCaseInsensitiveSearch].location == NSNotFound) {
      [manager openWebView:url.absoluteString];
      return;
    }
    
    if (![self isWebUrl:url] && [self isDeepLinkScheme:url]) {
      [self detectDeepLinkScheme:url manager:manager];
      return;
    }
      
    NSArray<NSString*> *paths = url.pathComponents;
    
    
    NSString* deeplink = [DeeplinkUrlDetectUtil getQuery:url key:@"deeplink"];
    
    NSLog(@"DeeplinkUrlDetectUtil:deeplink: %@", deeplink);
    
    if (deeplink) {
      [DeeplinkUrlDetectUtil detectUrl:[NSURL URLWithString:deeplink]];
      return;
    }
    
    if (paths == nil || paths.count < 2) {
      [manager openWebView:url.absoluteString];
      return;
    }
    
    if (paths.count == 2) {
      [self detectUrlWithOnePath:url paths:paths manager:manager];
    }
    else if (paths.count == 3) {
      [self detectUrlWithTwoPath:url paths:paths manager:manager];
    }
    else if (paths.count == 4) {
      [self detectUrlWithThreePath:url paths:paths manager:manager];
    }
    else {
      [manager openWebView:url.absoluteString];
    }
  
  } @catch (NSException *exception) {
    NSLog(@"DeeplinkUrlDetectUtil:detectUrl:error: %@", exception);
  }
}

+(BOOL)isWebUrl:(NSURL*)url
{
  @try {
    if (!url) return NO;
    if (![url.scheme hasPrefix:@"http"] && ![url.scheme hasPrefix:@"https"]) return NO;
    return YES;
  } @catch (NSException *exception) {
    NSLog(@"DeeplinkUrlDetectUtil:isWebUrl:error: %@", exception);
  }
  return NO;
}

+(BOOL)isDeepLinkScheme:(NSURL*)url
{
  @try {
    if (!url) return NO;
    if (![url.scheme hasPrefix:@"jamjalinks"]) return NO;
    return YES;
  } @catch (NSException *exception) {
    NSLog(@"DeeplinkUrlDetectUtil:isDeepLinkScheme:error: %@", exception);
  }
  return NO;
}

+(void)detectUrlWithOnePath:(NSURL*)url paths:(NSArray<NSString*>*)paths manager:(CommonManager*)manager
{
  @try {
    
    NSString* path1 = paths[1];
    
    if ([path1  rangeOfString:@"bo-suu-tap" options:NSCaseInsensitiveSearch].location != NSNotFound) {
      [manager emitEventWithOnlyAction:@"open_collection_list" url:url.absoluteString];
    }
    else if ([path1  rangeOfString:@"doc-quyen" options:NSCaseInsensitiveSearch].location != NSNotFound) {
      [manager emitEventWithOnlyAction:@"open_exclusive_category" url:url.absoluteString];
    }
    else if ([path1  rangeOfString:@"ma-giam-gia" options:NSCaseInsensitiveSearch].location != NSNotFound) {
      [manager emitEventWithOnlyAction:@"open_ecoupon_category" url:url.absoluteString];
    }
    else {
      [manager openWebView:url.absoluteString];
    }
  } @catch (NSException *exception) {
    NSLog(@"DeeplinkUrlDetectUtil:detectUrlWithOnePath:error: %@", exception);
  }
}

+(void)detectUrlWithTwoPath:(NSURL*)url paths:(NSArray<NSString*>*)paths manager:(CommonManager*)manager
{
  NSString* path1 = paths[1];
  NSString* path2 = paths[2];
  
  if ([path1  rangeOfString:@"bo-suu-tap" options:NSCaseInsensitiveSearch].location != NSNotFound) {
    [manager emitEventWithSlug:@"open_collection_detail" url:url.absoluteString slug:path2];
  }
  else if ([path1  rangeOfString:@"khuyen-mai" options:NSCaseInsensitiveSearch].location != NSNotFound) {
    [manager emitEventWithSlug:@"open_brand_detail" url:url.absoluteString slug:path2];
  }
  else if ([path1  rangeOfString:@"thuong-hieu" options:NSCaseInsensitiveSearch].location != NSNotFound) {
    [manager emitEventWithSlug:@"open_brand_detail" url:url.absoluteString slug:path2];
  }
  else {
    [manager openWebView:url.absoluteString];
  }
}

+(void)detectUrlWithThreePath:(NSURL*)url paths:(NSArray<NSString*>*)paths manager:(CommonManager*)manager
{
  NSString* path1 = paths[1];
  NSString* path3 = paths[3];
  
  if ([path1  rangeOfString:@"khuyen-mai" options:NSCaseInsensitiveSearch].location != NSNotFound) {
    [manager emitEventWithSlug:@"open_deal_detail" url:url.absoluteString slug:path3];
  }
  else {
    [manager openWebView:url.absoluteString];
  }
}

+(void)detectDeepLinkScheme:(NSURL*)url manager:(CommonManager*)manager
{
  if (url == nil) return;
  NSString* host = url.host;
  
  if ([host rangeOfString:@"dealdetail" options:NSCaseInsensitiveSearch].location != NSNotFound) {
    [manager emitEventWithSlug:@"open_deal_detail" url:url.absoluteString slug:[self getQuery:url key:@"slug"]];
    return;
  }
  if ([host rangeOfString:@"coupon" options:NSCaseInsensitiveSearch].location != NSNotFound) {
    [manager emitEventWithOnlyAction:@"open_coupon_detail" url:url.absoluteString];
    return;
  }
  if ([host rangeOfString:@"collection" options:NSCaseInsensitiveSearch].location != NSNotFound) {
    [manager emitEventWithSlug:@"open_collection_detail" url:url.absoluteString slug:[self getQuery:url key:@"slug"]];
    return;
  }
  if ([host rangeOfString:@"category-page" options:NSCaseInsensitiveSearch].location != NSNotFound) {
    [manager emitEventWithOnlyAction:@"open_category" url:url.absoluteString];
    return;
  }
  if ([host rangeOfString:@"game" options:NSCaseInsensitiveSearch].location != NSNotFound) {
    [manager emitEventWithOnlyAction:@"open_game" url:url.absoluteString];
  }
}

+(NSString*)getQuery:(NSURL*)url
                 key:(NSString*)key
{
  @try {
    NSURLComponents* urlCom = [NSURLComponents componentsWithURL:url resolvingAgainstBaseURL:NO];
    NSArray<NSURLQueryItem*>* queries = urlCom.queryItems;
    
    NSArray<NSURLQueryItem*>* items = [queries filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(id  _Nullable evaluatedObject, NSDictionary<NSString *,id> * _Nullable bindings) {
      NSURLQueryItem *query = (NSURLQueryItem*)evaluatedObject;
      NSLog(@"CommonManager:getQuery__: %@", query.name);
      return query && [query.name isEqualToString:key];
    }]];
    
    NSLog(@"CommonManager:getQuery: %@ %@", key, items);
    
    if (items.count > 0) return items[0].value;
    
    return NULL;
    
  } @catch (NSException *exception) {
    NSLog(@"DeeplinkUrlDetectUtil:getQuery:error: %@", exception);
    return NULL;
  }
}

+(BOOL)detectPaymentUrl:(NSURL*)url instanceId:(NSString*)instanceId
{
  @try {
    CommonManager* manager = [CommonManager manager];
    if (manager == nil) return NO;
    
    if ([url.absoluteString rangeOfString:@"jamja.vn/payment/vnpay-return/?" options:NSCaseInsensitiveSearch].location != NSNotFound ) {
      
      NSString *query = url.query;
      
      [manager emitEventWithSlug:@"payment_action" url:url.absoluteString slug:query instanceId:instanceId];
      
      return YES;
    }
    
    return NO;
  } @catch (NSException *exception) {
    NSLog(@"DeeplinkUrlDetectUtil:detectPaymentUrl:error: %@", exception);
    return NO;
  }
}

@end
