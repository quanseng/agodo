import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import DrawerStackNavigator from './DrawerNavigator';

import { ROUTE_AUTH_STACK_NAVIGATOR, ROUTE_DRAWER_STACK_NAVIGATOR, ROUTE_INTRODUCTION, ROUTE_PHONE_VERIFY, ROUTE_REG_PERSONAL_EV, ROUTE_SIGNUP, ROUTE_SIGNUP_TYPE, ROUTE_SPLASH } from './RouteNames';
import SplashScreen from '../screens/SplashScreen';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import IntroductionScreen from '../screens/IntroductionScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import PhoneVerifyScreen from '../screens/auth/PhoneVerifyScreen';
import SignupTypeScreen from '../screens/auth/SignupTypeScreen';
import RegPersonalEvScreen from '../screens/auth/RegPersonalEvScreen';

const WhiteTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const Stack = createStackNavigator();

const RootStackNavigator = () => {
  const signed = useSelector(state => state.auth.signed);
  return (
    <NavigationContainer theme={WhiteTheme}>
      <Stack.Navigator
        initialRouteName={ROUTE_INTRODUCTION} //ROUTE_SPLASH, ROUTE_DRAWER_STACK_NAVIGATOR
        screenOptions={{
          presentation: "card", //modal, card, transparentModal

          headerStyle: {
            backgroundColor: 'rgba(255,255,255,1)',
            // elevation: 0, // remove shadow on Android
            // shadowOpacity: 0, // remove shadow on iOS
            borderBottomWidth: 1 // Just in case.    
          },
          headerTintColor: 'black',
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity style={styles.drawerHeaderLeft}>
              <Image resizeMode="contain" style={styles.drawerHeaderLogo} source={require('../assets/images/logo_text.png')} alt="logo" />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name={ROUTE_INTRODUCTION}
          component={IntroductionScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_SIGNUP}
          component={SignUpScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_PHONE_VERIFY}
          component={PhoneVerifyScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_SIGNUP_TYPE}
          component={SignupTypeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_REG_PERSONAL_EV}
          component={RegPersonalEvScreen}
          options={{
            headerShown: false
          }}
        />







        <Stack.Screen
          name={ROUTE_DRAWER_STACK_NAVIGATOR}
          component={DrawerStackNavigator}
          options={{
            headerShown: false,
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStackNavigator