import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, Keyboard, View, Text, ScrollView } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import { addItemToArray, console_log, empty, isEmpty, removeItemFromArray, trim_phone } from '../../../utils/Misc';
import MyTextInput from '../../../components/MyTextInput';
import MyButton from '../../../components/MyButton';
import TextInputMask from 'react-native-text-input-mask';
import { ROUTE_PHONE_VERIFY } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import AuthStyle from '../../../styles/AuthStyle';
import { apiCheckPhone, apiGetAllStates, apiResponseIsSuccess } from '../../../utils/API';

import MyStateDropdown from '../../../components/MyStateDropdown';
import { Indicator } from '../../../components/Indicator';
import { setDarkStatusBarStyle, showToast } from '../../../utils/Utils';
import { useDispatch } from 'react-redux';
import { setPageData } from '../../../redux/data/actions';

const SignUpScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      setDarkStatusBarStyle(StatusBar)
    }, [])
  )

  ///////////////////////////////////////////////start common header//////////////////////////////////////////////////////
  const [loading, setLoading] = useState(false);
  const STATIC_VALUES = useRef(
    {
      apiLoadingList: [],
    }
  )
  const checkLoading = (loadingList = null) => {
    let curLoadingList = [...STATIC_VALUES.current['apiLoadingList']]
    if (loadingList !== null) {
      curLoadingList = loadingList
    }
    const isLoading = (!empty(curLoadingList) && curLoadingList.length > 0)
    setLoading(isLoading)
    return isLoading
  }
  const startApiLoading = (apiKey) => {
    const newApiLoadingList = addItemToArray([...STATIC_VALUES.current['apiLoadingList']], apiKey)
    STATIC_VALUES.current['apiLoadingList'] = (newApiLoadingList)
    checkLoading(newApiLoadingList)
  }
  const endApiLoading = (apiKey) => {
    const newApiLoadingList = removeItemFromArray([...STATIC_VALUES.current['apiLoadingList']], apiKey)
    STATIC_VALUES.current['apiLoadingList'] = (newApiLoadingList)
    checkLoading(newApiLoadingList)
  }
  const checkApiIsLoading = (apiKey) => {
    if (!STATIC_VALUES.current['apiLoadingList'].includes(apiKey)) {
      return false;
    } else {
      return true;
    }
  }
  ///////////////////////////////////////////////end common header///////////////////////////////////////////////////////

  useEffect(() => {
    loadScreenData();
  }, []);

  const loadScreenData = async () => {
    const apiKey = "apiGetAllStates";
    if (checkApiIsLoading(apiKey)) {
      return false;
    }
    startApiLoading(apiKey);
    const response = await apiGetAllStates();
    if (apiResponseIsSuccess(response)) {
      initStateList(response.data.state_list)
    } else {
      showToast({ message: response.message })
    }
    endApiLoading(apiKey)
  }
  const [stateList, setStateList] = useState([]) //const stateList = ["Egypt", "Canada", "Australia", "Ireland"]

  const initStateList = (state_list) => {
    let arr1 = []
    for (let k in state_list) {
      const row = state_list[k]
      arr1.push(row.name)
    }
    setStateList(arr1)
  }

  const defaultFormData = {
    state: "",
    phone: ""
  }
  const [formData, setFormData] = useState(defaultFormData);
  const onChangeFormField = (field_name, field_value) => {
    const updatedData = { ...formData }
    updatedData[field_name] = field_value
    setFormData(updatedData)
  }
  const validateFields = () => {
    const state = formData['state']
    if (state === "") {
      showToast({ message: "Please select your State" })
      return false
    }
    const phone = trim_phone(formData['phone'])
    if (phone.length < 10) {
      showToast({ message: "Please enter a valid phone number" })
      return false
    }
    return true;
  }
  const onChangeState = (field_value) => {
    const updatedData = { ...formData }
    updatedData['state'] = field_value
    setFormData(updatedData)
  }

  const onPressNext = async () => {
    Keyboard.dismiss();
    const isValid = validateFields()
    if (isValid) {
      dispatch(setPageData({ signupData: formData }));
      const apiRes = await sendSMS();
      if (apiRes) {
        navigation.navigate(ROUTE_PHONE_VERIFY)
      }
    }
  }

  const sendSMS = async () => {
    const apiKey = "apiCheckPhone";
    if (checkApiIsLoading(apiKey)) {
      return false
    }
    let apiRes = false;
    startApiLoading(apiKey);
    const payload = { phone: formData['phone'] }
    const response = await apiCheckPhone(payload);
    if (apiResponseIsSuccess(response)) {
      apiRes = true
    } else {
      showToast({ message: response.message })
    }
    endApiLoading(apiKey)
    return apiRes
  }


  return (
    <SafeAreaView style={[CustomStyle.screenContainer]}>
      <ScrollView style={[AuthStyle.signupScreen]} contentContainerStyle={{ flexGrow: 1 }}>
        <MyScreenHeader
          headerType="1"
        />
        <View style={[BaseStyle.flex]}>
          <View style={[BaseStyle.flex, AuthStyle.authFormContainer]}>
            <View style={[AuthStyle.authFormWrapper]}>
              <View>
                <View style={[AuthStyle.authFormHeader]}>
                  <Text style={[BaseStyle.textLg1, BaseStyle.textBold, BaseStyle.textPrimary]}>Welcome</Text>
                  <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Let’s get you signed in</Text>
                </View>
                <View style={[AuthStyle.authFormBody]}>
                  <View style={[CustomStyle.formControl]}>
                    {/* <MyDropdown
                      label={`Select your State`}
                      mode={"flat"}
                      value={formData['state']}
                      setValue={onChangeState}
                      list={stateList}
                      inputProps={{
                        left: (<TextInput.Icon icon={({ size, color }) => (
                          <Image source={require('../../../assets/images/flag/flag_us.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                        )} />)
                      }}
                    /> */}
                  </View>
                  <View style={CustomStyle.formControl}>
                    <MyStateDropdown
                      dataList={stateList}
                      onSelect={(e) => onChangeState(e)}
                    />
                  </View>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Enter phone number`}
                      placeholder={`xxx-xxx-xxxx`}
                      value={formData['phone']}
                      returnKeyType="next"
                      keyboardType="phone-pad"
                      onChangeText={text => onChangeFormField("phone", text)}
                      onSubmitEditing={() => onPressNext()}
                      // left={<TextInput.Icon icon={({ size, color }) => (
                      //   <Image source={require('../../../assets/images/flag/flag_us.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                      // )} />}
                      render={props =>
                        <TextInputMask
                          {...props}
                          mask="+1 [000]-[000]-[0000]"
                        />
                      }
                    />
                  </View>

                </View>
              </View>

              <View style={[AuthStyle.authFormFooter]}>
                <View style={[CustomStyle.formControl]}>
                  <Text style={[BaseStyle.textXs, BaseStyle.textGray]}>
                    By continuing you may receive an SMS for Verification. Message and data rates may apply.
                  </Text>
                </View>
                <View style={[CustomStyle.formControl]}>
                  <MyButton mode="contained" onPress={() => onPressNext()}>
                    NEXT
                  </MyButton>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {(loading) && (<Indicator />)}
    </SafeAreaView>
  )
}

export default SignUpScreen;