import React from 'react';

import { ROUTE_PROFILE } from '../RouteNames';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/user/ProfileScreen';

const Stack = createNativeStackNavigator();
//const Stack = createStackNavigator();

export default UserSettingStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_PROFILE}
    >
      <Stack.Screen
        name={ROUTE_PROFILE}
        component={ProfileScreen}
        options={{
          headerShown: false
        }}
      />

    </Stack.Navigator>
  );
};