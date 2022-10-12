import React, { useRef } from 'react';
import { ImageBackground, Image, StatusBar, View, Text } from 'react-native';

import styles from './styles';
import { ROUTE_SIGNUP } from '../../../routes/RouteNames';
import { useFocusEffect } from '@react-navigation/native';
import { console_log, get_utc_timestamp_ms } from '../../../utils/Misc';
import { useState } from 'react';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import MyButton from '../../../components/MyButton';

const WelcomeScreen = (props) => {
  const { navigation } = props;

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('rgba(255,255,255,0)');
      StatusBar.setTranslucent(true);
    }, [])
  );

  const sliderRef = useRef(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [slideTimestamp, setSlideTimestamp] = useState(0)

  const onSlideChange = (index, lastIndex) => {
    console_log("index, lastIndex:::", index, lastIndex)
    setCurrentSlideIndex(index)
    setSlideTimestamp(get_utc_timestamp_ms())
  }

  const gotoSignUpPage = () => {
    console_log("gotoLoginPage::::")
    navigation.replace(ROUTE_SIGNUP);
  }


  const onPressNext = () => {
    console_log("onDone::::")
    gotoSignUpPage();
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
            <Image source={require('../../../assets/images/data/avatar.png')} style={[CustomStyle.avatar]} alt="avatar" resizeMode="contain" />
          </View>
        </View>
        <View style={[BaseStyle.flex, BaseStyle.col12]}>
          <View style={[styles.footerWapper]}>
            <View style={[styles.welcomeTextWrapper]}>
              <Text style={[BaseStyle.textLg, BaseStyle.textSemiBold, BaseStyle.textBlack, BaseStyle.textCenter]}>
                Hi, John Smith
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