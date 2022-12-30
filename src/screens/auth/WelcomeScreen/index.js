import React, { useRef } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { ImageBackground, Image, StatusBar, View, Text } from 'react-native';

import styles from './styles';
import { ROUTE_HOME, ROUTE_LOCATION_ENABLE, ROUTE_SIGNUP } from '../../../routes/RouteNames';
import { useFocusEffect } from '@react-navigation/native';
import { console_log, get_utc_timestamp_ms } from '../../../utils/Misc';
import { useState } from 'react';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import MyButton from '../../../components/MyButton';
import { setLightStatusBarStyle } from '../../../utils/Utils';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { navReset, navResetLogin } from '../../../utils/Nav';

const WelcomeScreen = (props) => {
  const { navigation } = props;

  const { signed, user } = useSelector(state => state.auth);
  const { location_enabled } = useSelector(state => state.settings);
  console_log("WelcomeScreen signed, user:::", signed, user)

  useFocusEffect(
    React.useCallback(() => {
      setLightStatusBarStyle(StatusBar)
    }, [])
  );

  useEffect(() => {
    if (signed && user['token']) {
      // continue
    } else {
      navResetLogin(navigation)
    }
  }, [signed, user])

  const onPressNext = () => {
    console_log("onPressNext::::")
    let routeArr = [ROUTE_LOCATION_ENABLE]
    if(location_enabled){
      routeArr = [ROUTE_HOME]
    }
    navReset(routeArr, {}, navigation)
  }

  return (
    <ImageBackground style={[CustomStyle.screenContainer]} source={require('../../../assets/images/data/welcome_bg.png')}>
      {/* <View style={[styles.avatarOverlayer]}>
        <Image source={require('../../../assets/images/data/avatar.png')} style={[CustomStyle.avatar]} alt="avatar" resizeMode="contain" />
      </View> */}
      <View style={[styles.welcomeScreen]}>
        <View style={[BaseStyle.flex, BaseStyle.col12]}>
          <View style={[CustomStyle.logoWrapper]}>
            <Image source={require('../../../assets/images/logo_text_white.png')} style={[CustomStyle.logo]} alt="logo" resizeMode="contain" />
          </View>
          <View style={[styles.welcomeTextWrapper]}>
            <Text style={[styles.welcomeText, BaseStyle.textWhite]}>
              welcome{"\n"}
              back.
            </Text>
          </View>
        </View>
        <View style={[BaseStyle.flex, BaseStyle.col12]}>
          <View style={[CustomStyle.avatarWrapper]}>
            {
              (user['avatar_url']) ? (
                <>
                  <Image defaultSource={require('../../../assets/images/data/avatar-placeholder.png')} source={{ uri: user['avatar_url'] }} style={[CustomStyle.avatar]} alt="avatar" resizeMode="contain" />
                </>
              ) : (
                <>
                  <Image source={require('../../../assets/images/data/avatar-placeholder.png')} style={[CustomStyle.avatar]} alt="avatar" resizeMode="contain" />
                </>
              )
            }
          </View>
        </View>
        <View style={[BaseStyle.flex, BaseStyle.col12]}>
          <View style={[styles.footerWapper]}>
            <View style={[styles.welcomeTextWrapper]}>
              <Text style={[BaseStyle.textLg, BaseStyle.textSemiBold, BaseStyle.textBlack, BaseStyle.textCenter]}>
                {`Hi, ${user['first_name']} ${user['last_name']}`}
              </Text>
            </View>
            <View style={[CustomStyle.formControl]}>
              <MyButton mode="contained" onPress={() => onPressNext()}>
                PROCEED
              </MyButton>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default WelcomeScreen;