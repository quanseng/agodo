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
import { checkApiIsLoading, endApiLoading, setDarkStatusBarStyle, showToast, startApiLoading } from '../../../utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from '../../../redux/data/actions';
import { signOut } from '../../../redux/auth/actions';
import { clearSettingData } from '../../../redux/settings/actions';

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
  ///////////////////////////////////////////////end common header///////////////////////////////////////////////////////

  const pageData = useSelector(state => state.data.pageData);
  const signupData = pageData['signupData']
  console_log("Signup screen signupData:::", signupData)

  useEffect(() => {
    clearSession()
    loadScreenData();
  }, []);

  const clearSession = () => {
    dispatch(signOut());
    dispatch(clearSettingData());   
  }
  const loadScreenData = async () => {
    const apiKey = "apiGetAllStates";
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false;
    }
    startApiLoading(apiKey, STATIC_VALUES, setLoading);
    const response = await apiGetAllStates();
    if (apiResponseIsSuccess(response)) {
      initStateList(response.data.state_list)
    } else {
      showToast({ message: response.message })
    }
    endApiLoading(apiKey, STATIC_VALUES, setLoading)
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
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false
    }
    let apiRes = false;
    startApiLoading(apiKey, STATIC_VALUES, setLoading);
    const payload = { phone: formData['phone'] }
    const response = await apiCheckPhone(payload);
    if (apiResponseIsSuccess(response)) {
      apiRes = true
    } else {
      showToast({ message: response.message })
    }
    endApiLoading(apiKey, STATIC_VALUES, setLoading)
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