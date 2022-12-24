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

import { COLOR, PAYMENT_METHOD } from '../../../utils/Constants';
import MyDropdown from '../../../components/MyDropdown';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import MyButton from '../../../components/MyButton';
import TextInputMask from 'react-native-text-input-mask';
import { ROUTE_EV_REG_VEHICLE } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import StepIndicator from 'react-native-step-indicator';
import AuthStyle from '../../../styles/AuthStyle';
import MyStepIndicator from '../../../components/MyStepIndicator';
import { CreditCardInput, LiteCreditCardInput, MyCreditCardInput } from "../../../components/MyCreditCardForm/src";
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from '../../../redux/data/actions';
import { showToast } from '../../../utils/Utils';

const EvRegCreditCardScreen = (props) => {
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
  const [currentPosition, setCurrentPosition] = useState(2); //for stepbar

  const defaultFormData = {
    billing_address: ""
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
    if (cardData['valid']) {
      if (formData['billing_address'] === "") {
        showToast({ message: "Please enter billing address" })
        return false
      }
    } else {
      showToast({ message: "Please enter card details correctly" })
      return false
    }
    return true
  }

  const [cardData, setCardData] = useState({});

  const onFocusCardField = (field) => {
    console_log("onFocusCardField::::", field)
  }
  const onChangeCardField = (card_data) => {
    console_log("onChangeCardField::::", card_data)
    setCardData(card_data)
  }

  const createCardPaymentData = () => {
    const cardPaymentData = cardData['values']
    cardPaymentData['billing_address'] = formData['billing_address']
    const data = { payment_method: PAYMENT_METHOD.CREDIT_CARD, details: cardPaymentData }
    return data
  }

  const onPressNext = () => {
    const isValid = validateFields()
    if (isValid) {
      const cardPaymentData = createCardPaymentData()
      console_log("cardPaymentData:::", cardPaymentData)
      dispatch(setPageData({ signupData: { ...signupData, paymentMethodData: { ...cardPaymentData } } }));
      navigation.navigate(ROUTE_EV_REG_VEHICLE)
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
                    <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Credit Card Details</Text>
                  </View>

                  <View>
                    <MyCreditCardInput
                      autoFocus
                      validColor={"black"}
                      invalidColor={"red"}
                      placeholderColor={"darkgray"}
                      onFocus={onFocusCardField}
                      onChange={onChangeCardField}
                    />
                  </View>

                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Billing Address`}
                      placeholder={``}
                      value={formData['billing_address']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("billing_address", text)}
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

export default EvRegCreditCardScreen;