import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import BaseStyle from '../../styles/BaseStyle';
import CustomStyle from '../../styles/CustomStyle';
import { COLOR, SIZE } from '../../utils/Constants';
import { console_log } from '../../utils/Misc';

const MyScreenHeader = (props) => {
  const { headerType = "1", logoType = "default", title = "" } = props;
  // headerType => 1: only with default logo, 2: only back button, 3: backbutton with title

  const navigation = useNavigation();
  const onPressGoBack = () => {
    const canGoBack = navigation.canGoBack()
    console_log("canGoBack:::", canGoBack)
    if(canGoBack) {
      navigation.goBack();
    } 
  }

  return (
    <>
      <View style={[CustomStyle.screenHeader]}>
        {
          (headerType === "1") && (
            <>
              <View></View>
              <View>
                <Image source={require('../../assets/images/logo_text.png')} style={[CustomStyle.logo]} alt="logo" resizeMode="contain" />
              </View>
              <View></View>
            </>
          )
        }
        {
          (headerType === "2") && (
            <>
              <TouchableOpacity onPress={() => { onPressGoBack() }}>
                <Image source={require('../../assets/images/icons/arrow_left.png')} style={CustomStyle.iconBackArrow} alt="back" resizeMode="contain" />
              </TouchableOpacity>
              <View></View>
            </>
          )
        }
        {
          (headerType === "3") && (
            <>
              <TouchableOpacity onPress={() => { onPressGoBack() }}>
                <Image source={require('../../assets/images/icons/arrow_left.png')} style={CustomStyle.iconBackArrow} alt="back" resizeMode="contain" />
              </TouchableOpacity>
              <View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={[BaseStyle.textCenter, BaseStyle.textMd, BaseStyle.textPrimary, BaseStyle.textBold]}>{title}</Text>
              </View>
              <View></View>
            </>
          )
        }
        {
          (headerType === "4") && (
            <>
              <View></View>
              <View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={[BaseStyle.textCenter, BaseStyle.textMd, BaseStyle.textPrimary, BaseStyle.textBold]}>{title}</Text>
              </View>
              <View></View>
            </>
          )
        }

      </View>
    </>
  )
}

export default MyScreenHeader
