import React, { useRef } from 'react';
import { ScrollView, ImageBackground, Image, StatusBar, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MyImageSourceModal from '../../../components/MyImageSourceModal';
import MyBottomSheet from '../../../components/MyBottomSheet';
import { setDarkStatusBarStyle } from '../../../utils/Utils';

const MapScreen = (props) => {
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

  const [visibleSearchChargerModal, setVisibleSearchChargerModal] = useState(false)

  const onPressSarch = () => {
    setVisibleSearchChargerModal(false);
  }

  return (
    <View style={[CustomStyle.screenContainer]}>
      <View style={[styles.homeBody]}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={CustomStyle.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>

        <TouchableOpacity
          style={CustomStyle.mapSearchButton}
          activeOpacity={0.75}
          onPress={() => {
            setVisibleSearchChargerModal(true)
          }}>
          <Image source={require('../../../assets/images/icons/search.png')} style={[CustomStyle.mapSearchIcon]} alt="icon" resizeMode="contain" />
        </TouchableOpacity>

      </View>

      {
        (visibleSearchChargerModal) && (
          <MyBottomSheet
            height={230}
            visible={visibleSearchChargerModal}
            setVisible={setVisibleSearchChargerModal}
          >
            <View style={[BaseStyle.col12, BaseStyle.flex]}>
              <View style={[CustomStyle.formControl]}>
                <Text style={[BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.textMd1]}>Search for charger</Text>
              </View>
              <View style={[CustomStyle.formControl]}>
                <MySearchChargerBox
                />
              </View>

              <View style={[styles.searchBtnBox]}>
                <View style={[BaseStyle.rowCenter]}>
                  <MyButton mode="contained" style={CustomStyle.buttonPrimary} onPress={() => onPressSarch()}>
                    Search
                  </MyButton>
                </View>
              </View>
            </View>
          </MyBottomSheet>
        )
      }
    </View>
  )
}

export default MapScreen;