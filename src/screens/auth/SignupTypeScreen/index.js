import React, { useState } from 'react';
import { SafeAreaView, Image, StatusBar, View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native';

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
import { ROUTE_REG_PERSONAL_EV, ROUTE_SIGNUP } from '../../../routes/RouteNames';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AuthStyle from '../../../styles/AuthStyle';

const SignupTypeScreen = (props) => {
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
    navigation.navigate(ROUTE_REG_PERSONAL_EV);
  }

  const onPressResendCode = () => {
    console_log("resend code value::::", value)
    //showToast({ message: "Resend code" })
  }

  const onPressNext = () => {
    navigation.navigate(ROUTE_REG_PERSONAL_EV);
  }

  const userTypeItemList = [
    {
      id: "user",
      image: require('../../../assets/images/button_icons/car.png'),
      text: "Regular User"
    },
    {
      id: "ev",
      image: require('../../../assets/images/button_icons/ev.png'),
      text: "EV Source"
    }
  ];
  const [currentUserType, setCurrentUserType] = useState("user");
  const onPressUserType = (val) => {
    setCurrentUserType(val)
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
              <View style={[AuthStyle.authFormHeader]}>
                <Text style={[BaseStyle.textLg1, BaseStyle.textBold, BaseStyle.textPrimary]}>Continue as</Text>
              </View>
              <View style={[AuthStyle.authFormBody]}>
                <View style={styles.userTypeBox}>
                  {
                    userTypeItemList.map((item, index) => {
                      return (
                        <TouchableOpacity key={item.id} activeOpacity={0.75} style={[styles.userTypeItem, (index === 0 ? BaseStyle.mr2 : BaseStyle.ml2), (currentUserType === item.id ? styles.userTypeItemActive : null)]} onPress={() => { onPressUserType(item.id) }}>
                          <Image source={item.image} style={[styles.userTypeIcon, (currentUserType === item.id ? styles.userTypeIconActive : null)]} alt="icon" resizeMode="contain" />
                          <View style={[BaseStyle.mt2]}>
                            <Text style={[BaseStyle.textSm, BaseStyle.textCenter, styles.userTypeText, (currentUserType === item.id ? styles.userTypeTextActive : null)]}>{item.text}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </View>

              <View style={[AuthStyle.authFormFooter]}>
                <View style={styles.userTypeDescBox}>
                  <Image source={require('../../../assets/images/data/charging-station.png')} style={[styles.userTypeDescImage]} alt="desc" resizeMode="cover" />
                  <View style={[CustomStyle.formControl]}>
                    <Text style={[BaseStyle.textXs, BaseStyle.textGray]}>
                      Hint: Users can register as either Regular User or EV Charging Source. EV Charging Source account can make revenue by allowing Regular users to charge their vehicles at their homes.
                    </Text>
                  </View>
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

export default SignupTypeScreen;