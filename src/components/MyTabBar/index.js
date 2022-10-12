import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

import styles from './styles';

import { ROUTE_HISTORY_TAB, ROUTE_HOME_TAB, ROUTE_NOTIFICATION_TAB, ROUTE_SETTING_TAB } from '../../routes/RouteNames';

export default MyTabBar = (props) => {

  const { state, navigation } = props;
  const getTabTitle = (tabRouteName) => {
    let tabTitle = ""
    if (tabRouteName === ROUTE_HOME_TAB) {
      tabTitle = "Home";
    } else if (tabRouteName === ROUTE_NOTIFICATION_TAB) {
      tabTitle = "Notification";
    } else if (tabRouteName === ROUTE_HISTORY_TAB) {
      tabTitle = "History";
    } else if (tabRouteName === ROUTE_SETTING_TAB) {
      tabTitle = "Setting";
    }
    return tabTitle
  }
  const getTabIconUri = (tabRouteName, isFocused) => {
    let tabIconUri = ""
    if (tabRouteName === ROUTE_HOME_TAB) {
      tabIconUri = isFocused ? require("../../assets/images/tab_icon/tab_icon_home_active.png") : require("../../assets/images/tab_icon/tab_icon_home.png")
    } else if (tabRouteName === ROUTE_NOTIFICATION_TAB) {
      tabIconUri = isFocused ? require("../../assets/images/tab_icon/tab_icon_notification_active.png") : require("../../assets/images/tab_icon/tab_icon_notification.png")
    } else if (tabRouteName === ROUTE_HISTORY_TAB) {
      tabIconUri = isFocused ? require("../../assets/images/tab_icon/tab_icon_history_active.png") : require("../../assets/images/tab_icon/tab_icon_history.png")
    } else if (tabRouteName === ROUTE_SETTING_TAB) {
      tabIconUri =isFocused ? require("../../assets/images/tab_icon/tab_icon_setting_active.png") : require("../../assets/images/tab_icon/tab_icon_setting.png")
    }
    return tabIconUri
  }
  
  const onPressTab = (route, index) => {
    const isFocused = state.index === index;
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
    });

    if (!isFocused && !event.defaultPrevented) {
      //navigateTabNav(route.name, navigation);
      navigation.navigate(route.name);
    }
    //navigateTabNav(route.name, navigation);
    //navigation.navigate(route.name);
  }
  return (
    <View style={styles.tabContainer}>
      {
        state.routes.map((route, index) => {
          if (index < 4) {
            const isFocused = state.index === index;
            return (
              <TouchableOpacity
                style={[styles.tabItem]}
                key={index}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                onPress={() => onPressTab(route, index)}
              >
                <Image resizeMode="contain" style={styles.tabIconImage} source={getTabIconUri(route.name, isFocused)} alt="tabIcon" />
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )
}