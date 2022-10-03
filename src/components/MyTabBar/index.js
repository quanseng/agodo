import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

import styles from './styles';

import { ROUTE_CHALLENGES, ROUTE_CHALLENGES_TAB, ROUTE_DASHBOARD, ROUTE_DASHBOARD_TAB, ROUTE_DRAWER_STACK_NAVIGATOR, ROUTE_RECIPES, ROUTE_RECIPES_TAB, ROUTE_USER_TAB_NAVIGATOR, ROUTE_WORKOUTS, ROUTE_WORKOUTS_TAB } from '../../routes/RouteNames';
import { navNavigate, navPush } from '../../utils/Nav';

export default MyTabBar = (props) => {

  const { state, navigation } = props;
  const getTabTitle = (tabRouteName) => {
    let tabTitle = ""
    if (tabRouteName === ROUTE_DASHBOARD_TAB) {
      tabTitle = "Home";
    } else if (tabRouteName === ROUTE_WORKOUTS_TAB) {
      tabTitle = "Notification";
    } else if (tabRouteName === ROUTE_CHALLENGES_TAB) {
      tabTitle = "History";
    } else if (tabRouteName === ROUTE_RECIPES_TAB) {
      tabTitle = "Setting";
    }
    return tabTitle
  }
  const getTabIconUri = (tabRouteName, isFocused) => {
    let tabIconUri = ""
    if (tabRouteName === ROUTE_DASHBOARD_TAB) {
      tabIconUri = isFocused ? require("../../assets/images/tab_icon/tab_icon_home_active.png") : require("../../assets/images/tab_icon/tab_icon_home.png")
    } else if (tabRouteName === ROUTE_WORKOUTS_TAB) {
      tabIconUri = isFocused ? require("../../assets/images/tab_icon/tab_icon_notification_active.png") : require("../../assets/images/tab_icon/tab_icon_notification.png")
    } else if (tabRouteName === ROUTE_CHALLENGES_TAB) {
      tabIconUri = isFocused ? require("../../assets/images/tab_icon/tab_icon_history_active.png") : require("../../assets/images/tab_icon/tab_icon_history.png")
    } else if (tabRouteName === ROUTE_RECIPES_TAB) {
      tabIconUri =isFocused ? require("../../assets/images/tab_icon/tab_icon_setting_active.png") : require("../../assets/images/tab_icon/tab_icon_setting.png")
    }
    return tabIconUri
  }
  const navigateTabNav = (tabRouteName, navigation) => {
    let routeArr = []
    if (tabRouteName === ROUTE_DASHBOARD_TAB) {
      routeArr = [ROUTE_DRAWER_STACK_NAVIGATOR, ROUTE_USER_TAB_NAVIGATOR, ROUTE_DASHBOARD_TAB, ROUTE_DASHBOARD]
    } else if (tabRouteName === ROUTE_WORKOUTS_TAB) {
      routeArr = [ROUTE_DRAWER_STACK_NAVIGATOR, ROUTE_USER_TAB_NAVIGATOR, ROUTE_WORKOUTS_TAB, ROUTE_WORKOUTS]
    } else if (tabRouteName === ROUTE_CHALLENGES_TAB) {
      routeArr = [ROUTE_DRAWER_STACK_NAVIGATOR, ROUTE_USER_TAB_NAVIGATOR, ROUTE_CHALLENGES_TAB, ROUTE_CHALLENGES]
    } else if (tabRouteName === ROUTE_RECIPES_TAB) {
      routeArr = [ROUTE_DRAWER_STACK_NAVIGATOR, ROUTE_USER_TAB_NAVIGATOR, ROUTE_RECIPES_TAB, ROUTE_RECIPES]
    }
    navNavigate(routeArr, {}, navigation)
    return routeArr
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
                <Text style={styles.tabItemText}>{getTabTitle(route.name)}</Text>
                <View style={[styles.tabItemOverlay, isFocused ? styles.selected : '']}></View>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )
}