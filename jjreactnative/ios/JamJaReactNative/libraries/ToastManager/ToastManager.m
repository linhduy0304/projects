//
//  ToastManager.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 7/3/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "ToastManager.h"

@implementation ToastManager

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(Show:(NSDictionary *)props) {
  
  UIWindow *window = [[UIApplication sharedApplication] keyWindow];
  
  NSString *message = [props objectForKey: @"message"];
  
  // toast with all possible options
  [window makeToast:message
           duration:2.0
           position:CSToastPositionBottom
   ];
}
@end
