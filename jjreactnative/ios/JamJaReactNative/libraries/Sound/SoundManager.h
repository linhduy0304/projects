//
//  SoundManager.h
//  JamJaReactNative
//
//  Created by Sinh Phan on 11/10/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>

#import <React/RCTBridgeModule.h>

@interface SoundManager : NSObject <RCTBridgeModule>
@property (strong, nonatomic) AVAudioPlayer *audio1;
@property (strong, nonatomic) AVAudioPlayer *audio2;
@property (strong, nonatomic) AVAudioPlayer *audio3;
@property (strong, nonatomic) AVAudioPlayer *audio4;
@property (strong, nonatomic) AVAudioSession *audioSession;
@property (strong, nonatomic) NSString *file1;
@property (strong, nonatomic) NSString *file2;
@property (strong, nonatomic) NSString *file3;
@property (strong, nonatomic) NSString *file4;
@end
