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
import { ROUTE_EV_REG_VEHICLE, ROUTE_TERMS_CONDITION } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import StepIndicator from 'react-native-step-indicator';
import AuthStyle from '../../../styles/AuthStyle';
import MyStepIndicator from '../../../components/MyStepIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from '../../../redux/data/actions';
import { apiRegisterUser, apiResponseIsSuccess } from '../../../utils/API';
import { Indicator } from '../../../components/Indicator';
import { endApiLoading, showToast, startApiLoading } from '../../../utils/Utils';
import { signIn } from '../../../redux/auth/actions';
import { useRef } from 'react';

const EvRegVehicleScreen = (props) => {
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
  console_log("signupData:::", signupData)
  const [currentPosition, setCurrentPosition] = useState(3);

  const defaultFormData = {
    brand: "",
    color: "",
    registration: ""
  }
  const [formData, setFormData] = useState(defaultFormData);
  const onChangeFormField = (field_name, field_value) => {
    //console_log("field_name, field_value", field_name, field_value)
    const updatedData = { ...formData }
    updatedData[field_name] = field_value
    console_log("updatedData:::", updatedData)
    setFormData(updatedData)
  }
  const validateFields = () => {
    // if (formData['brand'] === "") {
    //   showToast({ message: "Please enter Brand" })
    //   return false
    // }
    // if (formData['universal_plug'] === "") {
    //   showToast({ message: "Please enter Color" })
    //   return false
    // }
    // if (formData['address1'] === "") {
    //   showToast({ message: "Please enter Registration" })
    //   return false
    // }
    return true;
  }
  const onPressNext = () => {
    const isValid = validateFields()
    if (isValid) {
      dispatch(setPageData({ signupData: { ...signupData, vehicleData: formData } }));
      navigation.navigate(ROUTE_TERMS_CONDITION)
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
                    <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Vehicle Details (Optional)</Text>
                  </View>

                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Brand`}
                      placeholder={``}
                      value={formData['brand']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("brand", text)}
                    />
                  </View>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Color`}
                      placeholder={``}
                      value={formData['color']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("color", text)}
                    />
                  </View>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Registration`}
                      placeholder={``}
                      value={formData['registration']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("registration", text)}
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
      {(loading) && (<Indicator />)}
    </SafeAreaView>
  )
}

export default EvRegVehicleScreen;