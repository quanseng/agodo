import React, { useState } from 'react';
import { SafeAreaView, Image, StatusBar, View, Text, ScrollView } from 'react-native';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import { console_log, isEmpty } from '../../../utils/Misc';
import MyTextInput from '../../../components/MyTextInput';
import DropDown from 'react-native-paper-dropdown';
import { PaperSelect } from 'react-native-paper-select';

import { COLOR } from '../../../utils/Constants';
import MyDropdown from '../../../components/MyDropdown';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import MyButton from '../../../components/MyButton';
import TextInputMask from 'react-native-text-input-mask';
import { ROUTE_EV_REG_VEHICLE, ROUTE_LOCATION_ENABLE, ROUTE_TERMS_CONDITION } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import StepIndicator from 'react-native-step-indicator';
import AuthStyle from '../../../styles/AuthStyle';
import MyStepIndicator from '../../../components/MyStepIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from '../../../redux/data/actions';
import { apiRegisterUser, apiResponseIsSuccess } from '../../../utils/API';
import { Indicator } from '../../../components/Indicator';
import { checkApiIsLoading, endApiLoading, showToast, startApiLoading } from '../../../utils/Utils';
import { signIn } from '../../../redux/auth/actions';
import { useRef } from 'react';

const TermsConditionScreen = (props) => {
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
  const signupData = pageData['signupData']
  console_log("Final signupData:::", signupData)

  const onPressNext = () => {
    // const isValid = true
    // if (isValid) {

    // }
    submitSignupData(signupData)
  }

  const submitSignupData = async (userSignupData) => {
    const apiKey = "apiRegisterUser";
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false
    }
    startApiLoading(apiKey, STATIC_VALUES, setLoading);
    const response = await apiRegisterUser({...userSignupData});
    endApiLoading(apiKey, STATIC_VALUES, setLoading)
    console_log('response::::', response)
    if (apiResponseIsSuccess(response)) {
      showToast({ message: response.message })
      const data = response['data']
      let user = data['user']
      dispatch(signIn(user));
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTE_LOCATION_ENABLE }]
      })
    } else {
      showToast({ message: response.message })
    }
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
                  <Text style={[BaseStyle.textLg1, BaseStyle.textBold, BaseStyle.textPrimary]}>Terms and Conditions</Text>
                  <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Accept the terms and conditions to complete the process.</Text>
                </View>
                <View style={[AuthStyle.authFormBody]}>
                  <View style={[CustomStyle.formControl]}>
                    <View style={[styles.termsWrapper]}>
                      <Text style={[BaseStyle.textSm]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Lectus sit amet est placerat in egestas.
                        {"\n"} {"\n"}
                        Sed adipiscing diam donec adipiscing tristique. Ultricies mi quis hendrerit dolormagna. In tellus integer feugiat scelerisque. Sed arcu non odio euismod. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum.
                      </Text>
                    </View>
                  </View>
                  <Text style={[BaseStyle.textSm, BaseStyle.textPrimary, BaseStyle.mb3]}>Read Terms and Conditions</Text>
                </View>
              </View>

              <View style={[AuthStyle.authFormFooter]}>
                <View style={[CustomStyle.formControl]}>
                  <Text style={[BaseStyle.textXs, BaseStyle.textGray]}>
                    By proceeding, I agree to AGODO <Text style={[BaseStyle.textXs, BaseStyle.textPrimary]}>Terms of Use</Text> and acknowlege that I have read the <Text style={[BaseStyle.textXs, BaseStyle.textPrimary]}>Privacy Policy</Text>.
                  </Text>
                </View>
                <View style={[CustomStyle.formControl]}>
                  <MyButton mode="contained" onPress={() => onPressNext()}>
                    Agree
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

export default TermsConditionScreen;