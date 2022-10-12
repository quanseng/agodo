import React from 'react';
import { ROUTE_WORKOUTS } from '../RouteNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default UserHistoryStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_WORKOUTS} //ROUTE_WORKOUTS,ROUTE_WORKOUT_DETAIL
    >
      {/* <Stack.Screen
        name={ROUTE_WORKOUTS}
        component={WorkoutListScreen}
        options={{
          headerShown: false
        }}
      /> */}
     
    </Stack.Navigator>
  );
}