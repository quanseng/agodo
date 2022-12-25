import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyTabBar from '../../components/MyTabBar';

import { ROUTE_HOME_TAB, ROUTE_NOTIFICATION_TAB, ROUTE_HISTORY_TAB, ROUTE_SETTING_TAB, ROUTE_SIGNUP } from '../RouteNames';
import UserHomeStackNavigator from './UserHomeStackNavigator';
import UserNotificationStackNavigator from './UserNotificationStackNavigator';
import UserHistoryStackNavigator from './UserHistoryStackNavigator';
import UserSettingStackNavigator from './UserSettingStackNavigator';
import { useSelector } from 'react-redux';
import { console_log } from '../../utils/Misc';
import { useEffect } from 'react';
import { navReset, navResetLogin } from '../../utils/Nav';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { setDarkStatusBarStyle } from '../../utils/Utils';
// import UserHiddenStackNavigator from './UserHiddenStackNavigator';

const BottomTab = createBottomTabNavigator();

export default UserTabNavigator = () => {
  const navigation = useNavigation()
  const { signed, user } = useSelector(state => state.auth);
  console_log("UserTabNavigator signed, user:::", signed, user)
  useEffect(() => {
    if (signed && user['token']) {
      // continue
    } else {
      navResetLogin(navigation)
    }
  }, [signed, user])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setDarkStatusBarStyle(StatusBar)
  //   }, [])
  // )
  useEffect(
    () => {
      setDarkStatusBarStyle(StatusBar)
    }, [])

  return (
    <BottomTab.Navigator
      initialRouteName={ROUTE_HOME_TAB}
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={
        {
          lazy: true,
        }
      }
    >
      <BottomTab.Screen name={ROUTE_HOME_TAB} component={UserHomeStackNavigator} options={{ headerShown: false }} />
      <BottomTab.Screen name={ROUTE_NOTIFICATION_TAB} component={UserNotificationStackNavigator} options={{ headerShown: false }} />
      <BottomTab.Screen name={ROUTE_HISTORY_TAB} component={UserHistoryStackNavigator} options={{ headerShown: false }} />
      <BottomTab.Screen name={ROUTE_SETTING_TAB} component={UserSettingStackNavigator} options={{ headerShown: false }} />

    </BottomTab.Navigator>
  )
}