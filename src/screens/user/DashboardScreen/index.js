import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { Dimensions, Platform } from 'react-native';
import styles from './styles';
import { Indicator } from '../../../components/Indicator';
import { useDispatch, useSelector } from 'react-redux';

export default DashboardScreen = (props) => {
  /////////////////////////////////////////// start common header for screen  ////////////////////////////////////////////
  const { navigation, route } = props;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Dash</Text>
    </SafeAreaView>
  )
}