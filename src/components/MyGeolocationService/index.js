import React from 'react';
import {
  Alert,
  Switch,
  Text,
  View,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/auth/actions';
import { apiUpdateDeviceLocation } from '../../utils/API';
import { urlUpdateLocation, urlUpdateLocationFree } from '../../utils/API_URL';
import { console_log, empty } from '../../utils/Misc';
import { requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

const MyGeolocationService = (props) => {
  const { debugMode = false } = props
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth.user);
  const { location_enabled } = useSelector(state => state.settings);
  console_log("location_enabled, token", location_enabled, token)

  const [enabled, setEnabled] = React.useState(false);
  const [location, setLocation] = React.useState('');

  const callApiUpdateLocation = async (position) => {
    await apiUpdateDeviceLocation(position)
  }

  const requestRNPermission = async () => {
    const result = await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION])
    console_log("result:::::", result)
    if (result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED) {
      if (result[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION] === RESULTS.GRANTED || result[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION] === RESULTS.UNAVAILABLE) {
        return true
      }
    }
    return false
  }

  const showAlert = (error)=>{
    if(empty(location_enabled)) {
      return false
    }

    if(error.code === 1) {
      Alert.alert(error.message,  "", [
        {
          text: "OK",
          onPress: () => requestRNPermission(),
          style: "cancel"
        },
      ])
      return true
    }
    Alert.alert(error.message,  "", [
      {
        text: "OK",
        onPress: () => console_log("Cancel Pressed"),
        style: "cancel"
      }
    ])
  }
  React.useEffect(() => {
    if (token) {
      // Geolocation.getCurrentPosition(
      //   (position) => {
      //     console_log("Geolocation position:::", position);
      //   },
      //   (error) => {
      //     // See error code charts below.
      //     console_log("Geolocation error:::", error.code, error.message);
      //   },
      //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      // );


      const watchId = Geolocation.watchPosition(
        (position) => {
          console_log("Geolocation watchPosition:::", position);
          if (position) {
            callApiUpdateLocation(position)
          }
          setLocation(JSON.stringify(position, null, 2));
        },
        (error) => {
          // See error code charts below.
          console_log("Geolocation error:::", error.code, error.message);
          showAlert(error)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );

      return () => {
        Geolocation.clearWatch(watchId)
      }
    }
  }, [token, enabled]);



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

export default MyGeolocationService;