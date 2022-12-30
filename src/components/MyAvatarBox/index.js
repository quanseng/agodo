import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { check, request, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ImageView from "react-native-image-viewing";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-paper';
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';
import { console_log, empty } from '../../utils/Misc';
import styles from './styles';
import MyImageSourceModal from '../MyImageSourceModal';
import CustomStyle from '../../styles/CustomStyle';

const MyAvatarBox = (props) => {
  const { fileData, placeholder, openUploadModal, deleteImage } = props

  // useEffect(() => {

  // }, [visible])

  const images = [
    {
      uri: empty(fileData) ? "" : fileData['uri'],
    }
  ];
  const [visible, setIsVisible] = useState(false);

  const openImageView = () => {
    setIsVisible(true)
  }

  const onDeleteImage = () => {
    // console_log("onDeleteImage:::")
    deleteImage();
  }

  return (
    <View style={styles.uploadBoxContainer}>
      {
        empty(fileData) ? (
          <TouchableOpacity activeOpacity={0.85} onPress={() => openUploadModal()}>
            <View style={styles.uploadPlaceholderBox}>
              {placeholder}
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.uploadContentBox}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openImageView()}>
              <Image
                resizeMode="contain"
                style={[CustomStyle.avatar]}
                defaultSource={require('../../assets/images/data/avatar-placeholder.png')}
                source={{ uri: fileData['uri'] }}
              />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} style={styles.uploadActionBox} onPress={() => onDeleteImage()}>
              <Image source={require('../../assets/images/icons/delete_forever.png')} style={[styles.deleteIcon]} alt="icon" resizeMode="contain" />
            </TouchableOpacity>

          </View>
        )
      }

      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  )
}

export default MyAvatarBox
