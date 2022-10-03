import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTE_INTRODUCTION } from './RouteNames';
import IntroductionScreen from '../screens/IntroductionScreen';
const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTE_INTRODUCTION}>
      <Stack.Screen
        name={ROUTE_INTRODUCTION}
        component={IntroductionScreen}
        options={{
          headerShown: false
        }}
      />
      {/* <Stack.Screen
        name={ROUTE_SIGNIN}
        component={SignInScreen}
        options={{
          // animationEnabled: false,
          headerShown: false
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;