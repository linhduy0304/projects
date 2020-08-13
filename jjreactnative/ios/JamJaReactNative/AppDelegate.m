#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>

#import "React/RCTLog.h"
#import <Firebase.h>
#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"
#import <React/RCTLinkingManager.h>
#import <FBNotifications/FBNotifications.h>
#import "RNFirebaseLinks.h"
#import <React/RCTPushNotificationManager.h>
#import <FirebaseAnalytics/FirebaseAnalytics.h>

#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>

#import <CodePush/CodePush.h>

#import <GoogleMaps/GoogleMaps.h>

@import GoogleMaps;


#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
#if DEBUG == 0
    [Fabric with:@[[Crashlytics class]]];
#endif
  
  NSBundle* mainBundle = [NSBundle mainBundle];
  NSString* googleMapKey = [mainBundle objectForInfoDictionaryKey:@"GGMAPKEY"];
  
  NSString* buildType = [[NSBundle mainBundle] objectForInfoDictionaryKey: @"AppBuildType"];
  if (buildType != nil && [buildType isEqualToString:@"dev"]) {
    NSMutableArray *newArguments = [NSMutableArray arrayWithArray:[[NSProcessInfo processInfo] arguments]];
    [newArguments addObject:@"-FIRDebugEnabled"];
    [newArguments addObject:@"-FIRAnalyticsDebugEnabled"];
    [[NSProcessInfo processInfo] setValue:[newArguments copy] forKey:@"arguments"];
  }
  
  [GMSServices provideAPIKey:googleMapKey];
  [FIROptions defaultOptions].deepLinkURLScheme = @"jamjalinks";
  [FIRApp configure];
  [FIRMessaging messaging].delegate = self;
  [RNFirebaseNotifications configure];
  
  RCTLog(@"AppDelegate:didFinishLaunchingWithOptions: %@", launchOptions);
//  application.applicationIconBadgeNumber = 0;
  
  if (SYSTEM_VERSION_LESS_THAN( @"10.0" )) {
    // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
    UIUserNotificationType allNotificationTypes = (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
    [application registerUserNotificationSettings:settings];
    
  } else {
    // iOS 10 or later
    // For iOS 10 display notification (sent via APNS)
    UNUserNotificationCenter *current = [UNUserNotificationCenter currentNotificationCenter];
    if (current != nil) current.delegate = self;
  }
  
  [application registerForRemoteNotifications];
  
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];

  NSURL *jsCodeLocation;
  #ifdef DEBUG
//    jsCodeLocation = [NSURL URLWithString:@"http://192.168.2.232:8081/index.bundle?platform=ios&dev=true"];
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
//      jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    jsCodeLocation = [CodePush bundleURL];
  #endif
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"JamJaReactNative"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  rootView.backgroundColor = [UIColor colorWithRed:0.98 green:0.98 blue:0.98 alpha:1.0];
  rootView.loadingViewFadeDelay = 0.25;
  rootView.loadingViewFadeDuration = 0.25;
  
  UIScreen* screen = [UIScreen mainScreen];
  
  self.window = [[UIWindow alloc] initWithFrame:screen.bounds];
  
  UIView* loadingView = [[UIView alloc] initWithFrame:screen.bounds];
  UIView* loadingContent = [[[NSBundle mainBundle] loadNibNamed:@"LaunchScreen" owner:self options:nil] firstObject];
  loadingContent.frame = self.window.frame;
  loadingContent.bounds = self.window.bounds;
  [loadingView addSubview:loadingContent];
  
  rootView.loadingView = loadingView;
  
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  
  RCTLog(@"AppDelegate:openURL: %@", url);
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                                options:options];
  
  if (!handled) {
    handled = [[RNFirebaseLinks instance] application:application openURL:url options:options];
  }
  
  if (!handled) {
    handled = [RCTLinkingManager application:application openURL:url options:options];
  }
  
  return handled;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  
  RCTLog(@"AppDelegate:openURL: %@", url);
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:sourceApplication
                                                             annotation:annotation];
  
  FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];
  NSLog(@"AppDelegate:FIRDynamicLink:dynamicLink: %@", dynamicLink);
  if (dynamicLink) NSLog(@"AppDelegate:FIRDynamicLink:dynamicLink:url: %@", dynamicLink.url);
  
  if (!handled) {
    handled = [RCTLinkingManager application:application openURL:url
                           sourceApplication:sourceApplication annotation:annotation];
  }
  
  
  return handled;
}

- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler
{
  
  NSLog(@"AppDelegate:continueUserActivity");
  BOOL handled = [[RNFirebaseLinks instance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  
  if (!handled) {
    handled = [RCTLinkingManager application:application
                        continueUserActivity:userActivity
                          restorationHandler:restorationHandler];
  }
  
  return handled;
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
  RCTLog(@"AppDelegate:applicationDidBecomeActive");
  [FBSDKAppEvents activateApp];
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
  NSLog(@"AppDelegate:applicationDidEnterBackground");
}


// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  // If you are receiving a notification message while your app is in the background,
  // this callback will not be fired till the user taps on the notification launching the application.
  // TODO: Handle data of notification
  
  // With swizzling disabled you must let Messaging know about the message, for Analytics
  // [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
  
  // Print full message.
  NSLog(@"AppDelegate:didReceiveRemoteNotification: %@", userInfo);
  
  [FIRAnalytics logEventWithName:@"nof_receive"
                      parameters:@{
                                   @"name": @"test",
                                   @"id": @"1",
                                   }];
}

// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application
didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  RCTLog( @"AppDelegate:didReceiveRemoteNotification: %@", userInfo);
  
  [FIRAnalytics logEventWithName:@"nof_receive"
                      parameters:@{
                                   @"name": @"test",
                                   @"id": @"2",
                                   }];
  
  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];

  if( SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO( @"10.0" ) )
  {
    RCTLog( @"AppDelegate:didReceiveRemoteNotification:iOS version >= 10. Let NotificationCenter handle this one." );
    // set a member variable to tell the new delegate that this is background
    completionHandler(UIBackgroundFetchResultNewData);
    return;
  }
  
  // custom code to handle notification content
  
  if( [UIApplication sharedApplication].applicationState == UIApplicationStateInactive )
  {
    RCTLog( @"AppDelegate:didReceiveRemoteNotification:INACTIVE" );
    completionHandler( UIBackgroundFetchResultNewData );
  }
  else if( [UIApplication sharedApplication].applicationState == UIApplicationStateBackground )
  {
    RCTLog( @"AppDelegate:didReceiveRemoteNotification:BACKGROUND" );
    completionHandler( UIBackgroundFetchResultNewData );
  }
  else
  {
    RCTLog( @"AppDelegate:didReceiveRemoteNotification:FOREGROUND" );
    completionHandler( UIBackgroundFetchResultNewData );
  }
}

// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  
  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
  RCTLog( @"AppDelegate:didReceiveLocalNotification: %@", notification );
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler;
{
  RCTLog(@"AppDelegate:Handle push from foreground: %@", notification.request.content.userInfo);
  [FIRAnalytics logEventWithName:@"nof_receive"
                      parameters:@{
                                   @"name": @"test",
                                   @"id": @"3",
                                   }];
  completionHandler(UNNotificationPresentationOptionAlert);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  RCTLog(
         @"AppDelegate:didReceiveNotificationResponse:Handle push from background or closed: %@",
         response.notification.request.content.userInfo
         );
  
  if( [UIApplication sharedApplication].applicationState == UIApplicationStateInactive )
  {
    RCTLog( @"AppDelegate:didReceiveNotificationResponse:INACTIVE" );
  }
  else if( [UIApplication sharedApplication].applicationState == UIApplicationStateBackground )
  {
    RCTLog( @"AppDelegate:didReceiveNotificationResponse:BACKGROUND" );
  }
  else
  {
    RCTLog( @"AppDelegate:didReceiveNotificationResponse:FOREGROUND" );
  }
  
  return completionHandler();
}

#pragma FCM Delegate
- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
  NSLog(@"AppDelegate:FCM registration token: %@", fcmToken);
}

- (void)messaging:(FIRMessaging *)messaging didReceiveMessage:(FIRMessagingRemoteMessage *)remoteMessage {
  NSLog(@"AppDelegate:Received data message: %@", remoteMessage.appData);
}
@end
