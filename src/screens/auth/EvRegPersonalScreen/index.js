import React, { useRef, useState } from 'react';
import { SafeAreaView, Image, StatusBar, View, Text, ScrollView } from 'react-native';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import { console_log, isEmpty, validateEmail } from '../../../utils/Misc';
import MyTextInput from '../../../components/MyTextInput';
import DropDown from 'react-native-paper-dropdown';
import { PaperSelect } from 'react-native-paper-select';

import { COLOR } from '../../../utils/Constants';
import MyDropdown from '../../../components/MyDropdown';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import MyButton from '../../../components/MyButton';
import TextInputMask from 'react-native-text-input-mask';
import { ROUTE_EV_REG_ID } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import StepIndicator from 'react-native-step-indicator';
import AuthStyle from '../../../styles/AuthStyle';
import MyStepIndicator from '../../../components/MyStepIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../../utils/Utils';
import { setPageData } from '../../../redux/data/actions';

const EvRegPersonalScreen = (props) => {
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
  const [currentPosition, setCurrentPosition] = useState(0); //for stepbar

  const defaultFormData = {
    first_name: "",
    last_name: "",
    email: "",
  }
  const [formData, setFormData] = useState(defaultFormData);
  const onChangeFormField = (field_name, field_value) => {
    const updatedData = { ...formData }
    updatedData[field_name] = field_value
    console_log("updatedData:::", updatedData)
    setFormData(updatedData)
  }

  const validateFields = () => {
    if (formData['first_name'] === "") {
      showToast({ message: "Please enter your first name" })
      return false
    }
    if (formData['last_name'] === "") {
      showToast({ message: "Please enter your last name" })
      return false
    }
    if (formData['email'] === "") {
      showToast({ message: "Please enter your email" })
      return false
    }else{
      if(!validateEmail(formData['email'])) {
        showToast({ message: "Please enter a valid email" })
        return false
      }
    }
    return true;
  }

  const onPressNext = () => {
    const isValid = validateFields()
    if(isValid) {
      dispatch(setPageData({ signupData: {...signupData, ...formData} }));
      navigation.navigate(ROUTE_EV_REG_ID)
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
                  <Text style={[BaseStyle.textLg1, BaseStyle.textBold, BaseStyle.textPrimary]}>Complete the process</Text>
                </View>
                <View style={[AuthStyle.regStepBarContainer]}>
                  <MyStepIndicator
                    stepCount={4}
                    currentPosition={currentPosition}
                    setCurrentPosition={setCurrentPosition}
                  />
                </View>
                <View style={[AuthStyle.authFormBody]}>
                  <View style={[CustomStyle.formControl, BaseStyle.mb6]}>
                    <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Personal Details</Text>
                  </View>

                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`First Name`}
                      placeholder={``}
                      value={formData['first_name']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("first_name", text)}
                      left={<TextInput.Icon icon={({ size, color }) => (
                        <Image source={require('../../../assets/images/icons/user.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                      )} />}
                    />
                  </View>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Last Name`}
                      placeholder={``}
                      value={formData['last_name']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("last_name", text)}
                      left={<TextInput.Icon icon={({ size, color }) => (
                        <Image source={require('../../../assets/images/icons/user.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                      )} />}
                    />
                  </View>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Email`}
                      placeholder={``}
                      value={formData['email']}
                      returnKeyType="next"
                      keyboardType="email-address"
                      onChangeText={text => onChangeFormField("email", text)}
                      left={<TextInput.Icon icon={({ size, color }) => (
                        <Image source={require('../../../assets/images/icons/envelope.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                      )} />}
                    />
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

export default EvRegPersonalScreen;