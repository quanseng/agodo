import { Platform, Dimensions, Alert } from 'react-native';
import { isTablet } from 'react-native-device-info';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import Notification from 'react-native-toast-message';
import Toast from 'react-native-root-toast';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { addItemToArray, empty, removeItemFromArray } from './Misc';

let toastInstance = null;

export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';
export const getDate = (date, format = 'LL') => {
  return date ? moment(date).format(format) : moment().format(format);
}
export const isRoundedDevice = () => {
  return DeviceInfo.getModel() === 'iPhone X' ||
    DeviceInfo.getModel() === 'iPhone XS' ||
    DeviceInfo.getModel() === 'iPhone XS Max' ||
    DeviceInfo.getModel() === 'iPhone XR' ||
    DeviceInfo.getModel() === 'iPhone 11' ||
    DeviceInfo.getModel() === 'iPhone 11 Pro' ||
    DeviceInfo.getModel() === 'iPhone 11 Pro Max' ||
    DeviceInfo.getModel() === 'iPhone 12 mini' ||
    DeviceInfo.getModel() === 'iPhone 12' ||
    DeviceInfo.getModel() === 'iPhone 12 Pro' ||
    DeviceInfo.getModel() === 'iPhone 12 Pro Max'
};
export const isPadTablet = () => {
  // const state = store.getState();
  // const dispatch = useDispatch()

  // console_log("state:::", state)

  if (Platform.OS === 'ios') { //ios
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const ratio = windowHeight / windowWidth;
    //console_log("ratio:::", ratio)

    if (ratio <= 1.6) {
      //console_log("deviceType:::::::::::::::::: iPad")
      return true; //ipad
    } else {
      //console_log("deviceType:::::::::::::::::: iphone")
      return false; //iphone
    }
  } else { //android
    if (isTablet()) {
      //console_log("deviceType:::::::::::::::::: tablet")
      return true; // tablet
    } else {
      //console_log("deviceType:::::::::::::::::: android phone")
      return false; //android phone
    }
  }
};

export const setDarkStatusBarStyle = (statusbar) => {
  statusbar.setBarStyle('dark-content');
  if (isAndroid) {
    statusbar.setBackgroundColor('rgba(255,255,255,0)');
    statusbar.setTranslucent(true);
  }
}
export const setLightStatusBarStyle = (statusbar) => {
  statusbar.setBarStyle('light-content');
  if (isAndroid) {
    statusbar.setBackgroundColor('rgba(255,255,255,0)');
    statusbar.setTranslucent(true);
  }
}

export const apiRequest = async (method, url, body = null, headers = null, isCancelled = false) => {
  const onSuccess = (response) => {
    return response;
  }
  const onError = (error) => {
    return Promise.reject(error);
  }
  let payload = {
    method: method,
    url: url,
    data: body,
    headers: headers,
  }
  if (isCancelled) { payload["cancelToken"] = axios.CancelToken.source().token }

  return axios(payload).then(onSuccess).catch(onError);
}

export const checkLoading = (loadingList = null, STATIC_VALUES = null, setLoading) => {
  let curLoadingList = [...STATIC_VALUES.current['apiLoadingList']]
  if (loadingList !== null) {
    curLoadingList = loadingList
  }
  const isLoading = (!empty(curLoadingList) && curLoadingList.length > 0)
  setLoading(isLoading)
  return isLoading
}
export const startApiLoading = (apiKey, STATIC_VALUES = null, setLoading) => {
  const newApiLoadingList = addItemToArray([...STATIC_VALUES.current['apiLoadingList']], apiKey)
  STATIC_VALUES.current['apiLoadingList'] = (newApiLoadingList)
  checkLoading(newApiLoadingList, STATIC_VALUES, setLoading)
}
export const endApiLoading = (apiKey, STATIC_VALUES = null, setLoading) => {
  const newApiLoadingList = removeItemFromArray([...STATIC_VALUES.current['apiLoadingList']], apiKey)
  STATIC_VALUES.current['apiLoadingList'] = (newApiLoadingList)
  checkLoading(newApiLoadingList, STATIC_VALUES, setLoading)
}
export const checkApiIsLoading = (apiKey, STATIC_VALUES = null) => {
  if (!STATIC_VALUES.current['apiLoadingList'].includes(apiKey)) {
    return false;
  } else {
    return true;
  }
}

export const showNotification = (option = null) => { //show notification something like push notification
  let toastOption = {
    type: 'success',
    text1: 'Test'
  }
  if (option !== null) {
    toastOption = { ...toastOption, ...option }
  }
  Notification.show(toastOption);
}

export const showToast = (option = null) => { //show toast something like native toast
  let toastOption = {
    message: '',
    duration: Toast.durations.LONG
  }
  if (option !== null) {
    toastOption = { ...toastOption, ...option }
  }

  if (toastOption.message === "") {
    return false;
  }

  if (toastInstance !== null) {
    Toast.hide(toastInstance);
  }

  // Add a Toast on screen.
  let toast = Toast.show(toastOption.message, {
    duration: toastOption.duration,// Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    //opacity: 0.75,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    }
  });

  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  // setTimeout(function () {
  //   Toast.hide(toast);
  // }, toastOption.duration);

  toastInstance = toast;
  return toast;
}

export const showCarema = async (opt = {}) => {
  const options = {
    mediaType: 'photo',
    quality: 1,
    cameraType: 'back',
    saveToPhotos: true,
    presentationStyle: 'pageSheet'
  }
  const result = await launchCamera({ ...options, ...opt });
  console.log("launchCamera options,result::::", { ...options, ...opt }, result)
  return result;
}
export const showImageLibrary = async (opt = {}) => {
  const options = {
    mediaType: 'photo',
    quality: 1,
    saveToPhotos: true,
    presentationStyle: 'pageSheet'
  }
  const result = await launchImageLibrary({ ...options, ...opt });
  console.log("launchImageLibrary options,result::::", { ...options, ...opt }, result)
  return result;
}

export const showAlert = async () => {
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  )
}

