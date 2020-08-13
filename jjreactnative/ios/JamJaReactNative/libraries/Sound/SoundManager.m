//
//  SoundManager.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/10/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "SoundManager.h"

@implementation SoundManager

int playerPlaying = 0;

RCT_EXPORT_MODULE(SoundManager);

RCT_EXPORT_METHOD(play1:(NSString *)fileName repeat:(BOOL)repeat) {
  
  NSLog(@"SoundManager:fileName: %@", fileName);
  
  @try {
    
    if (self.audio2 != nil) {
      [self.audio2 pause];
      [self.audio2 stop];
    }
    
    if (self.audio3 != nil) {
      [self.audio3 pause];
      [self.audio3 stop];
    }
    
    if (self.audio4 != nil) {
      [self.audio4 pause];
      [self.audio4 stop];
    }
    
    if (self.audio1 != nil) {
      [self.audio1 play];
      playerPlaying = 1;
      return;
    }
    
    NSError *error;
    if (self.audioSession == nil) {
      self.audioSession = [AVAudioSession sharedInstance];
      [self.audioSession setCategory:AVAudioSessionCategoryPlayback error:nil];
    }
    
    NSString *path =[[NSBundle mainBundle] pathForResource:fileName ofType:@"mp3"];
    NSURL *url = [NSURL fileURLWithPath:path];

    self.audio1 = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&error];
    
    self.audio1.numberOfLoops = repeat ? -1 : 1;
    [self.audio1 setVolume:0.5];
    [self.audio1 prepareToPlay];
    [self.audio1 play];
    
    playerPlaying = 1;
    
  } @catch (NSException *exception) {
    NSLog(@"SoundManager:eror:%@", exception);
  }
  
}

RCT_EXPORT_METHOD(play2:(NSString *)fileName repeat:(BOOL)repeat) {
  
  NSLog(@"SoundManager:fileName: %@", fileName);
  
  @try {
    
    if (self.audio1 != nil) {
      [self.audio1 pause];
      [self.audio1 stop];
    }
    
    if (self.audio3 != nil) {
      [self.audio3 pause];
      [self.audio3 stop];
    }
    
    if (self.audio4 != nil) {
      [self.audio4 pause];
      [self.audio4 stop];
    }
    
    if (self.audio2 != nil) {
      [self.audio2 play];
      playerPlaying = 2;
      return;
    }
    
    NSError *error;
    if (self.audioSession == nil) {
      self.audioSession = [AVAudioSession sharedInstance];
      [self.audioSession setCategory:AVAudioSessionCategoryPlayback error:nil];
    }
    
    NSString *path =[[NSBundle mainBundle] pathForResource:fileName ofType:@"mp3"];
    NSURL *url = [NSURL fileURLWithPath:path];
    
    self.audio2 = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&error];
    
    self.audio2.numberOfLoops = repeat ? -1 : 1;
    [self.audio2 setVolume:0.5];
    [self.audio2 prepareToPlay];
    [self.audio2 play];
    
    playerPlaying = 2;
    
  } @catch (NSException *exception) {
    NSLog(@"SoundManager:eror:%@", exception);
  }
  
}

RCT_EXPORT_METHOD(play3:(NSString *)fileName repeat:(BOOL)repeat) {
  
  NSLog(@"SoundManager:fileName: %@", fileName);
  
  @try {
    
    if (self.audio1 != nil) {
      [self.audio1 pause];
      [self.audio1 stop];
    }
    
    if (self.audio2 != nil) {
      [self.audio2 pause];
      [self.audio2 stop];
    }
    
    if (self.audio4 != nil) {
      [self.audio4 pause];
      [self.audio4 stop];
    }
    
    if (self.audio3 != nil) {
      [self.audio3 play];
      playerPlaying = 3;
      return;
    }
    
    NSError *error;
    if (self.audioSession == nil) {
      self.audioSession = [AVAudioSession sharedInstance];
      [self.audioSession setCategory:AVAudioSessionCategoryPlayback error:nil];
    }
    
    NSString *path =[[NSBundle mainBundle] pathForResource:fileName ofType:@"mp3"];
    NSURL *url = [NSURL fileURLWithPath:path];
    
    self.audio3 = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&error];
    
    self.audio3.numberOfLoops = repeat ? -1 : 1;
    [self.audio3 setVolume:0.5];
    [self.audio3 prepareToPlay];
    [self.audio3 play];
    
    playerPlaying = 3;
    
  } @catch (NSException *exception) {
    NSLog(@"SoundManager:eror:%@", exception);
  }
  
}

RCT_EXPORT_METHOD(play4:(NSString *)fileName repeat:(BOOL)repeat) {
  
  NSLog(@"SoundManager:fileName: %@", fileName);
  
  @try {
    
    if (self.audio1 != nil) {
      [self.audio1 pause];
      [self.audio1 stop];
    }
    
    if (self.audio2 != nil) {
      [self.audio2 pause];
      [self.audio2 stop];
    }
    
    if (self.audio3 != nil) {
      [self.audio3 pause];
      [self.audio3 stop];
    }
    
    if (self.audio4 != nil) {
      [self.audio4 play];
      playerPlaying = 4;
      return;
    }
    
    NSError *error;
    if (self.audioSession == nil) {
      self.audioSession = [AVAudioSession sharedInstance];
      [self.audioSession setCategory:AVAudioSessionCategoryPlayback error:nil];
    }
    
    NSString *path =[[NSBundle mainBundle] pathForResource:fileName ofType:@"mp3"];
    NSURL *url = [NSURL fileURLWithPath:path];
    
    self.audio4 = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&error];
    
    self.audio4.numberOfLoops = repeat ? -1 : 1;
    [self.audio4 setVolume:0.5];
    [self.audio4 prepareToPlay];
    [self.audio4 play];
    
    playerPlaying = 4;
    
  } @catch (NSException *exception) {
    NSLog(@"SoundManager:eror:%@", exception);
  }
  
}

RCT_EXPORT_METHOD(pause:(NSString *)action) {
  @try {
    if (self.audio1 != nil) {
      [self.audio1 pause];
    }
    if (self.audio2 != nil) {
      [self.audio2 pause];
    }
    if (self.audio3 != nil) {
      [self.audio3 pause];
    }
    if (self.audio4 != nil) {
      [self.audio4 pause];
    }
  } @catch (NSException *exception) {
    NSLog(@"SoundManager:eror:%@", exception);
  }
}

RCT_EXPORT_METHOD(resume:(NSString *)action) {
  @try {
    switch (playerPlaying) {
      case 1:
        if (self.audio1 != nil) {
          [self.audio1 play];
        }
        break;
        
      case 2:
        if (self.audio2 != nil) {
          [self.audio2 play];
        }
        break;
        
      case 3:
        if (self.audio3 != nil) {
          [self.audio3 play];
        }
        break;
        
      case 4:
        if (self.audio4 != nil) {
          [self.audio4 play];
        }
        break;
        
      default:
        break;
    }
  } @catch (NSException *exception) {
    NSLog(@"SoundManager:eror:%@", exception);
  }
}

RCT_EXPORT_METHOD(release:(NSString *)action) {
  @try {
    playerPlaying = 0;
    if (self.audio1) {
      [self.audio1 pause];
      [self.audio1 stop];
      self.audio1 = nil;
    }
    if (self.audio2) {
      [self.audio2 pause];
      [self.audio2 stop];
      self.audio2 = nil;
    }
    if (self.audio3) {
      [self.audio3 pause];
      [self.audio3 stop];
      self.audio3 = nil;
    }
    if (self.audio4) {
      [self.audio4 pause];
      [self.audio4 stop];
      self.audio4 = nil;
    }
    self.audioSession = nil;
  } @catch (NSException *exception) {
    NSLog(@"SoundManager:eror:%@", exception);
  }
}

@end
