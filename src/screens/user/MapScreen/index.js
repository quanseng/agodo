import React, { useRef } from 'react';
import { ScrollView, ImageBackground, Image, StatusBar, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import styles from './styles';
import { ROUTE_AT_MY_DESTINATION, ROUTE_AT_MY_LOCATION, ROUTE_ON_MY_ROUTE, ROUTE_SIGNUP } from '../../../routes/RouteNames';
import { useFocusEffect } from '@react-navigation/native';
import { console_log, get_utc_timestamp_ms } from '../../../utils/Misc';
import { useState } from 'react';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import MyButton from '../../../components/MyButton';
import { TextInput } from 'react-native-paper';
import MyTextInput from '../../../components/MyTextInput';
import { COLOR, DEFAULT_LOCATION, SEARCH_TYPE } from '../../../utils/Constants';
import MySearchChargerBox from '../../../components/MySearchChargerBox';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MyImageSourceModal from '../../../components/MyImageSourceModal';
import MyBottomSheet from '../../../components/MyBottomSheet';
import { setDarkStatusBarStyle } from '../../../utils/Utils';
import MyScreenHeader from '../../../components/MyScreenHeader';
import { useDispatch, useSelector } from 'react-redux';
/////////////////////////////////////////////////////////////////////////////////////////////////////
import { checkApiIsLoading, endApiLoading, showCarema, showImageLibrary, showToast, startApiLoading } from '../../../utils/Utils';
import { apiLoginRequired, apiResponseIsSuccess, apiUserAcceptEv, apiUserGetMapData, apiUserSearchEvList } from '../../../utils/API';
import { navReset, navResetLogin } from '../../../utils/Nav';
import { Indicator } from '../../../components/Indicator';
import { setUser } from '../../../redux/auth/actions';
/////////////////////////////////////////////////////////////////////////////////////////////////////

import myLocationMarkerPng from '../../../assets/images/icons/my_location.png';
import evMarkerPng from '../../../assets/images/icons/location.png';
import { useEffect } from 'react';

const MapScreen = (props) => {
  const { navigation, route } = props;
  console_log("route.params:::", route.params)
  let search_params = null
  if(route.params) {
    search_params = route.params.search_params
  }
  console_log("search_params:::", search_params)

  const dispatch = useDispatch();
  ///////////////////////////////////////////////start common header//////////////////////////////////////////////////////
  const [loading, setLoading] = useState(false);
  const STATIC_VALUES = useRef(
    {
      apiLoadingList: [],
    }
  )
  ///////////////////////////////////////////////end common header///////////////////////////////////////////////////////

  const { latitude, longitude } = useSelector(state => state.auth.user);
  console_log("Map page latitude, longitude:::", latitude, longitude)

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (search_params) {
  //       // nothing to od
  //     } else {
  //       callApiGetScreenData(false)
  //     }
  //   }, [])
  // )

  useEffect(() => {
    if (search_params) {
      callApiUserSearchEvList(false)
    } else {
      callApiGetScreenData(false)
    }
  }, [search_params])

  const [searchedEvList, setSearchedEvList] = useState([]);

  const callApiUserSearchEvList = async (show_loading = true) => {
    setSearching(true);
    const apiKey = "apiUserSearchEvList";
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false;
    }
    if (show_loading) {
      startApiLoading(apiKey, STATIC_VALUES, setLoading);
    }
    const response = await apiUserSearchEvList(search_params);
    console_log("apiUserSearchEvList response:::", response)
    if (show_loading) {
      endApiLoading(apiKey, STATIC_VALUES, setLoading)
    }

    if (apiResponseIsSuccess(response)) {
      setTimeout(() => {
        processSearchResult(response)
      }, 1500)
    } else {
      setSearching(false);
      if (apiLoginRequired(response)) {
        navResetLogin(navigation)
      } else {
        showToast({ message: response.message })
      }
    }
    return true
  }

  const processSearchResult = (response)=>{
    setSearching(false);

    let userInfo = response['data']['user']
    dispatch(setUser(userInfo));
    let ev_list = response['data']['ev_list']
    setSearchedEvList(ev_list)
    if (ev_list.length > 0) {
      setCurrentEv(ev_list[0])
      setVisibleAcceptEvModal(true)
    } else {
      setCurrentEv(null)
      setVisibleAcceptEvModal(false)
    }
  }

  const defaultFormData = {
    ev_list: []
  }
  const [formData, setFormData] = useState(defaultFormData);
  const callApiGetScreenData = async (show_loading = true) => {
    const apiKey = "apiUserGetMapData";
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false;
    }
    if (show_loading) {
      startApiLoading(apiKey, STATIC_VALUES, setLoading);
    }
    const response = await apiUserGetMapData();
    //console_log("apiUserGetMapData response:::", response)
    if (show_loading) {
      endApiLoading(apiKey, STATIC_VALUES, setLoading)
    }
    if (apiResponseIsSuccess(response)) {
      let userInfo = response['data']['user']
      let ev_list = response['data']['ev_list']
      console_log("ev_list:::", ev_list)
      let update_data = { ...formData }
      update_data['ev_list'] = ev_list
      setFormData(update_data)
    } else {
      if (apiLoginRequired(response)) {
        navResetLogin(navigation)
      } else {
        showToast({ message: response.message })
      }
    }
  }

  const [visibleSearchChargerModal, setVisibleSearchChargerModal] = useState(false)
  const onPressSarch = () => {
    console_log("chargerType:::", chargerType)
    if (chargerType === SEARCH_TYPE.AT_MY_LOCATION) {
      navigation.navigate(ROUTE_AT_MY_LOCATION)
    }
    else if (chargerType === SEARCH_TYPE.ON_MY_ROUTE) {
      navigation.navigate(ROUTE_ON_MY_ROUTE)
    }
    else if (chargerType === SEARCH_TYPE.AT_MY_DESTINATION) {
      navigation.navigate(ROUTE_AT_MY_DESTINATION)
    }

    setVisibleSearchChargerModal(false);
  }
  const getMyLocation = () => {
    const userLocation = {
      latitude: (latitude ? latitude : DEFAULT_LOCATION.LATITUDE),
      longitude: (longitude ? longitude : DEFAULT_LOCATION.LONGITUDE)
    }
    return userLocation
  }
  const [chargerType, setChargerType] = useState(SEARCH_TYPE.AT_MY_LOCATION)

  const [searching, setSearching] = useState(false)
  const onPressCancelSearch = () => {
    setSearching(false)
    navigation.setParams({ search_params: null });
  }

  const [currentEv, setCurrentEv] = useState(null)
  const [currentEvAccepted, setCurrentEvAccepted] = useState(false)

  const onPressAcceptEv = (flag) => {
    if(flag){
      callApiAcceptEv()
    }else{
      setCurrentEv(null)
    }
    setVisibleAcceptEvModal(false)
  }

  const callApiAcceptEv = async (show_loading = true) => {
    const apiKey = "apiUserAcceptEv";
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false;
    }
    if (show_loading) {
      startApiLoading(apiKey, STATIC_VALUES, setLoading);
    }
    const response = await apiUserAcceptEv({...currentEv});
    if (show_loading) {
      endApiLoading(apiKey, STATIC_VALUES, setLoading)
    }
    if (apiResponseIsSuccess(response)) {
      let userInfo = response['data']['user']
      setCurrentEv(null)
    } else {
      if (apiLoginRequired(response)) {
        navResetLogin(navigation)
      } else {
        showToast({ message: response.message })
      }
    }
  }

  const [visibleAcceptEvModal, setVisibleAcceptEvModal] = useState(false)


  return (
    <View style={[CustomStyle.screenContainer]}>
      <View style={[styles.homeBody]}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={CustomStyle.map}
          region={{
            ...getMyLocation(),
            latitudeDelta: DEFAULT_LOCATION.RADIUS,
            longitudeDelta: DEFAULT_LOCATION.RADIUS,
          }}
        >
          <Marker
            coordinate={{
              ...getMyLocation()
            }}
            image={myLocationMarkerPng}
          >
            {/* <Image
              source={require('../../../assets/images/icons/my_location.png')}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            /> */}
          </Marker>

          {formData['ev_list'].map((ev, index) => (
            <Marker
              title={`${ev.plug_type} ${`, `} ${ev.universal_plug}`}
              key={ev.id}
              coordinate={{
                latitude: ev.latitude,
                longitude: ev.longitude
              }}
              image={evMarkerPng}
            />
          ))}
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
                  chargerType={chargerType}
                  setChargerType={setChargerType}
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

      {
        (searching) && (
          <MyBottomSheet
            height={230}
            visible={searching}
            setVisible={setSearching}
          >
            <View style={[BaseStyle.col12, BaseStyle.flex]}>
              <View style={[CustomStyle.formControl, styles.searchingPlaceBox]}>
                <Text style={[BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.textMd1]}>Searching for charging source...</Text>
              </View>

              <View style={[styles.searchBtnBox]}>
                <View style={[BaseStyle.rowCenter]}>
                  <MyButton mode="contained" style={CustomStyle.buttonPrimary} onPress={() => onPressCancelSearch()}>
                    Cancel
                  </MyButton>
                </View>
              </View>
            </View>
          </MyBottomSheet>
        )
      }

      {
        (visibleAcceptEvModal) && (
          <MyBottomSheet
            height={260}
            visible={visibleAcceptEvModal}
            setVisible={setVisibleAcceptEvModal}
          >
            <View style={[BaseStyle.col12, BaseStyle.flex]}>
              <View style={[CustomStyle.formControl]}>
                <Text style={[BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.textMd1]}>Charging source found</Text>
              </View>
              <View style={[CustomStyle.formControl, styles.searchingPlaceBox]}>
                <Text style={[BaseStyle.textBlack, BaseStyle.textCenter, BaseStyle.textMd1]}>
                  Tesla Model X charger plug
                  Universal Plug Available
                  Arrive in 2min, 0.8miles
                </Text>
              </View>

              <View style={[styles.searchBtnBox]}>
                <View style={[BaseStyle.rowCenter]}>
                  <MyButton mode="contained" style={CustomStyle.buttonPrimary} onPress={() => onPressAcceptEv(true)}>
                    Accept
                  </MyButton>
                  <MyButton mode="text" style={CustomStyle.buttonPrimary} onPress={() => onPressAcceptEv(false)}>
                    Reject
                  </MyButton>
                </View>
              </View>
            </View>
          </MyBottomSheet>
        )
      }

      {(loading) && (<Indicator />)}

    </View>
  )
}

export default MapScreen;