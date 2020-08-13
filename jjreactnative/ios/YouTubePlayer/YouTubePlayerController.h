//
//  YouTubePlayerController.h
//  JamJaReactNative
//
//  Created by Sinh Phan on 12/12/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "YTPlayerView.h"

NS_ASSUME_NONNULL_BEGIN

@interface YouTubePlayerController : UIViewController

@property(nonatomic, strong) NSString* videoId;
@property(nonatomic, strong) IBOutlet YTPlayerView *playerView;

@end

NS_ASSUME_NONNULL_END
