import React from 'react';
import { ROUTE_NOTIFICATION } from '../RouteNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from '../../screens/user/NotificationScreen';

const Stack = createNativeStackNavigator();

export default UserNotificationStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_NOTIFICATION}
    >
      <Stack.Screen
        name={ROUTE_NOTIFICATION}
        component={NotificationScreen}
        options={{
          headerShown: false
        }}
      />

    </Stack.Navigator>
  );
};