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

const SignUpScreen = (props) => {
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
                    <MyDropdown
                      label={`Select your State`}
                      mode={"flat"}
                      value={gender}
                      setValue={setGender}
                      list={genderList}
                      inputProps={{
                        left: (<TextInput.Icon icon={({ size, color }) => (
                          <Image source={require('../../../assets/images/flag/flag_us.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                        )} />)
                      }}
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
    </SafeAreaView>
  )
}

export default SignUpScreen;