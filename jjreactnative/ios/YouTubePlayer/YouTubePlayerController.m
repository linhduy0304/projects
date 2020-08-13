//
//  YouTubePlayerController.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 12/12/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "YouTubePlayerController.h"
#import "DeeplinkUrlDetectUtil.h"


@interface YouTubePlayerController ()

@end

@implementation YouTubePlayerController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  if (self.videoId) {
    
    if ([self.videoId  rangeOfString:@"http" options:NSCaseInsensitiveSearch].location != NSNotFound) {
      @try {
        NSURL *url = [NSURL URLWithString:self.videoId];
        self.videoId = [DeeplinkUrlDetectUtil getQuery:url key:@"v"];
      } @catch (NSException *exception) {
        NSLog(@"YouTubePlayerController:viewDidLoad:videoID:error: %@", exception);
      }
    }
    
    if (!self.videoId) self.videoId = @"jamja.vn";
    
    NSDictionary *playerVars = @{@"origin" : @"http://www.youtube.com"};
    
    [self.playerView loadWithVideoId:self.videoId playerVars:playerVars];
  }
  NSLog(@"YouTubePlayerController:viewDidLoad:videoID: %@", self.videoId);
}

- (IBAction)closeButtonPressed:(id)sender {
  [[self presentingViewController] dismissViewControllerAnimated:YES completion:nil];
}

@end
