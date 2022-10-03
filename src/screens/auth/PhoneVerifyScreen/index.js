import React, { useState } from 'react';
import { SafeAreaView, Image, StatusBar, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import { console_log, isEmpty, showNotification, showToast } from '../../../utils/Misc';
import MyTextInput from '../../../components/MyTextInput';
import DropDown from 'react-native-paper-dropdown';
import { PaperSelect } from 'react-native-paper-select';

import { COLOR } from '../../../utils/Constants';
import MyDropdown from '../../../components/MyDropdown';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import MyButton from '../../../components/MyButton';
import TextInputMask from 'react-native-text-input-mask';
import MyScreenHeader from '../../../components/MyScreenHeader';
import MyCodeField from '../../../components/MyCodeField';
import { ROUTE_SIGNUP, ROUTE_SIGNUP_TYPE } from '../../../routes/RouteNames';
import AuthStyle from '../../../styles/AuthStyle';

const PhoneVerifyScreen = (props) => {
  const { navigation } = props;
  const defaultFormData = {
    state: "",
    phone: ""
  }
  const requiredFieldList = ["state", "phone"]
  const [formData, setFormData] = useState(defaultFormData);
  const [errorField, setErrorField] = useState([]);
 
  const validateFields = (updatedData = null, field_name = null) => {
    if (updatedData === null) {
      updatedData = { ...formData }
    }
    var errorList = [...errorField]
    if (field_name !== null) {
      if (requiredFieldList.includes(field_name)) {
        errorList = isEmpty(updatedData, field_name, errorList);
      }
    } else {
      for (let i = 0; i < requiredFieldList.length; i++) {
        errorList = isEmpty(updatedData, requiredFieldList[i], errorList);
      }
    }
    setErrorField([...errorList]);
    return errorList
  }

  const [value, setValue] = useState('');

  const onPressEditPhone = () => {
    navigation.navigate(ROUTE_SIGNUP);
  }

  const onPressResendCode = () => {
    console_log("resend code value::::", value)
    //showToast({message: "Resend code"})
  }

  const onPressNext = () => {
    console_log("value::::", value)
    //showNotification({text1:"Errorrrrrrrrrrrr"});
    navigation.navigate(ROUTE_SIGNUP_TYPE);
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
                  <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Please enter the 4-digit code  that was sent to you at +880 023 245 2860.</Text>
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
    </SafeAreaView>
  )
}

export default PhoneVerifyScreen;