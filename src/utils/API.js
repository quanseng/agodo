import axios from 'axios';
import { Platform } from 'react-native';
import { urlCheckPhone, urlCheckSMSCode, urlGetAllStates, urlRegister, urlUserGetMapData, urlUserGetProfile, urlUserSearchEvList, urlUserUpdateProfile } from './API_URL';
import { console_log } from './Misc';

export const MULTIPART_HEADER = {
  headers: {
    "Content-Type": "multipart/form-data",
  }
}

export const API_PAGE_SIZE = 24;

//axios.defaults.baseURL = Config.SERVER_API_URL;

export const apiResponseIsSuccess = (response) => {
  const { status } = response;
  console_log("data.status::::", status)
  if (status) {
    if (status === '1') {
      return true;
    } else {
      return false
    }
  }
  return false
}
export const apiLoginRequired = (response) => {
  const { login_required } = response;
  if (login_required) {
    if (login_required === '1') {
      return true;
    } else {
      return false
    }
  }
  return false
}

//////////////////////////////////////////////////////////////starting apis//////////////////////////////////////////////////////////////////
export const apiGetAllStates = async (payload = null) => {
  //console_log("urlGetAllStates::", urlGetAllStates)
  try {
    const res = await axios.get(urlGetAllStates);
    //console_log("urlGetAllStates res:::", res)
    return res.data;
  } catch (error) {
    //console_log("login error:::", error)
    if (error.response) {
      //console_log("error.response:::", error.response);
      //console_log("error.response.data:::", error.response.data);
      //console_log("error.response.status:::", error.response.status);
      //console_log("error.message:::", error.message);
      return error.response.data
    }
    return error;
  }
}
export const apiCheckPhone = async (payload = null) => {
  try {
    const res = await axios.post(urlCheckPhone, payload);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
    return error;
  }
}
export const apiCheckSMSCode = async (payload = null) => {
  try {
    const res = await axios.post(urlCheckSMSCode, payload);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
    return error;
  }
}

export const apiRegisterUser = async (payload = null) => {
  try {
    if (payload['personalData']) {
      payload['personalData'] = JSON.stringify(payload['personalData'])
    }
    if (payload['evSourceData']) {
      payload['evSourceData'] = JSON.stringify(payload['evSourceData'])
    }
    if (payload['paymentMethodData']) {
      payload['paymentMethodData'] = JSON.stringify(payload['paymentMethodData'])
    }
    if (payload['vehicleData']) {
      payload['vehicleData'] = JSON.stringify(payload['vehicleData'])
    }
    const formData = new FormData();
    for (let k in payload) {
      if (k !== "front" && k !== "back") {
        formData.append(k, payload[k])
      }
    }
    if (payload['front']) {
      let selectedImage = payload['front']
      formData.append('id_front', {
        name: selectedImage.fileName,
        type: selectedImage.type,
        uri: Platform.OS === 'android' ? selectedImage.uri : selectedImage.uri.replace('file://', ''),
      });
    }

    if (payload['back']) {
      let selectedImage = payload['back']
      formData.append('id_back', {
        name: selectedImage.fileName,
        type: selectedImage.type,
        uri: Platform.OS === 'android' ? selectedImage.uri : selectedImage.uri.replace('file://', ''),
      });
    }

    const res = await axios.post(urlRegister, formData, MULTIPART_HEADER);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
    return error;
  }
}

export const apiUserGetProfile = async (payload = null) => {
  try {
    const res = await axios.get(urlUserGetProfile);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
    return error;
  }
}

export const apiUserUpdateProfile = async (payload = null) => {
  try {
    const formData = new FormData();
    for (let k in payload) {
      if (k !== "avatar") {
        formData.append(k, payload[k])
      }
    }
    if (payload['avatar']) {
      let selectedImage = payload['avatar']
      formData.append('avatar', {
        name: selectedImage.fileName,
        type: selectedImage.type,
        uri: Platform.OS === 'android' ? selectedImage.uri : selectedImage.uri.replace('file://', ''),
      });
    }
    const res = await axios.post(urlUserUpdateProfile, formData, MULTIPART_HEADER);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
    return error;
  }
}

export const apiUserGetMapData = async (payload = null) => {
  try {
    const res = await axios.get(urlUserGetMapData);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
    return error;
  }
}

export const apiUserSearchEvList = async (payload = null) => {
  try {
    const formData = new FormData();
    formData.append('start_point', payload['start_point'])
    formData.append('end_point', payload['end_point'])
    formData.append('start_latitude', payload['start_point_details']['geometry']['location']['lat'])
    formData.append('end_longitude', payload['end_point_details']['geometry']['location']['lng'])    
    const res = await axios.post(urlUserSearchEvList, formData, MULTIPART_HEADER);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
    return error;
  }
}