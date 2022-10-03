
import { Platform } from 'react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';

export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';
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
export const setAppAuthStatusBarStyle = (statusbar) => {
  statusbar.setBarStyle('dark-content');
  statusbar.setBackgroundColor('rgba(255,255,255,1)');
  statusbar.setTranslucent(true);
}
export const setAppMainStatusBarStyle = (statusbar) => {
  statusbar.setBarStyle('dark-content');
  statusbar.setBackgroundColor('rgba(255,255,255,0)');
  statusbar.setTranslucent(true);
}


