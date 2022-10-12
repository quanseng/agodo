import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTE_MAP } from '../RouteNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../../screens/user/MapScreen';

const Stack = createNativeStackNavigator();

export default UserHomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTE_MAP}>
      <Stack.Screen
        name={ROUTE_MAP}
        component={MapScreen} 
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};