import React, { useEffect } from 'react';
import { LogBox, StatusBar, Image, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_AUTH_STACK_NAVIGATOR, ROUTE_DRAWER_STACK_NAVIGATOR, ROUTE_INTRODUCTION } from '../../routes/RouteNames';

import styles from './styles';
import BaseStyle from '../../styles/BaseStyle';
import { console_log } from '../../utils/Misc';
import { SafeAreaView } from 'react-navigation';

const SplashScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  useEffect(() => {
  }, []);

  return (
    <SafeAreaView style={BaseStyle.screenContainer}>
      <View pb="16" style={styles.splashBox}>
        <Text>Splash screen</Text>
        <Image resizeMode={"contain"} source={require('../../assets/images/logo_text.png')} alt="Logo" style={BaseStyle.imgResponsive} />
      </View>
    </SafeAreaView>
  )
}

export default SplashScreen;

