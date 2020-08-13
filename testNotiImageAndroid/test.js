import firebase from 'react-native-firebase';
// Optional flow type

export default async (message) => {
    console.log(message)
//     const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
//                 .setDescription('My apps test channel');
// // Create the channel
//         firebase.notifications().android.createChannel(channel);

    let notification = new firebase.notifications.Notification();
   
    notification.android.setChannelId('test-channel')
    notification.android.setPriority(firebase.notifications.Android.Priority.High);
    notification.android.setBigPicture(message.data.image);
    
    notification = notification.setTitle(message.data.title).setBody(message.data.body)
    
    firebase.notifications().displayNotification(notification);
        // Process your message as required
    return Promise.resolve();
}

// this.a = RNFirebase.messaging().onMessage((message: RemoteMessage) => {
//     // Process your message as required
//     alert('ok')
//     });