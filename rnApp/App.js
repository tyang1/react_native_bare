import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends Component {

constructor(properties) {
  super(properties);
  //Remove this method to stop OneSignal Debugging 
  OneSignal.setLogLevel(6, 0);
  
  // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  OneSignal.init("8933e5b1-8fd4-4391-845e-bf1f3fb2b797", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
  OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
  
  // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
  OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

  //Get the current notification and permission state. Returns a OSPermissionSubscriptionState type, as described below.
  //
  OneSignal.getPermissionSubscriptionState((status) => {
    console.log("Check push notification and OneSignal subscription statuses", status);
});

   OneSignal.addEventListener('received', this.onReceived);
   OneSignal.addEventListener('opened', this.onOpened);
   OneSignal.addEventListener('ids', this.onIds);
}
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render(){
    return (
          <View style={styles.container}>
            <Text>Open up App.js to start working on your app!!!!</Text>
            <StatusBar style="auto" />
          </View>
        );
  }
}
function myiOSPromptCallback(permission){
    // do something with permission value
}