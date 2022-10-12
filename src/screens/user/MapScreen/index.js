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

const MapScreen = (props) => {
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

  const [visibleImageTypeModal, setVisibleImageTypeModal] = useState(false)
  const setImageSourceType = async (type) => {
    let uploadResult = null;

    console_log("type:::", type)
  }


  return (
    <SafeAreaView style={[CustomStyle.screenContainer]}>
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
            setVisibleImageTypeModal(true)
          }}>
          <Image source={require('../../../assets/images/icons/search.png')} style={[CustomStyle.mapSearchIcon]} alt="icon" resizeMode="contain" />
        </TouchableOpacity>

      </View>

      <MyImageSourceModal
        visible={visibleImageTypeModal}
        setVisible={setVisibleImageTypeModal}
        setImageSourceType={setImageSourceType}
      />

    </SafeAreaView>
  )
}

export default MapScreen;