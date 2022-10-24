import React, { useRef, useState } from 'react';
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
import { ROUTE_EV_REG_CREDIT_CARD, ROUTE_EV_REG_VEHICLE } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import StepIndicator from 'react-native-step-indicator';
import AuthStyle from '../../../styles/AuthStyle';
import MyStepIndicator from '../../../components/MyStepIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from '../../../redux/data/actions';
import { showToast } from '../../../utils/Utils';

const EvRegChargerScreen = (props) => {
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
  const [currentPosition, setCurrentPosition] = useState(1); //for stepbar

  const defaultFormData = {
    plug_type: "",
    universal_plug: "",
    address1: "",
    address2: "",
    address3: "",
  }
  const [formData, setFormData] = useState(defaultFormData);
  const onChangeFormField = (field_name, field_value) => {
    const updatedData = { ...formData }
    updatedData[field_name] = field_value
    console_log("updatedData:::", updatedData)
    setFormData(updatedData)
  }
  const validateFields = () => {
    if (formData['plug_type'] === "") {
      showToast({ message: "Please enter plug type" })
      return false
    }
    if (formData['universal_plug'] === "") {
      showToast({ message: "Please enter universal plug" })
      return false
    }
    if (formData['address1'] === "") {
      showToast({ message: "Please enter adress Line 1" })
      return false
    } 
    return true;
  }
  const onPressNext = () => {
    const isValid = validateFields()
    if(isValid) {
      dispatch(setPageData({ signupData: {...signupData, ...formData} }));
      navigation.navigate(ROUTE_EV_REG_CREDIT_CARD)
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
                    <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Charger Details</Text>
                  </View>

                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Plug Type`}
                      placeholder={``}
                      value={formData['plug_type']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("plug_type", text)}
                    />
                  </View>
                  <View style={[CustomStyle.formControl]}>
                    <MyTextInput
                      label={`Universal Plug`}
                      placeholder={``}
                      value={formData['universal_plug']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("universal_plug", text)}
                    />
                  </View>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Adress Line 1`}
                      placeholder={``}
                      value={formData['address1']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("address1", text)}
                    />
                  </View>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Adress Line 2`}
                      placeholder={``}
                      value={formData['address2']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("address2", text)}
                    />
                  </View>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Adress Line 3`}
                      placeholder={``}
                      value={formData['address3']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("address3", text)}
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

export default EvRegChargerScreen;