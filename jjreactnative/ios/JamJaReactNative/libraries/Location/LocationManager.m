//
//  LocationManager.m
//  JamJaReactNative
//
//  Created by Sinh Phan on 10/29/18.
//  Copyright © 2018 JAMJA. All rights reserved.
//

#import "LocationManager.h"
#import "JJLocationPositionError.h"

#import <CoreLocation/CoreLocation.h>

#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>

#define RCT_DEFAULT_LOCATION_ACCURACY kCLLocationAccuracyHundredMeters
#define LOCATION_UPDATE_EVENT @"location_update_event_listener"

@interface LocationManager () <CLLocationManagerDelegate>

@property (strong, nonatomic) CLLocationManager *locationManager;
@property (strong, nonatomic) CLGeocoder *geocoder;

@end

@implementation LocationManager

BOOL _requestingLocation;
NSDictionary<NSString*, id> *currentOptions;

//- (dispatch_queue_t)methodQueue
//{
//  return dispatch_get_main_queue();
//}

RCT_EXPORT_MODULE(JJLocation)

@synthesize bridge = _bridge;

#pragma mark Initialization

- (instancetype)init
{
  if (self = [super init]) {
    self.locationManager = [[CLLocationManager alloc] init];
    
    self.locationManager.delegate = self;
    
    self.locationManager.distanceFilter = kCLDistanceFilterNone;
    self.locationManager.desiredAccuracy = kCLLocationAccuracyBest;
    
    self.locationManager.pausesLocationUpdatesAutomatically = NO;
    
    self.geocoder = [[CLGeocoder alloc] init];
  }
  
  return self;
}

#pragma mark

- (NSArray<NSString *> *)supportedEvents
{
  return @[LOCATION_UPDATE_EVENT];
}

RCT_EXPORT_METHOD(getCurrentPosition:(NSDictionary<NSString *, id>*) options)
{
  NSLog(@"LocationManager:getCurrentPosition:%@ %d %d", options, [CLLocationManager locationServicesEnabled], [CLLocationManager authorizationStatus]);
  currentOptions = options;
  _requestingLocation = YES;
  
  NSNumber *distanceFilter = 0;
  BOOL forceSettings = NO;
  if (currentOptions) {
    distanceFilter = [currentOptions objectForKey:@"distanceFilter"];
    forceSettings = [currentOptions objectForKey:@"forceSettings"];
  }
  
  CLAuthorizationStatus status = [CLLocationManager authorizationStatus];
  
  if (![CLLocationManager locationServicesEnabled]) {
    NSLog(@"LocationManager:getCurrentPosition:locationServicesEnabled false");
  
    if (forceSettings) [self alertRequestLocationSettings];
    else [self.locationManager requestWhenInUseAuthorization];
    return;
  }
  else if (status == kCLAuthorizationStatusNotDetermined) {
    NSLog(@"LocationManager:getCurrentPosition:kCLAuthorizationStatusNotDetermined");
    
    if (forceSettings) [self alertRequestLocationSettings];
    else [self.locationManager requestWhenInUseAuthorization];
    return;
  }
  else if (status == kCLAuthorizationStatusDenied) {
    NSLog(@"LocationManager:getCurrentPosition:kCLAuthorizationStatusDenied");
    if (forceSettings) [self alertRequestLocationSettings];
    else [self.locationManager requestWhenInUseAuthorization];
    return;
  }
  
  CLLocationAccuracy accuracy = YES;
  if (self.locationManager) {
    accuracy = MIN(self.locationManager.desiredAccuracy, accuracy);
  }

  [self beginLocationUpdatesWithDesiredAccuracy:accuracy
                                 distanceFilter:[distanceFilter doubleValue]];
}

RCT_EXPORT_METHOD(stop)
{
  if (self.locationManager) {
    [self.locationManager stopMonitoringSignificantLocationChanges];
    [self.locationManager stopUpdatingLocation];
  }
}

- (void)beginLocationUpdatesWithDesiredAccuracy:(CLLocationAccuracy)desiredAccuracy
                                 distanceFilter:(CLLocationDistance)distanceFilter
{
  if (!self.locationManager) {
    self.locationManager = [CLLocationManager new];
    self.locationManager.delegate = self;
  }
  
  self.locationManager.distanceFilter  = distanceFilter;
  self.locationManager.desiredAccuracy = desiredAccuracy;
  
  NSLog(@"LocationManager:Start updating loation");
  
  [self.locationManager startMonitoringSignificantLocationChanges];
  [self.locationManager startUpdatingLocation];
}

-(void)fetchLocationAddress:(CLLocation*) location
{
  NSLog(@"LocationManager:fetchLocationAddress %@", location);
  
  @try {
    if (location != nil && self.geocoder != nil)
    {
      [self.geocoder reverseGeocodeLocation:location
                          completionHandler:^(NSArray *placemarks,
                                              NSError *error) {
                            [self dispatchLocationAddress:location address:placemarks];
                          }];
    }
    else
    {
      [self sendEventWithName:LOCATION_UPDATE_EVENT
                         body:NULL];
    }
  } @catch (NSException *exception) {
    NSLog(@"LocationManager:fetchLocationAddress: %@", exception);
  }
}

- (void)dispatchLocationAddress:(CLLocation*) location
                        address:(NSArray*) placemarks
{
  @try {
    if (placemarks == nil) {
      [self sendEventWithName:LOCATION_UPDATE_EVENT
                         body:NULL];
      return;
    }
    
    CLPlacemark *placemark = [placemarks lastObject];
    
    NSLog(@"LocationManager:address: %@", placemark);
    
    if (placemark != nil && location != nil) {
      NSString *locality;
      NSString *subLocality;
      NSString *administrativeArea;
      NSString *subAdministrativeArea;
      
      if (placemark.locality != nil) {
        locality = placemark.locality;
      }
      else
      {
        locality = @"Ha Noi";
      }
      
      if (placemark.subLocality != nil) {
        subLocality = placemark.subLocality;
      }
      else
      {
        subLocality = @"Ha Noi";
      }
      
      if (placemark.administrativeArea != nil) {
        administrativeArea = placemark.administrativeArea;
      }
      else
      {
        administrativeArea = @"Ha Noi";
      }
      
      if (placemark.subAdministrativeArea != nil) {
        subAdministrativeArea = placemark.subAdministrativeArea;
      }
      else
      {
        subAdministrativeArea = @"Ha Noi";
      }
      
      NSDictionary *result = @{
                               @"latitude"                 : @(location.coordinate.latitude),
                               @"longitude"                : @(location.coordinate.longitude),
                               @"address"                  : @{
                                   @"locality" : locality,
                                   @"subLocality"  : subLocality,
                                   @"administrativeArea": administrativeArea,
                                   @"subAdministrativeArea" : subAdministrativeArea
                                   }
                               };
      
      // Send event
      [self sendEventWithName:LOCATION_UPDATE_EVENT
                         body:result];
    }
    else
    {
      [self sendEventWithName:LOCATION_UPDATE_EVENT
                         body:NULL];
    }
  } @catch (NSException *exception) {
    NSLog(@"LocationManager:dispatchLocationAddress:error:%@", exception);
  }
}

- (void)alertRequestLocationSettings
{
    NSString *title = @"Bật định vị";
    NSString *message = @"Vui lòng cho phép JAMJA truy cập định vị để giúp tìm kiếm các giảm giá quanh bạn.";
    
    UIAlertController * alert = [UIAlertController alertControllerWithTitle:title
                                                                    message:message
                                                             preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *allowAction = [UIAlertAction actionWithTitle:@"Cài đặt"
                                                           style:UIAlertActionStyleDefault
                                                         handler:^(UIAlertAction * action) {
                                                           
                                                           NSLog(@"LocationManager:Allow");
                                                           
                                                           [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];

                                                           
//                                                           if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"App-Prefs:root=Privacy&path=LOCATION"]]){
//                                                             [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"App-Prefs:root=Privacy&path=LOCATION"]];
//
//                                                           }
//                                                           else if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"prefs:root=LOCATION_SERVICES"]]) {
//                                                             [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"prefs:root=LOCATION_SERVICES"]];
//
//                                                           }
//                                                           else {
//                                                             [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"App-Prefs:root=LOCATION_SERVICES"]];
//                                                           }
                                                           
                                                         }];
    
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"Đóng"
                                                           style:UIAlertActionStyleDefault
                                                         handler:^(UIAlertAction * action) {
                                                           
                                                           NSLog(@"LocationManager:Cancel");
                                                           _requestingLocation = NO;
                                                         }];
    
    [alert addAction:allowAction];
    [alert addAction:cancelAction];
    
    UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
    dispatch_async(dispatch_get_main_queue(), ^{
      [rootViewController presentViewController:alert animated: YES completion: nil];
    });
}

#pragma mark - CLLocationManagerDelegate

-(void)locationManager:(CLLocationManager *)manager
didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
  NSLog(@"LocationManager:___didChangeAuthorizationStatus: %d", status);
  switch (status) {
      case kCLAuthorizationStatusAuthorizedAlways:
      NSLog(@"LocationManager:didChangeAuthorizationStatus:kCLAuthorizationStatusAuthorizedAlways_3");
      if (_requestingLocation) {
        [self getCurrentPosition:currentOptions];
      }
      break;
      
      case kCLAuthorizationStatusAuthorizedWhenInUse:
      NSLog(@"LocationManager:didChangeAuthorizationStatus:kCLAuthorizationStatusAuthorizedWhenInUse_4");
      if (_requestingLocation) {
        [self getCurrentPosition:currentOptions];
      }
      break;
      
      case kCLAuthorizationStatusDenied:
      NSLog(@"LocationManager:didChangeAuthorizationStatus:kCLAuthorizationStatusDenied_2");
      _requestingLocation = NO;
      [self sendEventWithName:LOCATION_UPDATE_EVENT
                         body:NULL];
      break;
      
      case kCLAuthorizationStatusNotDetermined:
      NSLog(@"LocationManager:didChangeAuthorizationStatus:kCLAuthorizationStatusNotDetermined_0");
      if (_requestingLocation) {
        [self.locationManager requestWhenInUseAuthorization];
      }
      break;
      
      case kCLAuthorizationStatusRestricted:
      NSLog(@"LocationManager:didChangeAuthorizationStatus:kCLAuthorizationStatusRestricted_1");
      break;
  }
}

- (void)locationManager:(CLLocationManager *)manager
     didUpdateLocations:(NSArray<CLLocation *> *)locations
{
  [self.locationManager stopMonitoringSignificantLocationChanges];
  [self.locationManager stopUpdatingLocation];
  
  NSLog(@"LocationManager:response:%@", locations);
  
  // Create event
  CLLocation *location = locations.lastObject;
  [self fetchLocationAddress:location];
  
  // Reset location accuracy if desiredAccuracy is changed.
  // Otherwise update accuracy will force triggering didUpdateLocations, watchPosition would keeping receiving location updates, even there's no location changes.
  if (ABS(self.locationManager.desiredAccuracy - RCT_DEFAULT_LOCATION_ACCURACY) > 0.000001) {
    self.locationManager.desiredAccuracy = RCT_DEFAULT_LOCATION_ACCURACY;
  }
  
  _requestingLocation = NO;
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
  
  NSLog(@"LocationManager:error:%@", error);
  
  // Check error type
  NSDictionary<NSString *, id> *jsError = nil;
  switch (error.code) {
      case kCLErrorDenied:
      jsError = JJLocationPositionError(JJLocationPositionErrorDenied, nil);
      break;
      case kCLErrorNetwork:
      jsError = JJLocationPositionError(JJLocationPositionErrorUnavailable, @"Unable to retrieve location due to a network failure");
      break;
      case kCLErrorLocationUnknown:
    default:
      jsError = JJLocationPositionError(JJLocationPositionErrorUnavailable, nil);
      break;
  }
  
  // Send event
  [self sendEventWithName:LOCATION_UPDATE_EVENT body:NULL];
  
  // Reset location accuracy if desiredAccuracy is changed.
  // Otherwise update accuracy will force triggering didUpdateLocations, watchPosition would keeping receiving location updates, even there's no location changes.
  if (ABS(self.locationManager.desiredAccuracy - RCT_DEFAULT_LOCATION_ACCURACY) > 0.000001) {
    self.locationManager.desiredAccuracy = RCT_DEFAULT_LOCATION_ACCURACY;
  }
  
  _requestingLocation = NO;
}

static NSDictionary<NSString *, id> *JJLocationPositionError(JJLocationPositionErrorCode code, NSString *msg /* nil for default */)
{
  if (!msg) {
    switch (code) {
        case JJLocationPositionErrorDenied:
        msg = @"User denied access to location services.";
        break;
        case JJLocationPositionErrorUnavailable:
        msg = @"Unable to retrieve location.";
        break;
        case JJLocationPositionErrorTimeout:
        msg = @"The location request timed out.";
        break;
    }
  }
  
  return @{
           @"code": @(code),
           @"message": msg,
           @"PERMISSION_DENIED": @(JJLocationPositionErrorDenied),
           @"POSITION_UNAVAILABLE": @(JJLocationPositionErrorUnavailable),
           @"TIMEOUT": @(JJLocationPositionErrorTimeout)
           };
}

@end
