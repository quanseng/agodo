import React from 'react';

import { ROUTE_RECIPES } from '../RouteNames';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
//const Stack = createStackNavigator();

export default UserRecipesStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_RECIPES}
    >
      {/* <Stack.Screen
        name={ROUTE_RECIPES}
        component={RecipeListScreen}
        options={{
          headerShown: false
        }}
      /> */}
     
    </Stack.Navigator>
  );
};