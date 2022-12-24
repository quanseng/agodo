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
import { setDarkStatusBarStyle } from '../../../utils/Utils';

const ProfileScreen = (props) => {
  const { navigation } = props;

  useFocusEffect(
    React.useCallback(() => {
      setDarkStatusBarStyle(StatusBar)
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

  const onPressNext = () => {
    navigation.navigate(ROUTE_EV_REG_ID)
  }
  const [currentPosition, setCurrentPosition] = useState(0);
  return (
    <SafeAreaView style={[CustomStyle.screenContainer]}>
      <ScrollView style={[AuthStyle.signupScreen]} contentContainerStyle={{ flexGrow: 1 }}>
        <MyScreenHeader
          headerType="3"
          title="My Profile"
        />
        <View style={[BaseStyle.flex]}>
          <View style={[BaseStyle.flex, AuthStyle.authFormContainer]}>
            <View style={[AuthStyle.authFormWrapper]}>
              <View>
                <View style={[CustomStyle.avatarWrapper]}>
                  <Image source={require('../../../assets/images/data/avatar.png')} style={[CustomStyle.avatar]} alt="avatar" resizeMode="contain" />
                </View>
                <View style={[AuthStyle.authFormBody]}>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Full Name`}
                      placeholder={``}
                      value={formData['phone']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("phone", text)}
                      left={<TextInput.Icon icon={({ size, color }) => (
                        <Image source={require('../../../assets/images/icons/user.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                      )} />}
                    />
                  </View>
                  
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Email`}
                      placeholder={``}
                      value={formData['phone']}
                      returnKeyType="next"
                      keyboardType="email-address"
                      onChangeText={text => onChangeFormField("phone", text)}
                      left={<TextInput.Icon icon={({ size, color }) => (
                        <Image source={require('../../../assets/images/icons/envelope.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                      )} />}
                    />
                  </View>                
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Phone number`}
                      placeholder={`xxx-xxx-xxxx`}
                      value={formData['phone']}
                      returnKeyType="next"
                      keyboardType="phone-pad"
                      onChangeText={text => onChangeFormField("phone", text)}
                      left={<TextInput.Icon icon={({ size, color }) => (
                        <Image source={require('../../../assets/images/icons/user.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                      )} />}
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
                  <MyButton mode="contained" onPress={() => onPressNext()}>
                    Update Profile
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

export default ProfileScreen;