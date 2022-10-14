import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';
import { console_log } from '../../utils/Misc';
import styles from './styles';

const MyBottomSheet = (props) => {
  const { visible, setVisible } = props
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
  }
  const closeModal = () => {
    refRBSheet.current.close()
    setVisible(false)
  }
  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeDuration={10}
        animationType="none"
        height={props.height ? props.height : 260}
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
        onClose={() => onClose()}
      >
        <View style={styles.contentContainer}>
          {props.children}
        </View>

      </RBSheet>
    </>
  )
}

export default MyBottomSheet
