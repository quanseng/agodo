import axios from 'axios';
import { urlCheckPhone, urlCheckSMSCode, urlGetAllStates } from './API_URL';
import { console_log } from './Misc';

export const API_PAGE_SIZE = 24;

//axios.defaults.baseURL = Config.SERVER_API_URL;

export const apiResponseIsSuccess = (response) => {
  const { status } = response;
  console_log("data.status::::", status)
  if(status) {
    if(status === '1') {
      return true;
    }else{
      return false
    }
  }
  return false
}
export const apiLoginRequired = (response) => {
  const { login_required } = response;
  if(login_required) {
    if(login_required === '1') {
      return true;
    }else{
      return false
    }
  }
  return false
}

//////////////////////////////////////////////////////////////starting apis//////////////////////////////////////////////////////////////////
export const apiGetAllStates = async (payload=null) => {
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
export const apiCheckPhone = async (payload=null) => {
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
export const apiCheckSMSCode = async (payload=null) => {
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

