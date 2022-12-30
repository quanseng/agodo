import { Config } from './Constants';

var url_sub_prefix = "";
export const urlGetAllStates = Config.SERVER_API_URL + url_sub_prefix + "/get-all-states";
export const urlCheckPhone = Config.SERVER_API_URL + url_sub_prefix + "/check-phone";
export const urlCheckSMSCode = Config.SERVER_API_URL + url_sub_prefix + "/confirm-sms";
export const urlRegister = Config.SERVER_API_URL + url_sub_prefix + "/register";
export const urlLogin = Config.SERVER_API_URL + url_sub_prefix + "/token";

url_sub_prefix = "/user"
export const urlUpdateLocation = Config.SERVER_API_URL + url_sub_prefix + "/update-location";
export const urlUpdateLocationFree = Config.SERVER_API_URL + url_sub_prefix + "/update-location-free";
export const urlUserGetProfile = Config.SERVER_API_URL + url_sub_prefix + "/get-profile";
export const urlUserUpdateProfile = Config.SERVER_API_URL + url_sub_prefix + "/update-profile";
export const urlUserGetMapData = Config.SERVER_API_URL + url_sub_prefix + "/get-map-data";
export const urlUserSearchEvList = Config.SERVER_API_URL + url_sub_prefix + "/search-ev-list";

export const urlUserAcceptEv = Config.SERVER_API_URL + url_sub_prefix + "/accept-ev";


