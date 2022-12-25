import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import { console_log, empty, validateEmail } from '../../../utils/Misc';

import { TextInput } from 'react-native-paper';
import MyButton from '../../../components/MyButton';
import MyTextInput from '../../../components/MyTextInput';
import TextInputMask from 'react-native-text-input-mask';

import { ROUTE_EV_REG_CHARGER, ROUTE_SIGNUP, ROUTE_TERMS_CONDITION } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import AuthStyle from '../../../styles/AuthStyle';
import MyStepIndicator from '../../../components/MyStepIndicator';
import MyUploadBox from '../../../components/MyUploadBox';
import MyImageSourceModal from '../../../components/MyImageSourceModal';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from '../../../redux/data/actions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MyAvatarBox from '../../../components/MyAvatarBox';
import { useEffect } from 'react';

/////////////////////////////////////////////////////////////////////////////////////////////////////
import { checkApiIsLoading, endApiLoading, showCarema, showImageLibrary, showToast, startApiLoading } from '../../../utils/Utils';
import { apiGetAllStates, apiLoginRequired, apiResponseIsSuccess, apiUserGetProfile, apiUserUpdateProfile } from '../../../utils/API';
import { navReset, navResetLogin } from '../../../utils/Nav';
import { Indicator } from '../../../components/Indicator';
import { setUser } from '../../../redux/auth/actions';
/////////////////////////////////////////////////////////////////////////////////////////////////////

const ProfileScreen = (props) => {
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
  const { signed, user } = useSelector(state => state.auth);
  const [imageSide, setImageSide] = useState("avatar");

  useEffect(() => {
    if(signed){
      setFormData({ ...user, avatar: null })
    }

    callApiGetScreenData()
  }, [user])

  const callApiGetScreenData = async () => {
    const apiKey = "apiUserGetProfile";
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false;
    }
    startApiLoading(apiKey, STATIC_VALUES, setLoading);
    const response = await apiUserGetProfile();
    console_log("apiUserGetProfile response:::", response)
    if (apiResponseIsSuccess(response)) {
      let userInfo = response['data']['user']
      setFormData({ ...userInfo, avatar: null })
    } else {
      if (apiLoginRequired(response)) {
        navResetLogin(navigation)
      } else {
        showToast({ message: response.message })
      }
    }
    endApiLoading(apiKey, STATIC_VALUES, setLoading)
  }

  const defaultFormData = {
    avatar: null
  }
  const [formData, setFormData] = useState(defaultFormData);
  const onChangeFormFileField = (field_value) => {
    if (empty(field_value)) {
      return false;
    }
    const updatedData = { ...formData }
    if (!empty(field_value['assets']) && field_value['assets'].length > 0) {
      updatedData[imageSide] = field_value['assets'][0]
    }
    setFormData(updatedData)
  }
  const onClearFormFileField = (side) => {
    const updatedData = { ...formData }
    updatedData[side] = null;
    setFormData(updatedData)
  }
  const onChangeFormField = (field_name, field_value) => {
    const updatedData = { ...formData }
    updatedData[field_name] = field_value
    console_log("updatedData:::", updatedData)
    setFormData(updatedData)
  }

  const validateFields = () => {
    if (formData['first_name'] === "") {
      showToast({ message: "Please enter your first name" })
      return false
    }
    if (formData['last_name'] === "") {
      showToast({ message: "Please enter your last name" })
      return false
    }
    if (formData['email'] === "") {
      showToast({ message: "Please enter your email" })
      return false
    } else {
      if (!validateEmail(formData['email'])) {
        showToast({ message: "Please enter a valid email" })
        return false
      }
    }
    if (formData['phone'] === "") {
      showToast({ message: "Please enter phone number" })
      return false
    }
    return true
  }

  const renderPlaceholder = () => {
    return (
      <TouchableWithoutFeedback>
        {
          (formData['avatar_url']) ? (
            <>
              <Image source={{ uri: formData['avatar_url'] }} style={[CustomStyle.avatar]} alt="avatar" resizeMode="contain" />
            </>
          ) : (
            <>
              <Image source={require('../../../assets/images/data/avatar-placeholder.png')} style={[CustomStyle.avatar]} alt="avatar" resizeMode="contain" />
            </>
          )
        }
      </TouchableWithoutFeedback>
    )
  }

  const requestRNPermission = async () => {
    const result = await requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
    console_log("result:::::", result)
    if (result[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED && result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.GRANTED) {
      return true
    } else {
      if (result[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED) {
        const uploadResult = await showImageLibrary({ id: imageSide });
        onChangeFormFileField(uploadResult)
      }
      return false
    }
  }
  const openUploadModal = async () => {
    let permissionResult = await requestRNPermission()
    console_log("permissionResult:::", permissionResult)
    if (!permissionResult) {
      return false;
    }
    setVisibleImageTypeModal(true)
  }
  const [visibleImageTypeModal, setVisibleImageTypeModal] = useState(false)
  const setImageSourceType = async (type) => {
    let uploadResult = null;
    if (type === 'camera') {
      uploadResult = await showCarema({ id: imageSide })
    } else if (type === 'file') {
      uploadResult = await showImageLibrary({ id: imageSide })
    }
    onChangeFormFileField(uploadResult)
  }

  const onPressSubmit = async () => {
    const isValid = validateFields()
    if (!isValid) {
      return false
    }
    const apiKey = "apiUserUpdateProfile";
    if (checkApiIsLoading(apiKey, STATIC_VALUES)) {
      return false;
    }
    startApiLoading(apiKey, STATIC_VALUES, setLoading);
    const response = await apiUserUpdateProfile(formData);
    console_log("apiUserUpdateProfile response:::", response)
    if (apiResponseIsSuccess(response)) {
      let userInfo = response['data']['user']
      setFormData({ ...userInfo, avatar: null })
      dispatch(setUser(userInfo));
      showToast({ message: response.message })
    } else {
      if (apiLoginRequired(response)) {
        navResetLogin(navigation)
      } else {
        showToast({ message: response.message })
      }
    }
    endApiLoading(apiKey, STATIC_VALUES, setLoading)
  }

  return (
    <SafeAreaView style={[CustomStyle.screenContainer]}>
      <ScrollView style={[AuthStyle.signupScreen]} contentContainerStyle={{ flexGrow: 1 }}>
        <MyScreenHeader
          headerType="4"
          title="My Profile"
        />
        <View style={[BaseStyle.flex]}>
          <View style={[BaseStyle.flex, AuthStyle.authFormContainer]}>
            <View style={[AuthStyle.authFormWrapper]}>
              <View>
                <View style={CustomStyle.formControl}>
                  <View style={[CustomStyle.avatarWrapper]}>
                    <MyAvatarBox
                      placeholder={renderPlaceholder()}
                      fileData={formData['avatar']}
                      openUploadModal={() => openUploadModal()}
                      deleteImage={() => onClearFormFileField('avatar')}
                    />
                  </View>
                </View>
                <View style={[AuthStyle.authFormBody]}>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`First Name`}
                      placeholder={``}
                      value={formData['first_name']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("first_name", text)}
                      left={<TextInput.Icon icon={({ size, color }) => (
                        <Image source={require('../../../assets/images/icons/user.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                      )} />}
                    />
                  </View>
                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Last Name`}
                      placeholder={``}
                      value={formData['last_name']}
                      returnKeyType="next"
                      keyboardType="default"
                      onChangeText={text => onChangeFormField("last_name", text)}
                      left={<TextInput.Icon icon={({ size, color }) => (
                        <Image source={require('../../../assets/images/icons/user.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
                      )} />}
                    />
                  </View>

                  <View style={CustomStyle.formControl}>
                    <MyTextInput
                      label={`Email`}
                      placeholder={``}
                      value={formData['email']}
                      returnKeyType="next"
                      keyboardType="email-address"
                      onChangeText={text => onChangeFormField("email", text)}
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
                        <Image source={require('../../../assets/images/flag/flag_us.png')} style={{ width: size, height: size }} alt="flag" resizeMode="contain" />
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
                  <MyButton mode="contained" onPress={() => onPressSubmit()}>
                    Update Profile
                  </MyButton>
                </View>
              </View>
            </View>
          </View>


        </View>
      </ScrollView>

      <MyImageSourceModal
        visible={visibleImageTypeModal}
        setVisible={setVisibleImageTypeModal}
        setImageSourceType={setImageSourceType}
      />

      {(loading) && (<Indicator />)}
    </SafeAreaView>
  )
}

export default ProfileScreen;
