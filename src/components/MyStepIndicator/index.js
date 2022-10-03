import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';

import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';
import styles from './styles';

const MyStepIndicator = (props) => {
  const {stepCount = 4, currentPosition, setCurrentPosition} = props;
  //const labels = ["", "", "", "", ""];
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: COLOR.APP,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: COLOR.APP,
    stepStrokeUnFinishedColor: COLOR.APP,
    separatorFinishedColor: COLOR.APP,
    separatorUnFinishedColor: COLOR.APP,
    stepIndicatorFinishedColor: COLOR.APP,
    stepIndicatorUnFinishedColor: COLOR.WHITE,
    stepIndicatorCurrentColor: COLOR.APP,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: COLOR.WHITE,
    stepIndicatorLabelFinishedColor: COLOR.WHITE,
    stepIndicatorLabelUnFinishedColor: COLOR.APP,
    labelColor: COLOR.APP,
    labelSize: 13,
    currentStepLabelColor: COLOR.APP
  }

  return (
    <View style={[styles.stepBarContainer]}>
      <StepIndicator
        stepCount={stepCount}
        customStyles={customStyles}
        currentPosition={currentPosition}
        // labels={labels}
      />
    </View>
  )
}

export default MyStepIndicator;
