import React, { useRef } from 'react';
import { ScrollView, ImageBackground, Image, StatusBar, View, Text, TouchableOpacity } from 'react-native';
import { requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';


import styles from './styles';
import { ROUTE_HOME, ROUTE_SIGNUP } from '../../../routes/RouteNames';
import { useFocusEffect } from '@react-navigation/native';
import { console_log, get_utc_timestamp_ms } from '../../../utils/Misc';
import { useState } from 'react';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import MyButton from '../../../components/MyButton';
import { TextInput } from 'react-native-paper';
import MyTextInput from '../../../components/MyTextInput';
import { COLOR } from '../../../utils/Constants';
import { useDispatch } from 'react-redux';
import { updateSettingData } from '../../../redux/settings/actions';
import { setLightStatusBarStyle } from '../../../utils/Utils';

const LocationEnableScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      setLightStatusBarStyle(StatusBar)
    }, [])
  )


  const gotoNextPage = (reset = false) => {
    console_log("gotoNextPage::::")
    if (reset) {
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTE_HOME }]
      })
    } else {
      navigation.navigate(ROUTE_HOME);
    }
  }

  const onPressNext = () => {
    console_log("onDone::::")
    gotoNextPage();
  }

  const onPressEnable = async () => {
    let permissionResult = await requestRNPermission()
    console_log("permissionResult:::", permissionResult)
    if (permissionResult) {
      dispatch(updateSettingData({ location_enabled: true }))
    }
    gotoNextPage(permissionResult);
  }

  const requestRNPermission = async () => {
    const result = await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION])
    console_log("result:::::", result)
    if (result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED) {
      if (result[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION] === RESULTS.GRANTED || result[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION] === RESULTS.UNAVAILABLE) {
        return true
      }
    }
    return false
  }

  return (
    <ImageBackground style={[CustomStyle.screenContainer]} source={require('../../../assets/images/gradient-bg.png')}>
      <View style={[styles.logoWrapper]}>
        <Image source={require('../../../assets/images/logo_text_white.png')} style={[CustomStyle.logo]} alt="logo" resizeMode="contain" />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.alertBox}>
          <View style={[CustomStyle.formControl]}>
            <Image source={require('../../../assets/images/data/earth.png')} style={[styles.earchIcon]} alt="icon" resizeMode="contain" />
          </View>
          <View style={[CustomStyle.formControl]}>
            <Text style={[BaseStyle.textSm, BaseStyle.textCenter, BaseStyle.textGray]}>
              We need to know your current location in order to suggest a nearby charging station.
            </Text>
          </View>
          <View style={[CustomStyle.formControl]}>
            <View style={[BaseStyle.rowCenter]}>
              <MyButton mode="contained" style={CustomStyle.buttonPrimary} onPress={() => onPressEnable()}>
                Enable
              </MyButton>
            </View>
          </View>
          <View style={[CustomStyle.formControl]}>
            <View style={[BaseStyle.rowCenter]}>
              <MyButton mode="text" style={CustomStyle.buttonPrimary} onPress={() => onPressNext()}>
                Not Now
              </MyButton>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default LocationEnableScreen;