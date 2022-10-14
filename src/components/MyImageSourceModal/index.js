import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';
import { console_log } from '../../utils/Misc';
import styles from './styles';

const MyImageSourceModal = (props) => {
  const { visible, setVisible, setImageSourceType } = props
  const refRBSheet = useRef();

  useEffect(() => {
    if (visible) {
      showModal()
    } else {
      closeModal()
    }
  }, [visible])

  const showModal = () => {
    refRBSheet.current.open()
  };

  const closeModal = () => {
    refRBSheet.current.close()
    setVisible(false)
  };

  const onClose = ()=>{
    //console_log("onClose:::")
    setVisible(false)
  }
  const onPressItem = (type) => {
    closeModal()
    setTimeout(() => {
      setImageSourceType(type)
    }, 100)
  }

  return (
    <>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeDuration={10}
        animationType="none"
        height={150}
        customStyles={{
          container: {
            borderTopLeftRadius: SIZE.APP_BODY_PADDING / 2,
            borderTopRightRadius: SIZE.APP_BODY_PADDING / 2,
          },
          wrapper: {
            backgroundColor: COLOR.BG_DARK_MASK,
          },
          draggableIcon: {
            backgroundColor: COLOR.BG_SEMI_DARK,
          }
        }}
        onClose={()=>onClose()}
      >
        <View style={styles.contentContainer}>
          <View style={[styles.titleWrapper]}>
            <Text style={[BaseStyle.textLeft, BaseStyle.textMd1, BaseStyle.textBold]}>Select an action</Text>
          </View>
          <View style={[styles.bodyWrapper]}>
            <View style={[styles.itemWrapper]}>
              <TouchableOpacity onPress={() => onPressItem("camera")}>
                <Image source={require('../../assets/images/icons/camera.png')} style={styles.icon} alt="iocn" resizeMode="contain" />
                <Text style={[BaseStyle.textCenter, BaseStyle.textSm]}>Camera</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.itemWrapper]}>
              <TouchableOpacity onPress={() => onPressItem("file")}>
                <Image source={require('../../assets/images/icons/folder.png')} style={styles.icon} alt="iocn" resizeMode="contain" />
                <Text style={[BaseStyle.textCenter, BaseStyle.textSm]}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </>
  )
}

export default MyImageSourceModal
