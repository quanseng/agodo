import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, ImageBackground, Image, StatusBar, View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import { ROUTE_CHARGE_DETAIL, ROUTE_SIGNUP } from '../../../routes/RouteNames';
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
import MyScreenHeader from '../../../components/MyScreenHeader';

const ChargeHistoryScreen = (props) => {
  const { navigation } = props;

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
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

  const onPressChargeRow = ()=>{
    navigation.navigate(ROUTE_CHARGE_DETAIL);
  }

  return (
    <SafeAreaView style={[CustomStyle.screenContainer]}>
      <ScrollView style={[BaseStyle.flex]} contentContainerStyle={{ flexGrow: 1 }}>
        <MyScreenHeader
          headerType="4"
          title="My History"
        />
        <View style={[styles.homeBody]}>
          <View style={[CustomStyle.hr, BaseStyle.mt1]}></View>
          <View style={[styles.homeContent]}>
            <View style={[CustomStyle.formControl, BaseStyle.mb0]}>
              <TouchableOpacity style={[styles.historyRow]} onPress={()=>onPressChargeRow()}>
                <View style={[styles.chargeAvatarBox]}>
                  <Image source={require('../../../assets/images/icons/car.png')} style={[styles.chargeAvatar]} alt="avatar" resizeMode="contain" />
                </View>
                <View style={[styles.chargeInfoBox]}>
                  <Text style={[BaseStyle.textMd, BaseStyle.textSemiBold, BaseStyle.textBlack, BaseStyle.textLeft]}>
                    Clifford Odoi
                  </Text>
                  <Text style={[BaseStyle.textSm, BaseStyle.textSemiBold, BaseStyle.textBlack, BaseStyle.textLeft]}>
                    5 mar,11:27
                  </Text>
                </View>
                <View style={[styles.chargePriceBox]}>
                  <Text style={[BaseStyle.textLg, BaseStyle.textBold, BaseStyle.textBlack, BaseStyle.textRight]}>
                    $ 25.00
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={[CustomStyle.hr]}></View>
            </View>
            <View style={[CustomStyle.formControl, BaseStyle.mb0]}>
            <TouchableOpacity style={[styles.historyRow]} onPress={()=>onPressChargeRow()}>
                <View style={[styles.chargeAvatarBox]}>
                  <Image source={require('../../../assets/images/icons/charging_station.png')} style={[styles.chargeAvatar]} alt="avatar" resizeMode="contain" />
                </View>
                <View style={[styles.chargeInfoBox]}>
                  <Text style={[BaseStyle.textMd, BaseStyle.textSemiBold, BaseStyle.textBlack, BaseStyle.textLeft]}>
                    Clifford Odoi
                  </Text>
                  <Text style={[BaseStyle.textSm, BaseStyle.textSemiBold, BaseStyle.textBlack, BaseStyle.textLeft]}>
                    5 mar,11:27
                  </Text>
                </View>
                <View style={[styles.chargePriceBox]}>
                  <Text style={[BaseStyle.textLg, BaseStyle.textBold, BaseStyle.textBlack, BaseStyle.textRight]}>
                    $ 25.00
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={[CustomStyle.hr]}></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChargeHistoryScreen;