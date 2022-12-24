import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import { console_log, empty } from '../../../utils/Misc';

import MyButton from '../../../components/MyButton';
import MyScreenHeader from '../../../components/MyScreenHeader';
import MyCodeField from '../../../components/MyCodeField';
import { ROUTE_SIGNUP, ROUTE_SIGNUP_TYPE, ROUTE_WELCOME } from '../../../routes/RouteNames';
import AuthStyle from '../../../styles/AuthStyle';
import { useDispatch, useSelector } from 'react-redux';
import { checkApiIsLoading, endApiLoading, showToast, startApiLoading } from '../../../utils/Utils';
import { apiCheckPhone, apiCheckSMSCode, apiResponseIsSuccess } from '../../../utils/API';
import { Indicator } from '../../../components/Indicator';
import { signIn } from '../../../redux/auth/actions';

const PhoneVerifyScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  ///////////////////////////////////////////////start common header//////////////////////////////////////////////////////
  const [loading, setLoading] = useState(false);
  const STATIC_VALUES = useRef(
    {
      apiLoadingList: [],
    }
  )
  ///////////////////////////////////////////////end common header///////////////////////////////////////////////////////

  const pageData = useSelector(state => state.data.pageData);
  const formData = pageData['signupData']
  const [value, setValue] = useState('');

  const sendSMS = async () => {
    const apiKey = "apiCheckPhone";
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false
    }
    let apiRes = false;
    startApiLoading(apiKey, STATIC_VALUES, setLoading);
    const payload = { phone: formData['phone'] }
    const response = await apiCheckPhone(payload);
    console_log('response::::', response)
    if (apiResponseIsSuccess(response)) {
      apiRes = response.message
    } else {
      showToast({ message: response.message })
    }
    endApiLoading(apiKey, STATIC_VALUES, setLoading)
    return apiRes
  }

  const onPressEditPhone = () => {
    navigation.navigate(ROUTE_SIGNUP);
  }

  const onPressResendCode = async () => {
    const apiRes = await sendSMS();
    if (apiRes) {
      showToast({ message: apiRes })
    }
  }
  const onPressNext = async () => {
    if (!empty(value)) {
      const apiRes = await checkSMSCode()
    }
  }

  const checkSMSCode = async () => {
    const apiKey = "apiCheckSMSCode";
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false
    }
    let checkSuccess = false;
    startApiLoading(apiKey, STATIC_VALUES, setLoading);
    const payload = {
      phone: formData['phone'],
      code: value,
    }
    const response = await apiCheckSMSCode(payload);
    endApiLoading(apiKey, STATIC_VALUES, setLoading)
    console_log('response::::', response)
    if (apiResponseIsSuccess(response)) {
      checkSuccess = true
      //showToast({ message: response.message })
      const data = response['data']
      const login_enabled = data['login_enabled']
      if (login_enabled) {
        let user = data['user']
        dispatch(signIn(user));
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTE_WELCOME }]
        })
      } else {
        navigation.navigate(ROUTE_SIGNUP_TYPE);
      }
    } else {
      showToast({ message: response.message })
      checkSuccess = false
    }
    return checkSuccess
  }

  return (
    <SafeAreaView style={[CustomStyle.screenContainer]}>
      <ScrollView style={[AuthStyle.signupScreen]} contentContainerStyle={{ flexGrow: 1 }}>
        <MyScreenHeader
          headerType="2"
        />
        <View style={[BaseStyle.flex]}>
          <View style={[BaseStyle.flex, AuthStyle.authFormContainer]}>
            <View style={[AuthStyle.authFormWrapper]}>
              <View>
                <View style={[AuthStyle.authFormHeader]}>
                  <Text style={[BaseStyle.textLg1, BaseStyle.textBold, BaseStyle.textPrimary]}>Enter your code</Text>
                  <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Please enter the 4-digit code  that was sent to you at {formData['phone']}.</Text>
                  <TouchableOpacity style={[BaseStyle.mt2]} onPress={() => { onPressEditPhone() }}>
                    <Text style={[BaseStyle.textSm, BaseStyle.textWarning]}>Edit my mobile number</Text>
                  </TouchableOpacity>
                </View>
                <View style={[AuthStyle.authFormBody]}>
                  <View style={CustomStyle.formControl}>
                    <MyCodeField
                      value={value}
                      setValue={setValue}
                    />
                  </View>
                  <View style={CustomStyle.formControl}>
                    <TouchableOpacity onPress={() => { onPressResendCode() }}>
                      <Text style={[BaseStyle.textSm, BaseStyle.textPrimary]}>Resend Code</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={[AuthStyle.authFormFooter]}>
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

export default PhoneVerifyScreen;