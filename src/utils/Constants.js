import moment from 'moment';
import { Platform, Dimensions, StatusBar } from "react-native";
const { width, height } = Dimensions.get("window");

export const Config = {
  SERVER_API_URL: "http://192.168.0.72:8088",
  SERVER_SOCKET_URL: "http://localhost:8088",
  TERMS_AND_CONDITION_URL:
    "https://www.fluidformpilates.com/terms/",
  PRIVACY_POLICY_URL:
    "https://www.fluidformpilates.com/terms/"
}

export const COLOR = {
  APP: "#0090FF", //main app color
  WHITE: "#ffffff",
  BLACK: "#000000",
  DARK: "#000000",
  RED: "#FF0000",
  GRAY: "#E5E5E5",
  FONT_DARK: "#565656",
  FONT_LIGHT_DARK: "rgba(0, 0, 0, 0.5)",
  FONT_GRAY: "#9F9F9F",
  FONT_LIGHT_GRAY: "rgba(64, 64, 64, 0.5)", // "#404040" 50% opacity,
  FONT_WARNING: "rgba(255, 165, 0, 0.92)",
  SELECTION: "rgba(0, 144, 255, 0.5)",
  BG_GRAY: "#F6F7FB",
  BG_SEMI_DARK: "rgba(0, 0, 0, 0.55)",
  BG_DARK_MASK: "rgba(0, 0, 0, 0.35)",
  TRANSPARENT: "transparent",
};

export const SIZE = {
  APP_PADDING: 15,
  APP_BODY_PADDING: 25,
  APP_ICON_SIZE: 22,
  BUTTON_RADIUS: 4,
  BUTTON_MIN_SIZE: 140,
}
export const IMAGE_RATIO_16X9 = 0.5625	//FOR 16:9
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const USER_TYPE = {
  USER: 'user',
  EV: 'ev'
}
export const PAYMENT_METHOD = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  GOOGLE_PAY: 'google_pay'
}
export const SEARCH_TYPE = {
  AT_MY_LOCATION: 'my_location',
  ON_MY_ROUTE: 'my_route',
  AT_MY_DESTINATION: 'my_destination'
}
export const DEFAULT_LOCATION = {
  LATITUDE: 18.0112991,
  LONGITUDE: 102.6297989,
  RADIUS: 0.05
}

export const GOOGLE_MAP_API_KEY = "AIzaSyCn1yAZPLMnOpjCb8zCd6ZVCiW-_bZCstA"

