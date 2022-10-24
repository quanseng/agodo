import { Config } from './Constants';

var url_sub_prefix = "";
export const urlGetAllStates = Config.SERVER_API_URL + url_sub_prefix + "/get-all-states";
export const urlCheckPhone = Config.SERVER_API_URL + url_sub_prefix + "/check-phone";
export const urlCheckSMSCode = Config.SERVER_API_URL + url_sub_prefix + "/confirm-sms";


export const urlLogin = Config.SERVER_API_URL + url_sub_prefix + "/token";