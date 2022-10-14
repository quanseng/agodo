import React, { useRef } from 'react';
import { ScrollView, ImageBackground, Image, StatusBar, View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import { ROUTE_SIGNUP } from '../../../routes/RouteNames';
import { useFocusEffect } from '@react-navigation/native';
import { console_log, get_utc_timestamp_ms } from '../../../utils/Misc';
import { useState } from 'react';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import MyButton from '../../../components/MyButton';
import { TextInput } from 'react-native-paper';
import MyTextInput from '../../../components/MyTextInput';
import { COLOR } from '../../../utils/Constants';
import MySearchChargerBox from '../../../components/MySearchChargerBox';

const LocationEnableScreen = (props) => {
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

  const [tabUri, setTabUri] = useState('home')
  const onPressTabUri = (uri) => {
    setTabUri(uri)
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
              <MyButton mode="contained" style={CustomStyle.buttonPrimary} onPress={() => onPressNext()}>
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