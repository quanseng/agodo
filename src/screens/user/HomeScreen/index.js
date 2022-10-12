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

const HomeScreen = (props) => {
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
  const onPressTabUri = (uri)=>{
    setTabUri(uri)
  }

  return (
    <ImageBackground style={[CustomStyle.screenContainer]} source={require('../../../assets/images/data/home_bg.png')}>
      {/* <View style={[styles.avatarOverlayer]}>
        <Image source={require('../../../assets/images/data/avatar.png')} style={[CustomStyle.avatar]} alt="avatar" resizeMode="contain" />
      </View> */}

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.homeHeader}>
          <View style={[BaseStyle.col12]}>
            <View style={[CustomStyle.logoWrapper]}>
              <Image source={require('../../../assets/images/logo_text_white.png')} style={[CustomStyle.logo]} alt="logo" resizeMode="contain" />
            </View>
          </View>
          <View style={[BaseStyle.col12]}>
            <View style={[CustomStyle.avatarWrapper]}>
              <Image source={require('../../../assets/images/data/avatar.png')} style={[CustomStyle.avatar]} alt="avatar" resizeMode="contain" />
            </View>
            <View style={[styles.welcomeTextWrapper]}>
              <Text style={[BaseStyle.textLg1, BaseStyle.textSemiBold, BaseStyle.textBlack, BaseStyle.textCenter]}>
                Hi, John Smith
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.homeBody]}>
          <View style={[styles.homeContent]}>
            <View style={[CustomStyle.formControl]}>
              <TextInput
                mode='outlined'
                placeholder='Search...'
                placeholderTextColor={COLOR.FONT_GRAY}
                selectionColor={COLOR.FONT_GRAY}
                style={[CustomStyle.searchText]}
                returnKeyType={`search`}
                textAlign="center"
                right={<TextInput.Icon icon="magnify" />}
                theme={{
                  colors: {
                    primary: COLOR.APP,
                    onSurface: COLOR.APP,
                    surfaceVariant: COLOR.BG_GRAY,
                    onSurfaceVariant: COLOR.APP,
                  },
                  roundness: 30,
                }}
              />
            </View>
            <View style={[CustomStyle.formControl]}>
              <MySearchChargerBox
              />
            </View>
            <View style={[CustomStyle.formControl]}>
              <View style={[styles.contentBox]}>
                <View style={[styles.contentBoxHeader]}>
                  <Text style={[BaseStyle.textMd, BaseStyle.textSemiBold, BaseStyle.textBlack]}>
                    Recent History
                  </Text>
                  <View style={[CustomStyle.hr]}></View>
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

                  <View style={styles.idSideTabBarWrapper}>
                    <View style={styles.idSideTabBarContainer}>
                      <View style={styles.idSideTabItemContainer}>
                        <TouchableOpacity activeOpacity={0.75} style={[styles.idSideTabItem, (tabUri === 'home' ? styles.idSideTabItemActive : null)]} onPress={() => onPressTabUri('home')}>
                          <Text style={[styles.idSideTabItemText, (tabUri === 'home' ? styles.idSideTabItemTextActive : null)]}>HOME</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.idSideTabItemContainer}>
                        <TouchableOpacity activeOpacity={0.75} style={[styles.idSideTabItem, (tabUri === 'setting' ? styles.idSideTabItemActive : null)]} onPress={() => onPressTabUri('setting')}>
                          <Text style={[styles.idSideTabItemText, (tabUri === 'setting' ? styles.idSideTabItemTextActive : null)]}>SETTINGS</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

export default HomeScreen;