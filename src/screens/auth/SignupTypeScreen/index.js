import React, { useRef, useState } from 'react';
import { SafeAreaView, Image, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import styles from './styles';
import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import { USER_TYPE } from '../../../utils/Constants';
import MyButton from '../../../components/MyButton';
import MyScreenHeader from '../../../components/MyScreenHeader';
import { ROUTE_EV_REG_PERSONAL, ROUTE_USER_REG_PERSONAL } from '../../../routes/RouteNames';
import AuthStyle from '../../../styles/AuthStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from '../../../redux/data/actions';

const SignupTypeScreen = (props) => {
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
  const formData = pageData['signupData']

  const userTypeItemList = [
    {
      id: USER_TYPE.USER,
      image: require('../../../assets/images/button_icons/car.png'),
      text: "Regular User"
    },
    {
      id: USER_TYPE.EV,
      image: require('../../../assets/images/button_icons/ev.png'),
      text: "EV Source"
    }
  ];
  const [currentUserType, setCurrentUserType] = useState(USER_TYPE.USER);
  const onPressUserType = (val) => {
    setCurrentUserType(val)
  }

  const onPressNext = () => {
    dispatch(setPageData({ signupData: {...formData, user_type: currentUserType} }));
    if(currentUserType === USER_TYPE.USER) {
      navigation.navigate(ROUTE_USER_REG_PERSONAL);
    }else{
      navigation.navigate(ROUTE_EV_REG_PERSONAL);
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
                {
                  (currentUserType === USER_TYPE.USER) ? (
                    <>
                      <View style={styles.userTypeDescBox}>
                        <Image source={require('../../../assets/images/data/charging-station.png')} style={[styles.userTypeDescImage]} alt="desc" resizeMode="cover" />
                        <View style={[CustomStyle.formControl]}>
                          <Text style={[BaseStyle.textXs, BaseStyle.textGray]}>
                            <Text style={[BaseStyle.textWarning]}>Hint:</Text> Users can register as either <Text style={[BaseStyle.textPrimary]}>Regular User or EV Charging Source</Text>. EV Charging Source account can make revenue by allowing Regular users to charge their vehicles at their homes.
                          </Text>
                        </View>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.userTypeDescBox}>
                        <Image source={require('../../../assets/images/data/electric-charger.png')} style={[styles.userTypeDescImage]} alt="desc" resizeMode="cover" />
                        <View style={[CustomStyle.formControl]}>
                          <Text style={[BaseStyle.textXs, BaseStyle.textGray]}>
                            <Text style={[BaseStyle.textWarning]}>Hint:</Text> Users can register as either <Text style={[BaseStyle.textPrimary]}>Regular User or EV Charging Source</Text>. EV Charging Source account can make revenue by allowing Regular users to charge their vehicles at their homes.
                          </Text>
                        </View>
                      </View>
                    </>
                  )
                }

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

export default SignupTypeScreen;