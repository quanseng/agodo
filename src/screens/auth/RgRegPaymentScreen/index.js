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
import { RadioButton } from 'react-native-paper';


import { COLOR, PAYMENT_METHOD } from '../../../utils/Constants';
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
import { CreditCardInput, LiteCreditCardInput, MyCreditCardInput } from "../../../components/MyCreditCardForm/src";
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from '../../../redux/data/actions';
import { showToast } from '../../../utils/Utils';
import { useRef } from 'react';

const paymentMethodList = [
  {
    'label': 'Credit Card',
    'value': PAYMENT_METHOD.CREDIT_CARD,
  },
  {
    'label': 'Paypal',
    'value': PAYMENT_METHOD.PAYPAL,
  },
  {
    'label': 'Google Pay',
    'value': PAYMENT_METHOD.GOOGLE_PAY,
  }
]

const RgRegPaymentScreen = (props) => {
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

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.CREDIT_CARD);

  const defaultFormData = {
    billing_address: "",
    paypal_address: "",
    google_pay_address: ""
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
    if (paymentMethod === PAYMENT_METHOD.CREDIT_CARD) {
      if (cardData['valid']) {
        if (formData['billing_address'] === "") {
          showToast({ message: "Please enter billing address" })
          return false
        }
      } else {
        showToast({ message: "Please enter card details correctly" })
        return false
      }
    }
    else if (paymentMethod === PAYMENT_METHOD.PAYPAL) {
      if (formData['paypal_address'] === "") {
        showToast({ message: "Please enter paypal address" })
        return false
      }
    }
    else if (paymentMethod === PAYMENT_METHOD.GOOGLE_PAY) {
      if (formData['google_pay_address'] === "") {
        showToast({ message: "Please enter google pay" })
        return false
      }
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

  const createPaymentData = () => {
    const data = { payment_method: paymentMethod }
    let payment_details = null
    if (paymentMethod === PAYMENT_METHOD.CREDIT_CARD) {
      const cardPaymentData = cardData['values']
      cardPaymentData['billing_address'] = formData['billing_address']
      payment_details = { ...cardPaymentData }
    }
    else if (paymentMethod === PAYMENT_METHOD.PAYPAL) {
      payment_details = {
        paypal_address: formData['paypal_address']
      }
    }
    else if (paymentMethod === PAYMENT_METHOD.GOOGLE_PAY) {
      payment_details = {
        google_pay_address: formData['google_pay_address']
      }
    }
    data['details'] = payment_details
    return data
  }

  const onPressNext = () => {
    const isValid = validateFields()
    if (isValid) {
      const payment_data = createPaymentData()
      console_log("payment_data:::", payment_data)
      dispatch(setPageData({ signupData: { ...signupData, paymentMethodData: { ...payment_data } } }));
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
                    stepCount={3}
                    currentPosition={currentPosition}
                    setCurrentPosition={setCurrentPosition}
                  />
                </View>
                <View style={[AuthStyle.authFormBody]}>
                  <View style={[BaseStyle.mb0]}>
                    <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Payment Details</Text>
                  </View>
                  <View style={[AuthStyle.paymentMethodListWrapper]}>
                    <RadioButton.Group
                      onValueChange={newValue => setPaymentMethod(newValue)} paymentMethod={paymentMethod}>
                      <View style={[CustomStyle.radioInlineList]}>
                        {
                          paymentMethodList.map((item, index) => {
                            return (
                              <View key={index} style={[CustomStyle.radioBox]}>
                                <RadioButton status={`${item.value === paymentMethod ? 'checked' : ''}`} value={item.value} />
                                <Text style={[BaseStyle.textPrimary]}>{item.label}</Text>
                              </View>
                            )
                          })
                        }
                      </View>
                    </RadioButton.Group>
                  </View>

                  <View style={[styles.PaymentMethodBox]}>
                    {
                      (paymentMethod === PAYMENT_METHOD.CREDIT_CARD) ? (
                        <>
                          <View style={[styles.CreditCardBox]}>
                            <MyCreditCardInput
                              autoFocus
                              validColor={"black"}
                              invalidColor={"red"}
                              placeholderColor={"darkgray"}
                              onFocus={onFocusCardField}
                              onChange={onChangeCardField}
                            />
                            <View style={CustomStyle.formControl}>
                              <MyTextInput
                                label={`Billing Address`}
                                placeholder={``}
                                value={formData['billing_address']}
                                returnKeyType="done"
                                keyboardType="default"
                                onChangeText={text => onChangeFormField("billing_address", text)}
                              />
                            </View>
                          </View>
                        </>
                      ) : (paymentMethod === PAYMENT_METHOD.PAYPAL) ? (
                        <>
                          <View style={[styles.PaypalBox]}>
                            <View style={CustomStyle.formControl}>
                              <MyTextInput
                                label={`Paypal Address`}
                                placeholder={``}
                                value={formData['paypal_address']}
                                returnKeyType="done"
                                keyboardType="default"
                                onChangeText={text => onChangeFormField("paypal_address", text)}
                              />
                            </View>
                          </View>
                        </>
                      ) : (
                        <>
                          <View style={[styles.GooglePayBox]}>
                            <View style={CustomStyle.formControl}>
                              <MyTextInput
                                label={`Google Pay Address`}
                                placeholder={``}
                                value={formData['google_pay_address']}
                                returnKeyType="done"
                                keyboardType="default"
                                onChangeText={text => onChangeFormField("google_pay_address", text)}
                              />
                            </View>
                          </View>
                        </>
                      )
                    }
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

export default RgRegPaymentScreen;