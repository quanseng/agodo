import React, { useState } from 'react';
import { SafeAreaView, Image, StatusBar, View, Text, ScrollView, Pressable } from 'react-native';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import { console_log, isEmpty } from '../../../utils/Misc';
import MyTextInput from '../../../components/MyTextInput';
import DropDown from 'react-native-paper-dropdown';
import { PaperSelect } from 'react-native-paper-select';

import { COLOR, GOOGLE_MAP_API_KEY, SEARCH_TYPE } from '../../../utils/Constants';
import MyDropdown from '../../../components/MyDropdown';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import MyButton from '../../../components/MyButton';
import TextInputMask from 'react-native-text-input-mask';
import { ROUTE_EV_REG_ID, ROUTE_MAP } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import StepIndicator from 'react-native-step-indicator';
import AuthStyle from '../../../styles/AuthStyle';
import MyStepIndicator from '../../../components/MyStepIndicator';
import MyVerticalStepIndicator from '../../../components/MyVerticalStepIndicator';
import { setDarkStatusBarStyle } from '../../../utils/Utils';
import { Modal } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GooglePlacesInput from '../../../components/GooglePlacesInput';
import { useRef } from 'react';
import { useEffect } from 'react';
import MyGooglePlacesInputModal from '../../../components/MyGooglePlacesInputModal';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

/////////////////////////////////////////////////////////////////////////////////////////////////////
import { checkApiIsLoading, endApiLoading, showCarema, showImageLibrary, showToast, startApiLoading } from '../../../utils/Utils';
import { apiLoginRequired, apiResponseIsSuccess, apiUserGetProfile, apiUserSearchEvList, apiUserUpdateProfile } from '../../../utils/API';
import { navReset, navResetLogin } from '../../../utils/Nav';
import { Indicator } from '../../../components/Indicator';
import { setUser } from '../../../redux/auth/actions';
/////////////////////////////////////////////////////////////////////////////////////////////////////

const SearchTypeTitleObj = {}
SearchTypeTitleObj[SEARCH_TYPE.AT_MY_LOCATION] = "at my location"
SearchTypeTitleObj[SEARCH_TYPE.ON_MY_ROUTE] = "on my route"
SearchTypeTitleObj[SEARCH_TYPE.AT_MY_DESTINATION] = "at my destination"

const SearchRouteScreen = (props) => {
  const { navigation, search_type = SEARCH_TYPE.AT_MY_LOCATION } = props;
  const dispatch = useDispatch();
  ///////////////////////////////////////////////start common header//////////////////////////////////////////////////////
  const [loading, setLoading] = useState(false);
  const STATIC_VALUES = useRef(
    {
      apiLoadingList: [],
    }
  )
  ///////////////////////////////////////////////end common header///////////////////////////////////////////////////////

  const defaultFormData = {
    start_point: "",
    end_point: "",
    start_point_details: null,
    end_point_details: null
  }
  const [formData, setFormData] = useState(defaultFormData);
  const onChangeFormField = (field_name, field_value) => {
    const updatedData = { ...formData }
    updatedData[field_name] = field_value
    console_log("updatedData:::", updatedData)
    setFormData(updatedData)
  }

  const validateFields = () => {
    if (formData['start_point'] === "") {
      showToast({ message: "Please enter starting point" })
      return false
    }
    if (formData['end_point'] === "") {
      showToast({ message: "Please enter end point" })
      return false
    }
    return true
  }

  const onPressNext = () => {
    const isValid = validateFields()
    if (!isValid) {
      return false
    }
    try {
      const params = {}
      params['start_point'] = formData['start_point']
      params['end_point'] = formData['end_point']
      params['start_latitude'] = formData['start_point_details']['geometry']['location']['lat']
      params['end_longitude'] = formData['end_point_details']['geometry']['location']['lng']
      navigation.navigate(ROUTE_MAP, { search_params: params })
      //callApiUpdateScreenData()
    } catch (e) {
      showToast("Invalid request")
    }
  }
  const callApiUpdateScreenData = async (show_loading = true) => {
    const apiKey = "apiUserSearchEvList";
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false;
    }
    if (show_loading) {
      startApiLoading(apiKey, STATIC_VALUES, setLoading);
    }
    const response = await apiUserSearchEvList(formData);
    console_log("apiUserSearchEvList response:::", response)
    if (show_loading) {
      endApiLoading(apiKey, STATIC_VALUES, setLoading)
    }
    if (apiResponseIsSuccess(response)) {
      let userInfo = response['data']['user']
      dispatch(setUser(userInfo));
      showToast({ message: response.message })
    } else {
      if (apiLoginRequired(response)) {
        navResetLogin(navigation)
      } else {
        showToast({ message: response.message })
      }
    }
    return true
  }

  const [currentPosition, setCurrentPosition] = useState(0);

  const [currentFieldName, setCurrentFieldName] = useState('start_point');

  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true)
  }
  const setLocationData = (details) => {
    console_log("details::::::::", details)
    const formatted_address = details['formatted_address']
    const geometry = details['geometry']
    console_log("currentFieldName, formatted_address::::::::", currentFieldName, formatted_address)

    const update_data = {
      ...formData
    }
    update_data[currentFieldName] = formatted_address
    const data_field = currentFieldName + "_details"
    update_data[data_field] = details
    setFormData(update_data)
  }
  const onChangeCurrentFieldName = (field_name) => {
    //console_log("onChangeCurrentFieldName", field_name)
    setCurrentFieldName(field_name)
    showModal()
  }

  return (
    <SafeAreaView style={[CustomStyle.screenContainer]}>
      <ScrollView style={[BaseStyle.flex]} contentContainerStyle={{ flexGrow: 1 }}>
        <MyScreenHeader
          headerType="3"
          title={`${SearchTypeTitleObj[search_type]}`}
        />
        <View style={[BaseStyle.flex]}>
          <View style={[BaseStyle.flex, styles.verticalStepInputContainer]}>
            <View style={[styles.verticalStepInputWrapper]}>
              <View style={[BaseStyle.mr3]}>
                <MyVerticalStepIndicator
                  stepCount={2}
                  currentPosition={currentPosition}
                  setCurrentPosition={setCurrentPosition}
                />
              </View>

              <View style={[styles.formBody]}>
                <View style={CustomStyle.formControl}>
                  <Pressable
                    onPress={() => onChangeCurrentFieldName('start_point')}
                  >
                    <MyTextInput
                      label={`Enter starting point`}
                      placeholder={``}
                      value={formData['start_point']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("start_point", text)}
                      editable={false}
                    />
                  </Pressable>
                </View>
                <View style={CustomStyle.formControl}>
                  <Pressable
                    onPress={() => onChangeCurrentFieldName('end_point')}
                  >
                    <MyTextInput
                      label={`Where to`}
                      placeholder={``}
                      value={formData['end_point']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("end_point", text)}
                      editable={false}
                      onPress={() => onChangeCurrentFieldName('end_point')}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={[AuthStyle.authFormFooter]}>
              <View style={[CustomStyle.formControl]}>
                <MyButton mode="contained" onPress={() => onPressNext()}>
                  Done
                </MyButton>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <MyGooglePlacesInputModal
        visible={visible}
        setVisible={setVisible}
        setLocationData={(details) => setLocationData(details)}
      />

      {(loading) && (<Indicator />)}
    </SafeAreaView>
  )
}

export default SearchRouteScreen;