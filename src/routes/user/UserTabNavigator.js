import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyTabBar from '../../components/MyTabBar';
import UserDashboardStackNavigator from './UserDashboardStackNavigator';
import UserWorkoutsStackNavigator from './UserWorkoutsStackNavigator';
import UserChallengesStackNavigator from './UserChallengesStackNavigator';
import UserRecipesStackNavigator from './UserRecipesStackNavigator';

import { ROUTE_CHALLENGES_TAB, ROUTE_DASHBOARD_TAB, ROUTE_HIDDEN_TAB, ROUTE_RECIPES_TAB, ROUTE_WORKOUTS_TAB } from '../RouteNames';
import { useSelector } from 'react-redux';
// import UserHiddenStackNavigator from './UserHiddenStackNavigator';

const BottomTab = createBottomTabNavigator();

export default UserTabNavigator = () => {

  return (
    <BottomTab.Navigator
      initialRouteName={ROUTE_DASHBOARD_TAB}
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={
        {
          lazy: true,
        }        
      }
    >
      <BottomTab.Screen name={ROUTE_DASHBOARD_TAB} component={UserDashboardStackNavigator} options={{ headerShown: false }} />
      <BottomTab.Screen name={ROUTE_WORKOUTS_TAB} component={UserWorkoutsStackNavigator} options={{ headerShown: false }} />
      <BottomTab.Screen name={ROUTE_CHALLENGES_TAB} component={UserChallengesStackNavigator} options={{ headerShown: false }} />
      <BottomTab.Screen name={ROUTE_RECIPES_TAB} component={UserRecipesStackNavigator} options={{ headerShown: false }} />

      {/* <FluidTab.Screen name={ROUTE_HIDDEN_TAB} component={ UserHiddenStackNavigator} options={{ headerShown: false }} /> */}

    </BottomTab.Navigator>
  )
}