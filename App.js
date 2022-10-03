import 'react-native-gesture-handler';
import React from 'react';
import { LogBox, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './src/store';
import axios from "axios";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import RootStackNavigator from './src/routes/RootStackNavigator';
import Toast from 'react-native-toast-message'; // for notification message
import { RootSiblingParent } from 'react-native-root-siblings';
import "./IgnoreWarnings";
import SplashScreen from "react-native-splash-screen";
import { COLOR } from './src/utils/Constants';
import { console_log } from './src/utils/Misc';

////////////////////////////////////////////////////////////////////////////////
store.subscribe(listener);

function select(state) {
  //console_log("state:", state);
  const { token } = state.auth.user;

  if (token === undefined || token === "") return "";
  return token;
}

function listener() {
  let token = select(store.getState());
  //console_log("Authorization token:", token);
  axios.defaults.headers.common["Content-Type"] =
    "application/json; charset=UTF-8";
  if (token === "") {

    delete axios.defaults.headers.common["Authorization"];
  } else {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
}
//axios.defaults.baseURL = Config.SERVER_API_URL;
//////////////////////////////////////////////////////////////////////////////////////

const persistor = persistStore(store);

//////////////////////////////////////////////////////////////////////////////////////
//console_log("DefaultTheme.colors::::", DefaultTheme.colors)
const theme = {
  ...DefaultTheme,
  roundness: 3,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    // "backdrop": "rgba(50, 47, 55, 0.4)",
    // "background": "rgba(255, 251, 254, 1)",
    // "elevation": {
    //   "level0": "transparent",
    //   "level1": "rgb(247, 243, 249)",
    //   "level2": "rgb(243, 237, 246)",
    //   "level3": "rgb(238, 232, 244)",
    //   "level4": "rgb(236, 230, 243)",
    //   "level5": "rgb(233, 227, 241)"
    // },
    // "error": "rgba(179, 38, 30, 1)",
    // "errorContainer": "rgba(249, 222, 220, 1)",
    // "inverseOnSurface": "rgba(244, 239, 244, 1)",
    // "inversePrimary": "rgba(208, 188, 255, 1)",
    // "inverseSurface": "rgba(49, 48, 51, 1)",
    // "onBackground": "rgba(28, 27, 31, 1)",
    // "onError": "rgba(255, 255, 255, 1)",
    // "onErrorContainer": "rgba(65, 14, 11, 1)",
    // "onPrimary": "rgba(255, 255, 255, 1)",
    // "onPrimaryContainer": "rgba(33, 0, 93, 1)",
    // "onSecondary": "rgba(255, 255, 255, 1)",
    // "onSecondaryContainer": "rgba(29, 25, 43, 1)",
    // "onSurface": "rgba(28, 27, 31, 1)",
    // "onSurfaceDisabled": "rgba(28, 27, 31, 0.38)",
    // "onSurfaceVariant": "rgba(73, 69, 79, 1)",
    // "onTertiary": "rgba(255, 255, 255, 1)",
    // "onTertiaryContainer": "rgba(49, 17, 29, 1)",
    // "outline": "rgba(121, 116, 126, 1)",
    // "primary": "rgba(103, 80, 164, 1)",
    // "primaryContainer": "rgba(234, 221, 255, 1)",
    // "secondary": "rgba(98, 91, 113, 1)",
    // "secondaryContainer": "rgba(232, 222, 248, 1)",
    // "surface": "rgba(255, 251, 254, 1)",
    // "surfaceDisabled": "rgba(28, 27, 31, 0.12)",
    // "surfaceVariant": "rgba(231, 224, 236, 1)",
    // "tertiary": "rgba(125, 82, 96, 1)",
    // "tertiaryContainer": "rgba(255, 216, 228, 1)"

    primary: COLOR.APP,
    surface: "rgba(255, 251, 254, 1)",
    surfaceVariant: COLOR.BG_GRAY,
    onSurfaceVariant: COLOR.APP,
  },
};

const App = () => {
  //Hide Splash screen on app load.
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <RootSiblingParent>
            <StatusBar backgroundColor={"transparent"} translucent={true} barStyle="dark-content" />
            <RootStackNavigator />
            <Toast />
          </RootSiblingParent>
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}

export default App;