import React, { useEffect, useRef } from 'react';
import { ImageBackground, Image, StatusBar, View, TouchableOpacity, Text, ScrollView } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
//import { Text } from 'react-native-paper';

import ResponsiveImageView from 'react-native-responsive-image-view';

import BaseStyle from '../../styles/BaseStyle';
import styles from './styles';
import logoWhite from "../../assets/images/logo_text_white.png";
import { ROUTE_AUTH_STACK_NAVIGATOR, ROUTE_SIGNIN, ROUTE_SIGNUP } from '../../routes/RouteNames';
import { useFocusEffect } from '@react-navigation/native';
import { console_log, get_utc_timestamp_ms } from '../../utils/Misc';
import { useState } from 'react';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { SafeAreaView } from 'react-navigation';
import CustomStyle from '../../styles/CustomStyle';
import { setDarkStatusBarStyle, setLightStatusBarStyle } from '../../utils/Utils';

const data = [
  {
    key: 1,
    title: 'Conviniently Recharge',
    text: 'Find an E-Vehicle charging source\n nearest to you',
    image: require('../../assets/images/carousel/1.png'),
    bg: '#59b2ab',
  },
  {
    key: 2,
    title: 'Easy Payment',
    text: 'Convinient payment options available\n for you',
    image: require('../../assets/images/carousel/2.png'),
    bg: '#febe29',
  },
  {
    key: 3,
    title: 'Earn Extra Income ',
    text: 'Register Your Charging Source To Make\n some extra Revenue',
    image: require('../../assets/images/carousel/3.png'),
    bg: '#febe29',
  },
];

const IntroductionScreen = (props) => {
  const { navigation } = props;

  useFocusEffect(
    React.useCallback(() => {
      setLightStatusBarStyle(StatusBar)
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

  const _renderItem = (slideItem) => {
    const item = slideItem.item
    return (
      <ScrollView style={[styles.slideItem]}>
        <View style={[styles.slideImageWrapper]}>
          <Image source={item.image} style={[styles.slideImage]} resizeMode="cover" fadeDuration={100}  />
        </View>
        <View style={[styles.slideTextWrapper]}>
          <View style={[styles.slidePrimaryTextWrapper]}>
            <Text style={[BaseStyle.textLg1, BaseStyle.textBold, BaseStyle.textWhite, BaseStyle.textCenter]}>{item.title}</Text>
          </View>
          <View style={[styles.slideSecondaryTextWrapper]}>
            <Text style={[BaseStyle.textMd, BaseStyle.textWhite, BaseStyle.textCenter]}>{item.text}</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const _keyExtractor = (item) => {
    return item.text
  }

  const onSkip = ()=>{
    console_log("onSkip::::")
    gotoSignUpPage();
  }
  const onDone = ()=>{
    console_log("onDone::::")
    gotoSignUpPage();
  }

  return (
    <ImageBackground style={[CustomStyle.screenContainer]} source={require('../../assets/images/gradient-bg.png')}>
      <View style={[styles.introScreen]}>
        <View style={[CustomStyle.logoWrapper]}>
          <Image source={require('../../assets/images/logo_text_white.png')} style={[CustomStyle.logo]} alt="logo" resizeMode="contain" />
        </View>

        <View style={styles.sliderContainer}>
          <AppIntroSlider
            ref={sliderRef}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            data={data}
            showSkipButton={true}
            showNextButton={true}
            showDoneButton={true}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            // onSlideChange={onSlideChange}
            onSkip={onSkip}
            onDone={onDone}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

export default IntroductionScreen;