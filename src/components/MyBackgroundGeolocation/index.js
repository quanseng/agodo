import React from 'react';
import {
  Switch,
  Text,
  View,
} from 'react-native';

import BackgroundGeolocation, {
  Location,
  Subscription
} from "react-native-background-geolocation";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/auth/actions';
import { urlUpdateLocation } from '../../utils/API_URL';
import { console_log, empty } from '../../utils/Misc';

const MyBackgroundGeolocation = (props) => {
  const { debugMode = false } = props
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth.user);
  const { location_enabled } = useSelector(state => state.settings);
  console_log("location_enabled, token", location_enabled, token)

  const [enabled, setEnabled] = React.useState(false);
  const [location, setLocation] = React.useState('');

  React.useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation = BackgroundGeolocation.onLocation((location) => {
      console_log('[onLocation]', location);
      setLocation(JSON.stringify(location, null, 2));
      if(location && location['coords']){
        if(token) {
          let locationUpdate = {
            latitude: location['coords']['latitude'],
            longitude: location['coords']['longitude'],
          }
          dispatch(setUser(locationUpdate))
        }
      }
    })

    const onMotionChange = BackgroundGeolocation.onMotionChange((event) => {
      console_log('[onMotionChange]', event);
    });

    const onActivityChange = BackgroundGeolocation.onActivityChange((event) => {
      console_log('[onMotionChange]', event);
    })

    const onProviderChange = BackgroundGeolocation.onProviderChange((event) => {
      console_log('[onProviderChange]', event);
    })

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: urlUpdateLocation,
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      // headers: {              // <-- Optional HTTP headers
      //   "Authorization": "Bearer " + token
      // },
      headers: {              // <-- Optional HTTP headers
        "Authorization": "Bearer " + token
      },
      params: {               // <-- Optional HTTP params
        "auth_token": token
      }
    }).then((state) => {
      console_log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      //setEnabled(state.enabled)
      if(state.enabled) {
        setEnabled(state.enabled)
      }else{
        //setEnabled(true)
      }
    });

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    }
  }, []);

  /// 3. start / stop BackgroundGeolocation
  React.useEffect(() => {
    if (enabled && !empty(token)) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      setLocation('');
    }
  }, [enabled, token]);

  React.useEffect(() => {
    if (location_enabled) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [location_enabled]);

  return (
    <>
      {
        (debugMode) ? (
          <View style={{ alignItems: 'center' }}>
            <Text>Click to enable BackgroundGeolocation</Text>
            <Switch value={enabled} onValueChange={setEnabled} />
            <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>{location}</Text>
          </View>
        ) : (
          <React.Fragment></React.Fragment>
        )
      }
    </>
  )
}

export default MyBackgroundGeolocation;