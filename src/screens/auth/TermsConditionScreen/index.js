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
import { ROUTE_PHONE_VERIFY } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import AuthStyle from '../../../styles/AuthStyle';

const TermsConditionScreen = (props) => {
  const { navigation } = props;

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('rgba(255,255,255,0)');
      StatusBar.setTranslucent(true);
    }, [])
  );

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


  const [showDropDown, setShowDropDown] = useState(false);
  const genderList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },

  ];
  const [gender, setGender] = useState("");

  const onPressNext = () => {
    navigation.navigate(ROUTE_PHONE_VERIFY)
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
    </SafeAreaView>
  )
}

export default TermsConditionScreen;