import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTE_AT_MY_DESTINATION, ROUTE_AT_MY_LOCATION, ROUTE_CHARGE_DETAIL, ROUTE_CHARGING, ROUTE_MAP, ROUTE_ON_MY_ROUTE } from '../RouteNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../../screens/user/MapScreen';
import { TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import ChargingScreen from '../../screens/user/ChargingScreen';
import ChargeDetailScreen from '../../screens/user/ChargeDetailScreen';
import LocationEnableScreen from '../../screens/user/LocationEnableScreen';
import AtMyLocationScreen from '../../screens/user/SearchRouteScreen/AtMyLocationScreen';
import OnMyRouteScreen from '../../screens/user/SearchRouteScreen/OnMyRouteScreen';
import AtMyDestinationScreen from '../../screens/user/SearchRouteScreen/AtMyDestinationScreen';

const Stack = createNativeStackNavigator();

export default UserHomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_MAP}
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
            <Image resizeMode="contain" style={styles.drawerHeaderLogo} source={require('../../assets/images/logo_text.png')} alt="logo" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name={ROUTE_MAP}
        component={MapScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={ROUTE_AT_MY_LOCATION}
        component={AtMyLocationScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={ROUTE_ON_MY_ROUTE}
        component={OnMyRouteScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={ROUTE_AT_MY_DESTINATION}
        component={AtMyDestinationScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name={ROUTE_CHARGING}
        component={ChargingScreen}
        options={{
          headerShown: false
        }}
      />


    </Stack.Navigator>
  );
};