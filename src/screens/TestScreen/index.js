import React, { useEffect, useRef } from 'react';
import { ImageBackground, Image, StatusBar, View, TouchableOpacity, Text, ScrollView, PermissionsAndroid, SafeAreaView } from 'react-native';

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
import CustomStyle from '../../styles/CustomStyle';
import AuthStyle from '../../styles/AuthStyle';
import MyScreenHeader from '../../components/MyScreenHeader';
import { setDarkStatusBarStyle } from '../../utils/Utils';

const TestScreen = (props) => {
  const { navigation } = props;

  useFocusEffect(
    React.useCallback(() => {
      setDarkStatusBarStyle(StatusBar)
    }, [])
  );

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Cool Photo App WRITE_EXTERNAL_STORAGE Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log("granted::::", granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera", granted);
      } else {
        console.log("WRITE_EXTERNAL_STORAGE permission denied", granted);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onPressNext = async () => {
    await requestCameraPermission()

    const options = {
      mediaType: 'photo',
      quality: 1,
      cameraType: 'back',
      saveToPhotos: true,
      presentationStyle: 'pageSheet'
    }
    const result = await launchCamera(options);
    console_log("options,result::::", options, result)
    //navigation.navigate(ROUTE_PHONE_VERIFY)

  }

  return (
    <SafeAreaView style={[CustomStyle.screenContainer]}>
      <ScrollView style={[AuthStyle.signupScreen]} contentContainerStyle={{ flexGrow: 1 }}>
        <MyScreenHeader
          headerType="2"
        />
        <View style={[BaseStyle.flex]}>
          <View style={[BaseStyle.flex, AuthStyle.authFormContainer]}>
            <View style={[AuthStyle.authFormWrapper]}>
              <View>
                <View style={[AuthStyle.authFormHeader]}>
                  <Text style={[BaseStyle.textLg1, BaseStyle.textBold, BaseStyle.textPrimary]}>Test Screen</Text>
                </View>

                <View style={[AuthStyle.authFormBody]}>
                  <View style={[CustomStyle.formControl, BaseStyle.mb6]}>
                    <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Upload your Verification ID</Text>
                  </View>
                </View>
              </View>
              <View style={[AuthStyle.authFormFooter]}>
                <View style={[CustomStyle.formControl]}>
                  <MyButton mode="contained" onPress={() => onPressNext()}>
                    Test
                  </MyButton>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


export default TestScreen;