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
import { ROUTE_EV_REG_ID } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import StepIndicator from 'react-native-step-indicator';
import AuthStyle from '../../../styles/AuthStyle';
import MyStepIndicator from '../../../components/MyStepIndicator';
import MyVerticalStepIndicator from '../../../components/MyVerticalStepIndicator';
import { setDarkStatusBarStyle } from '../../../utils/Utils';

const ChargingScreen = (props) => {
  const { navigation } = props;

  const defaultFormData = {
    state: "",
    phone: ""
  }
  const requiredFieldList = ["state", "phone"]
  const [formData, setFormData] = useState(defaultFormData);
  const [errorField, setErrorField] = useState([]);
  const onChangeFormField = (field_name, field_value) => {
    //console_log("field_name, field_value", field_name, field_value)
    const updatedData = { ...formData }
    updatedData[field_name] = field_value

    console_log("updatedData:::", updatedData)
    validateFields(updatedData, field_name)
    setFormData(updatedData)
  }
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

  const onPressNext = () => {
    navigation.navigate(ROUTE_EV_REG_ID)
  }
  const [currentPosition, setCurrentPosition] = useState(0);
  return (
    <SafeAreaView style={[CustomStyle.screenContainer]}>
      <ScrollView style={[BaseStyle.flex]} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[BaseStyle.flex]}>
          <View style={[BaseStyle.flex, styles.formContainer]}>
            <View>
              <View style={[CustomStyle.formControl]}>
                <Text style={[BaseStyle.textCenter, BaseStyle.textSm, BaseStyle.textDark]}>Charging in progress...</Text>
              </View>
              <View style={[CustomStyle.formControl]}>
                <Image source={require('../../../assets/images/data/EOK0.png')} style={[styles.placeholderImage]} alt="placeholderImage" resizeMode="cover" />
              </View>
              <View style={[CustomStyle.formControl]}>
                <Text style={[BaseStyle.textCenter, BaseStyle.textMd, BaseStyle.textBold, BaseStyle.textDark]}>Charged Time</Text>
              </View>
              <View style={[CustomStyle.formControl]}>
                <View style={[BaseStyle.rowCenter, BaseStyle.mb6]}>
                  <View style={[styles.timeBg]}>
                    <Text style={[BaseStyle.textCenter, BaseStyle.textDark, BaseStyle.textBold, BaseStyle.textXl, styles.timeText]}>01 : 45</Text>
                  </View>
                </View>
              </View>
              <View style={[CustomStyle.formControl, BaseStyle.mb6]}>
                <View style={[CustomStyle.hr]}></View>
              </View>
            </View>

            <View style={[AuthStyle.authFormFooter]}>
              <View style={[CustomStyle.formControl]}>
                <View style={[BaseStyle.rowCenter]}>
                  <MyButton mode="outlined" style={CustomStyle.buttonPrimary} onPress={() => onPressNext()}>
                    Done
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

export default ChargingScreen;