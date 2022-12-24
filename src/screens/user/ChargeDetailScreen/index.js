import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, ImageBackground, Image, StatusBar, View, Text, TouchableOpacity } from 'react-native';

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
import MyScreenHeader from '../../../components/MyScreenHeader';
import { setDarkStatusBarStyle } from '../../../utils/Utils';

const ChargeDetailScreen = (props) => {
  const { navigation } = props;

  useFocusEffect(
    React.useCallback(() => {
      setDarkStatusBarStyle(StatusBar)
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
    <SafeAreaView style={[CustomStyle.screenContainer]}>
      <ScrollView style={[BaseStyle.flex]} contentContainerStyle={{ flexGrow: 1 }}>
        <MyScreenHeader
          headerType="3"
          title="Charge details"
        />
        <View style={[styles.homeBody]}>
          <View style={[styles.homeContent]}>
            <View style={[CustomStyle.formControl]}>
              <View style={[styles.contentBox]}>
                <View style={[CustomStyle.formControl]}>
                  <View style={[styles.chargeAvatarBox]}>
                    <View style={[styles.chargeNameBox]}>
                      <Text style={[BaseStyle.textMd, BaseStyle.textBold, BaseStyle.textBlack]}>
                        EV Charge with John Doe
                      </Text>
                      <Text style={[BaseStyle.textSm, BaseStyle.textBlack]}>
                        11 mar,2022 6:27am
                      </Text>
                    </View>
                    <Image source={require('../../../assets/images/data/avatar.png')} style={[CustomStyle.avatarSm]} alt="avatar" resizeMode="contain" />
                  </View>
                  <View style={[CustomStyle.hr, BaseStyle.mt1]}></View>
                </View>
                <View style={[styles.contentBoxBody]}>
                  <View style={[CustomStyle.formControl]}>
                    <Text style={[BaseStyle.textSm, BaseStyle.textBlack]}>
                      Duration
                    </Text>
                    <Text style={[BaseStyle.textSm, BaseStyle.textGray, BaseStyle.pl2]}>
                      00hr:30 min
                    </Text>
                    <Text style={[BaseStyle.textSm, BaseStyle.textBlack]}>
                      Location
                    </Text>
                    <Text style={[BaseStyle.textSm, BaseStyle.textGray, BaseStyle.pl2]}>
                      654 HighLong Beach, CA 90813
                    </Text>
                    <View style={[CustomStyle.hr]}></View>
                  </View>
                  <View style={[CustomStyle.formControl]}>
                    <View style={[styles.paymentRow]}>
                      <Text style={[BaseStyle.textSm, BaseStyle.textBlack]}>
                        Payment
                      </Text>
                      <Text style={[BaseStyle.textMd, BaseStyle.textBlack,]}>
                        $15.00
                      </Text>
                    </View>
                    <View style={[CustomStyle.hr]}></View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChargeDetailScreen;