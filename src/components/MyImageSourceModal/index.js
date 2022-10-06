import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-paper';
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';
import { console_log } from '../../utils/Misc';
import styles from './styles';

const MyImageSourceModal = (props) => {
  const { visible, setVisible, setImageSourceType } = props

  useEffect(() => {
    if (visible) {
      showModal()
    } else {
      closeModal()
    }
    return () => {
      closeModal()
    }
  }, [visible])

  const bottomSheetModalRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['1%', 150], []);

  const showModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const closeModal = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const handleSheetChanges = useCallback((index) => {
    //console_log('handleSheetChanges', index);
    if (index === 0) {
      closeModal()
    }
  }, []);

  const handleDismiss = useCallback(() => {
    //console_log("on dismissssssssssssss")
    setVisible(false)
  }, []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} />,
    []
  );

  const onPressItem = (type) => {
    closeModal()
    setTimeout(() => {
      setImageSourceType(type)
    }, 100)
  }

  return (
    <BottomSheetModalProvider>
      <View style={[BaseStyle.flex, BaseStyle.positionAbsolute]}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          // detached={true}
          enableDismissOnClose={true}
          onDismiss={handleDismiss}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
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
        </BottomSheetModal>
      </View>

    </BottomSheetModalProvider>
  )
}

export default MyImageSourceModal
