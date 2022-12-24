import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

import CustomStyle from '../../../styles/CustomStyle';
import BaseStyle from '../../../styles/BaseStyle';
import { console_log, empty } from '../../../utils/Misc';
import { showCarema, showImageLibrary, showToast } from '../../../utils/Utils';

import MyButton from '../../../components/MyButton';
import { ROUTE_EV_REG_CHARGER, ROUTE_RG_REG_VEHICLE, ROUTE_TERMS_CONDITION } from '../../../routes/RouteNames';
import MyScreenHeader from '../../../components/MyScreenHeader';
import AuthStyle from '../../../styles/AuthStyle';
import MyStepIndicator from '../../../components/MyStepIndicator';
import MyUploadBox from '../../../components/MyUploadBox';
import MyImageSourceModal from '../../../components/MyImageSourceModal';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from '../../../redux/data/actions';

const RgRegIdScreen = (props) => {
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
  const [currentPosition, setCurrentPosition] = useState(0); //for stepbar
  const [imageSide, setImageSide] = useState("front");
  
  const defaultFormData = {
    front: null,
    back: null
  }
  const [formData, setFormData] = useState(defaultFormData);  
  const onChangeFormField = (field_value) => {
    if(empty(field_value)) {
      return false;
    }
    const updatedData = { ...formData }
    if(!empty(field_value['assets']) && field_value['assets'].length > 0) {
      updatedData[imageSide] = field_value['assets'][0]
    }
    setFormData(updatedData)
  }
  const onClearFormField = (side) => {
    const updatedData = { ...formData }
    updatedData[side] = null;
    setFormData(updatedData)
  }

  const validateFields = () => {
    if(empty(formData['front'])) {
      showToast({message: "Please upload a front image of your ID"})
      return false
    }
    if(empty(formData['back'])) {
      showToast({message: "Please upload a back image of your ID"})
      return false
    }
    return true
  }

  const renderPlaceholder = (side_type) => {
    if (side_type === 'front') {
      return (
        <>
          <Text style={[BaseStyle.textXs, BaseStyle.textGray]}>
            Please attach a front image of your ID. Your details would only be used for verification and not be availble to the public
          </Text>
          <Text style={[BaseStyle.textSm, BaseStyle.mt3]}>
            Upload
          </Text>
        </>
      )
    } else if (side_type === 'back') {
      return (
        <>
          <Text style={[BaseStyle.textXs, BaseStyle.textGray]}>
            Please attach a back image of your ID. Your details would only be used for verification and not be availble to the public
          </Text>
          <Text style={[BaseStyle.textSm, BaseStyle.mt3]}>
            Upload
          </Text>
        </>
      )
    }
  }

  const requestRNPermission = async () => {
    const result = await requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
    console_log("result:::::", result)
    if (result[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED && result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.GRANTED) {
      return true
    } else {
      if (result[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED) {
        const uploadResult = await showImageLibrary({id: imageSide});
        onChangeFormField(uploadResult)
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
      uploadResult = await showCarema({id: imageSide})
    } else if (type === 'file') {
      uploadResult = await showImageLibrary({id: imageSide})
    }
    onChangeFormField(uploadResult)
  }

  const onPressNext = async () => {
    const isValid = validateFields()
    if(!isValid) {
      return false
    }
    dispatch(setPageData({ signupData: {...signupData, ...formData} }));
    navigation.navigate(ROUTE_RG_REG_VEHICLE)
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
                  <View style={[CustomStyle.formControl, BaseStyle.mb6]}>
                    <Text style={[BaseStyle.textSm, BaseStyle.textGray]}>Upload your Verification ID</Text>
                  </View>

                  <View style={AuthStyle.idSideTabBarWrapper}>
                    <View style={AuthStyle.idSideTabBarContainer}>
                      <View style={AuthStyle.idSideTabItemContainer}>
                        <TouchableOpacity activeOpacity={0.75} style={[AuthStyle.idSideTabItem, (imageSide === 'front' ? AuthStyle.idSideTabItemActive : null)]} onPress={() => setImageSide('front')}>
                          <Text style={[AuthStyle.idSideTabItemText, (imageSide === 'front' ? AuthStyle.idSideTabItemTextActive : null)]}>Front</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={AuthStyle.idSideTabItemContainer}>
                        <TouchableOpacity activeOpacity={0.75} style={[AuthStyle.idSideTabItem, (imageSide === 'back' ? AuthStyle.idSideTabItemActive : null)]} onPress={() => setImageSide('back')}>
                          <Text style={[AuthStyle.idSideTabItemText, (imageSide === 'back' ? AuthStyle.idSideTabItemTextActive : null)]}>Back</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={[BaseStyle.mt6]}>
                    {
                      (imageSide === 'front') ? (
                        <>
                          <MyUploadBox
                            placeholder={renderPlaceholder('front')}   
                            fileData={formData['front']}
                            openUploadModal={()=>openUploadModal()}
                            deleteImage={()=>onClearFormField('front')}
                          />
                        </>
                      ) : (
                        <>
                          <MyUploadBox
                            placeholder={renderPlaceholder('back')}
                            fileData={formData['back']}
                            openUploadModal={()=>openUploadModal()}
                            deleteImage={()=>onClearFormField('back')}
                          />
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
      
      <MyImageSourceModal
        visible={visibleImageTypeModal}
        setVisible={setVisibleImageTypeModal}
        setImageSourceType={setImageSourceType}
      />
    </SafeAreaView>
  )
}

export default RgRegIdScreen;