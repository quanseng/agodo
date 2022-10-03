import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTE_CHALLENGE_DETAIL, ROUTE_DASHBOARD, ROUTE_PERSONAL_PROGRAM, ROUTE_SUBSCRIPTIONS } from '../RouteNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default UserDashboardStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTE_DASHBOARD}>
      {/* <Stack.Screen
        name={ROUTE_DASHBOARD}
        component={DashboardScreen} 
        options={{
          headerShown: false
        }}
      /> */}
    </Stack.Navigator>
  );
};