//
//  CalendarModule.swift
//  testIntegrateNativeAndroid
//
//  Created by Le Linh Duy on 12/13/18.
//  Copyright © 2018 Facebook. All rights reserved.
//
import UIKit
import CoreMotion
import Dispatch

@objc(CalendarManager)
class CalendarManager: RCTEventEmitter {
  private let activityManager = CMMotionActivityManager()
  private let pedometer = CMPedometer()
  private var shouldStartUpdating: Bool = false
  private var startDate: Date? = nil

  override init() {
    super.init()
    self.checkAuthorizationStatus()
  }
  
  @objc(onStart)
  private func onStart() {
    startDate = Date()
    checkAuthorizationStatus()
    startUpdating()
  }
  
  private func onStop() {
    startDate = nil
    stopUpdating()
  }
  
  private func startUpdating() {
    //        if CMMotionActivityManager.isActivityAvailable() {
    //            startTrackingActivityType()
    //        } else {
    //            activityTypeLabel.text = "Not available"
    //        }
    
    if CMPedometer.isStepCountingAvailable() {
      startCountingSteps()
    } else {
//      stepsCountLabel.text = "Not available"
    }
  }
  
  private func checkAuthorizationStatus() {
    if #available(iOS 11.0, *) {
      switch CMMotionActivityManager.authorizationStatus() {
      case CMAuthorizationStatus.denied:
        onStop()
      default:break
      }
    } else {
      // Fallback on earlier versions
    }
  }
  
  private func stopUpdating() {
    activityManager.stopActivityUpdates()
    pedometer.stopUpdates()
    if #available(iOS 10.0, *) {
      pedometer.stopEventUpdates()
    } else {
      // Fallback on earlier versions
    }
  }
  
  private func on(error: Error) {
    //handle error
  }
  
  private func updateStepsCountLabelUsing(startDate: Date) {
    pedometer.queryPedometerData(from: startDate, to: Date()) {
      [weak self] pedometerData, error in
      if let error = error {
        self?.on(error: error)
      } else if let pedometerData = pedometerData {
        DispatchQueue.main.async {
//          self?.stepsCountLabel.text = String(describing: pedometerData.numberOfSteps)
        }
      }
    }
  }
  
  private func startTrackingActivityType() {
    activityManager.startActivityUpdates(to: OperationQueue.main) {
      [weak self] (activity: CMMotionActivity?) in
      guard let activity = activity else { return }
      DispatchQueue.main.async {
        if activity.walking {
//          self?.activityTypeLabel.text = "Walking"
        } else if activity.stationary {
//          self?.activityTypeLabel.text = "Stationary"
        } else if activity.running {
//          self?.activityTypeLabel.text = "Running"
        } else if activity.automotive {
//          self?.activityTypeLabel.text = "Automotive"
        }
      }
    }
  }
  
  
  private func startCountingSteps() {
    
    pedometer.startUpdates(from: Date()) {
      [weak self] pedometerData, error in
      guard let pedometerData = pedometerData, error == nil else { return }
      print(pedometerData);
      DispatchQueue.main.async {
        print("ddddddd");
        let data: [AnyHashable : Any]! = [
          "numberOfSteps": pedometerData.numberOfSteps.stringValue,        ]
        self?.sendEvent(event: "incre", data: data)
      }
    }
  }
  
  func sendEvent(event: String, data: [AnyHashable : Any]!) {
    let body: [AnyHashable : Any]! = ["name": event, "data": data]
    self.sendEvent(withName: "CalendarManager", body: body)
  }
  
  override func supportedEvents() -> [String]! {
    return ["CalendarManager"]
  }
  
}
