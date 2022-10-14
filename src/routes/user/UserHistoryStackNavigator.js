import React from 'react';
import { ROUTE_CHARGE_DETAIL, ROUTE_CHARGE_HISTORY } from '../RouteNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChargeDetailScreen from '../../screens/user/ChargeDetailScreen';
import ChargeHistoryScreen from '../../screens/user/ChargeHistoryScreen';

const Stack = createNativeStackNavigator();

export default UserHistoryStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_CHARGE_HISTORY}  
    >
      <Stack.Screen
        name={ROUTE_CHARGE_HISTORY}
        component={ChargeHistoryScreen}
        options={{
          headerShown: false
        }}
      />
       <Stack.Screen
        name={ROUTE_CHARGE_DETAIL}
        component={ChargeDetailScreen}
        options={{
          headerShown: false
        }}
      />

    </Stack.Navigator>
  );
}