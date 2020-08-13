//
//  ToastManager.h
//  JamJaReactNative
//
//  Created by Sinh Phan on 7/3/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//


#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import "UIView+Toast.h"

@interface ToastManager : NSObject <RCTBridgeModule>

@end


