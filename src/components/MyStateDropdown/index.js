import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';
import { console_log } from '../../utils/Misc';
import styles from './styles';

const MyStateDropdown = (props) => {
  const {dataList, onSelect} = props

  return (
    <>
      <SelectDropdown
        data={dataList}
        disableAutoScroll={true}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={styles.dropdown3BtnChildStyle}>
              <View style={styles.dropdown3BtnChildLeft}>
                <Image source={require('../../assets/images/flag/flag_us.png')} style={styles.flag} alt="flag" resizeMode="contain" />
                {(selectedItem) ? (
                  <Text style={styles.dropdown3BtnTxt}>{selectedItem}</Text>
                ) : (
                  <Text style={styles.dropdown3BtnPlaceholderTxt}>Select your State</Text>
                )}
              </View>
              <MaterialCommunityIcons name="chevron-down" style={styles.dropdown3BtnDownIcon} size={20} />
            </View>
          )
        }}
        buttonStyle={styles.dropdown3BtnStyle}
        dropdownStyle={styles.dropdown3DropdownStyle}
        rowStyle={styles.dropdown3RowStyle}

        onSelect={(selectedItem, index) => {
          console_log(selectedItem, index)
          onSelect(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
    </>
  )
}

export default MyStateDropdown
