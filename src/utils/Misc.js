import { Dimensions } from 'react-native';
import { Platform } from 'react-native'
import { isTablet } from 'react-native-device-info';
import Notification from 'react-native-toast-message';
import Toast from 'react-native-root-toast';

export const console_log = (...log_data) => {
  //return false;
  console.log(...log_data)
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

export const is_null = (value) => {
  if (value === undefined || value === null) {
    return true
  }
  return false;
};
export const empty = (value) => {
  if (value === undefined || value === null || value === "" || value === false) { //empty field
    return true
  }
  return false;
};
export const get_data_value = (data, field, default_value) => {
  if (empty(default_value)) {
    default_value = "";
  }
  if (empty(data)) {
    return default_value;
  }
  if (is_null(data[field])) {
    return default_value;
  } else {
    return data[field];
  }
};
export const removeItemFromArray = (arr, val) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr
};
export const addItemToArray = (arr, val) => {
  if (!arr.includes(val)) {
    arr = [...arr, val]
  }
  return arr
};
export const addIndexItemToArray = (arr, val, index) => {
  for (let i = 0; i <= index; i++) {
    if (arr[i] === undefined) {
      arr[i] = null;
    }
  }
  arr[index] = val
  return arr
};

export const isEmpty = (list, field, errorList) => {
  var newErrorList = []
  if (list[field] === undefined || list[field] === null || list[field] === "") { //empty field
    newErrorList = addItemToArray(errorList, field)
  } else { //field is valie
    newErrorList = removeItemFromArray(errorList, field)
  }
  return newErrorList;
};
export const validateEmail = (email) => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  if (!pattern.test(email)) {
    return false;
  } else {
    return true;
  }
};
export const validatePhone = (str) => {
  var isphone =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(str);
  return isphone;
};
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

  if(toastOption.message === ""){
    return false;
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

  return toast;
}
export const joinMultiAssocArrayValue = (item_list, key_name = "name", spliter = ", ") => {
  let arr = []
  if (item_list && item_list.length > 0) {
    for (let i = 0; i < item_list.length; i++) {
      arr.push(item_list[i][key_name])
    }
  }
  const str = arr.join(spliter)
  return str;
}
export const joinMultiAssocObjectValue = (item_list, key_name = "title", spliter = ", ") => {
  let arr = []
  if (!empty(item_list)) {
    for (let k in item_list) {
      const item = item_list[k]
      arr.push(item[key_name])
    }
  }
  const str = arr.join(spliter)
  return str;
}
export const equalTwoOjects = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
export const get_utc_timestamp = () => {
  let a = 0;
  let timestamp = new Date().getTime();
  a = Math.floor(timestamp / 1000); //a = Math.floor(Date.now() / 1000);
  return a;
};
export const get_utc_timestamp_ms = () => {
  let timestamp = new Date().getTime();
  return timestamp
};
export const generateFileNameFromUrl = (fileUrl) => {
  const fileNameLength = 150
  let fileName = fileUrl.replace(/\//g, '-');
  fileName = fileName.replace(/:/g, '');
  if (fileName.length > fileNameLength) {
    fileName = fileName.slice(fileName.length - fileNameLength)
  }
  return fileName
};

