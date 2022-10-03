import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTE_MY_FAVORITES, ROUTE_MY_FAVORITE_CHALLENGE_DETAIL, ROUTE_MY_FAVORITE_NUTRITION_DETAIL, ROUTE_MY_FAVORITE_RECIPE_DETAIL, ROUTE_MY_FAVORITE_WORKOUT_DETAIL, ROUTE_NUTRITION_CHALLENGES, ROUTE_NUTRITION_CHALLENGE_DETAIL, ROUTE_SAVED_VIDEOS } from '../RouteNames';

const Stack = createNativeStackNavigator();
//const Stack = createStackNavigator();

export default UserHiddenStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_MY_FAVORITES}
    >
      {/* <Stack.Screen
        name={ROUTE_MY_FAVORITE_NUTRITION_DETAIL}
        component={NutritionChallengeDetailScreen}
        options={{
          headerShown: false
        }}
      /> */}
    </Stack.Navigator>
  );
};