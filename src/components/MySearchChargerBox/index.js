import React, { useState } from 'react';
import { ScrollView, ImageBackground, Image, StatusBar, View, Text, TouchableOpacity } from 'react-native';
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';
import styles from './styles';

const ChargerTypeList = [
  {
    'label': `at my${"\n"}location`,
    'value': 'my_location'
  },
  {
    'label': `on my${"\n"}route`,
    'value': 'my_route'
  },
  {
    'label': `at my${"\n"}destination`,
    'value': 'my_destination'
  },
]
const MySearchChargerBox = (props) => {
  const [chargerType, setChargerType] = useState('my_location')
  const onPressItem = (item_type) =>{
    setChargerType(item_type);
  }
  return (
    <>
      <View style={[styles.searchChargerBox]}>
        {
          ChargerTypeList.map((item, index) => {
            return (
              <View key={index} style={[styles.searchChargerItem]}>
                <TouchableOpacity activeOpacity={0.75} onPress={()=>onPressItem(item.value)}>
                  <View style={[styles.searchChargerItemContent, (item.value === chargerType ? styles.searchChargerItemContentActive : null)]}>
                    <Text></Text>
                    <Text style={[BaseStyle.textSm, styles.searchChargerItemText, (item.value === chargerType ? styles.searchChargerItemTextActive : null)]}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    </>
  )
}

export default MySearchChargerBox
