import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import DrawerStackNavigator from './DrawerNavigator';

import { ROUTE_AUTH_STACK_NAVIGATOR, ROUTE_DRAWER_STACK_NAVIGATOR, ROUTE_INTRODUCTION, ROUTE_PHONE_VERIFY, ROUTE_EV_REG_PERSONAL, ROUTE_EV_REG_VEHICLE, ROUTE_SIGNUP, ROUTE_SIGNUP_TYPE, ROUTE_SPLASH, ROUTE_TEST, ROUTE_TEST1, ROUTE_EV_REG_ID, ROUTE_EV_REG_CHARGER, ROUTE_EV_REG_CREDIT_CARD, ROUTE_RG_REG_PAYMENT, ROUTE_TERMS_CONDITION, ROUTE_WELCOME, ROUTE_HOME, ROUTE_USER_TAB_NAVIGATOR, ROUTE_LOCATION_ENABLE, ROUTE_RG_REG_PERSONAL, ROUTE_RG_REG_ID, ROUTE_RG_REG_VEHICLE } from './RouteNames';
import SplashScreen from '../screens/SplashScreen';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import TestScreen from '../screens/TestScreen';
import Test1Screen from '../screens/TestScreen/Test1';

import IntroductionScreen from '../screens/IntroductionScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import PhoneVerifyScreen from '../screens/auth/PhoneVerifyScreen';
import SignupTypeScreen from '../screens/auth/SignupTypeScreen';
import EvRegPersonalScreen from '../screens/auth/EvRegPersonalScreen';
import EvRegVehicleScreen from '../screens/auth/EvRegVehicleScreen';
import EvRegIdScreen from '../screens/auth/EvRegIdScreen';
import EvRegChargerScreen from '../screens/auth/EvRegChargerScreen';
import EvRegCreditCardScreen from '../screens/auth/EvRegCreditCardScreen';
import RgRegPaymentScreen from '../screens/auth/RgRegPaymentScreen';
import TermsConditionScreen from '../screens/auth/TermsConditionScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import HomeScreen from '../screens/user/HomeScreen';
import UserTabNavigator from './user/UserTabNavigator';
import LocationEnableScreen from '../screens/user/LocationEnableScreen';
import RgRegPersonalScreen from '../screens/auth/RgRegPersonalScreen';
import RgRegIdScreen from '../screens/auth/RgRegIdScreen';
import RgRegVehicleScreen from '../screens/auth/RgRegVehicleScreen';

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
        initialRouteName={ROUTE_INTRODUCTION} //ROUTE_TEST, ROUTE_TEST1, ROUTE_USER_TAB_NAVIGATOR, ROUTE_INTRODUCTION
        screenOptions={{
          presentation: "card", //modal, card, transparentModal
          headerMode: "screen",
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
          name={ROUTE_TEST}
          component={TestScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_TEST1}
          component={Test1Screen}
          options={{
            headerShown: false
          }}
        />

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
          name={ROUTE_RG_REG_PERSONAL}
          component={RgRegPersonalScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_RG_REG_ID}
          component={RgRegIdScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_RG_REG_VEHICLE}
          component={RgRegVehicleScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_RG_REG_PAYMENT}
          component={RgRegPaymentScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name={ROUTE_EV_REG_PERSONAL}
          component={EvRegPersonalScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_EV_REG_ID}
          component={EvRegIdScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_EV_REG_CHARGER}
          component={EvRegChargerScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_EV_REG_CREDIT_CARD}
          component={EvRegCreditCardScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_EV_REG_VEHICLE}
          component={EvRegVehicleScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name={ROUTE_TERMS_CONDITION}
          component={TermsConditionScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_WELCOME}
          component={WelcomeScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name={ROUTE_LOCATION_ENABLE}
          component={LocationEnableScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={ROUTE_HOME}
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        
        <Stack.Screen
          name={ROUTE_USER_TAB_NAVIGATOR}
          component={UserTabNavigator}
          options={{
            headerShown: false,
            title: "Dashboard"
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStackNavigator