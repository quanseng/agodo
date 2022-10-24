// import { Spinner } from 'native-base';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
//import { ActivityIndicator } from 'react-native-paper';
import { COLOR } from '../../utils/Constants';
import styles from './styles';

export const Indicator = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator
        animating={true}
        color={COLOR.APP}
        size="large"
      />
    </View>
  )
}