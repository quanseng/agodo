// import React from 'react';
// import {
//   Switch,
//   Text,
//   View,
// } from 'react-native';

// import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../../redux/auth/actions';
// import { urlUpdateLocation, urlUpdateLocationFree } from '../../utils/API_URL';
// import { console_log, empty } from '../../utils/Misc';

// const MyBackgroundGeolocationFree = (props) => {
//   const { debugMode = false } = props
//   const dispatch = useDispatch()
//   const { token } = useSelector(state => state.auth.user);
//   const { location_enabled } = useSelector(state => state.settings);
//   console_log("location_enabled, token", location_enabled, token)

//   const [enabled, setEnabled] = React.useState(false);
//   const [location, setLocation] = React.useState('');

//   React.useEffect(() => {
//     if (token) {
//       BackgroundGeolocation.configure({
//         desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
//         stationaryRadius: 50,
//         distanceFilter: 50,
//         notificationTitle: 'Background tracking',
//         notificationText: 'enabled',
//         debug: true,
//         startOnBoot: false,
//         stopOnTerminate: true,
//         locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
//         interval: 10000,
//         fastestInterval: 5000,
//         activitiesInterval: 10000,
//         stopOnStillActivity: false,
//         url: urlUpdateLocationFree,
//         httpHeaders: {
//           "Authorization": "Bearer " + token
//         },
//         // customize post properties
//         postTemplate: {
//           lat: '@latitude',
//           lon: '@longitude',
//           "auth_token": token
//         }
//       });

//       BackgroundGeolocation.on('location', (location) => {
//         console_log('[onLocation] BackgroundGeolocation ', location);
//         setLocation(JSON.stringify(location, null, 2));

//         // handle your locations here
//         // to perform long running operation on iOS
//         // you need to create background task
//         BackgroundGeolocation.startTask(taskKey => {
//           // execute long running task
//           // eg. ajax post location
//           // IMPORTANT: task has to be ended by endTask
//           BackgroundGeolocation.endTask(taskKey);
//         });
//       });

//       BackgroundGeolocation.on('stationary', (stationaryLocation) => {
//         // handle stationary locations here
//         Actions.sendLocation(stationaryLocation);
//       });

//       BackgroundGeolocation.on('error', (error) => {
//         console_log('[ERROR] BackgroundGeolocation error:', error);
//       });

//       BackgroundGeolocation.on('start', () => {
//         console_log('[INFO] BackgroundGeolocation service has been started');
//       });

//       BackgroundGeolocation.on('stop', () => {
//         console_log('[INFO] BackgroundGeolocation service has been stopped');
//       });

//       BackgroundGeolocation.on('authorization', (status) => {
//         console_log('[INFO] BackgroundGeolocation authorization status: ' + status);
//         if (status !== BackgroundGeolocation.AUTHORIZED) {
//           // we need to set delay or otherwise alert may not be shown
//           setTimeout(() =>
//             Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
//               { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
//               { text: 'No', onPress: () => console_log('No Pressed'), style: 'cancel' }
//             ]), 1000);
//         }
//       });

//       BackgroundGeolocation.on('background', () => {
//         console_log('[INFO] App is in background');
//       });

//       BackgroundGeolocation.on('foreground', () => {
//         console_log('[INFO] App is in foreground');
//       });

//       BackgroundGeolocation.on('abort_requested', () => {
//         console_log('[INFO] Server responded with 285 Updates Not Required');

//         // Here we can decide whether we want stop the updates or not.
//         // If you've configured the server to return 285, then it means the server does not require further update.
//         // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
//         // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
//       });

//       BackgroundGeolocation.on('http_authorization', () => {
//         console_log('[INFO] App needs to authorize the http requests');
//       });

//       BackgroundGeolocation.checkStatus(status => {
//         console_log('[INFO] BackgroundGeolocation service is running', status.isRunning);
//         console_log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
//         console_log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

//         // you don't need to check status before start (this is just the example)
//         if (!status.isRunning) {
//           BackgroundGeolocation.start(); //triggers start on start event
//         }
//       });

//       // you can also just start without checking for status
//       // BackgroundGeolocation.start();	


//       return () => {
//         // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
//         // during development live-reload.  Without this, event-listeners will accumulate with
//         // each refresh during live-reload.
//         BackgroundGeolocation.removeAllListeners();
//       }
//     }
//   }, [token]);

//   /// 3. start / stop BackgroundGeolocation
//   React.useEffect(() => {
//     if (enabled && !empty(token)) {
//       BackgroundGeolocation.start();
//     } else {
//       BackgroundGeolocation.stop();
//       setLocation('');
//     }
//   }, [enabled, token]);

//   React.useEffect(() => {
//     if (location_enabled) {
//       setEnabled(true)
//     } else {
//       setEnabled(false)
//     }
//   }, [location_enabled]);

//   return (
//     <>
//       {
//         (debugMode) ? (
//           <View style={{ alignItems: 'center' }}>
//             <Text>Click to enable BackgroundGeolocation</Text>
//             <Switch value={enabled} onValueChange={setEnabled} />
//             <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>{location}</Text>
//           </View>
//         ) : (
//           <React.Fragment></React.Fragment>
//         )
//       }
//     </>
//   )
// }

// export default MyBackgroundGeolocationFree;