import React from 'react';
import { ROUTE_CHALLENGES } from '../RouteNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default UserNotificationStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_CHALLENGES}
    >
      {/* <Stack.Screen
        name={ROUTE_CHALLENGES}
        component={ChallengeListScreen}
        options={{
          headerShown: false
        }}
      /> */}
      
    </Stack.Navigator>
  );
};