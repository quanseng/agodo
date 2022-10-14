import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#fe7013',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#fe7013',
};

const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: COLOR.TRANSPARENT,
  separatorFinishedColor: COLOR.APP,
  separatorUnFinishedColor: COLOR.APP,
  stepIndicatorFinishedColor: COLOR.WHITE,
  stepIndicatorUnFinishedColor: COLOR.WHITE,
  stepIndicatorCurrentColor: COLOR.WHITE,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: COLOR.APP,
  stepIndicatorLabelFinishedColor: COLOR.APP,
  stepIndicatorLabelUnFinishedColor: COLOR.APP,
  labelColor: COLOR.APP,
  labelSize: 15,
  currentStepLabelColor: COLOR.APP,
};

const getStepIndicatorIconConfig = ({
  position,
  stepStatus,
}) => {
  const iconConfig = {
    name: 'square',
    //color: stepStatus === 'finished' ? COLOR.APP : COLOR.APP,
    size: 15,
  };
  if (position % 2 === 0) {
    iconConfig.name = 'ellipse';
  } else {
    iconConfig.name = 'square';
  }
  return iconConfig;
};


const MyVerticalStepIndicator = (props) => {
  const {stepCount = 4, currentPosition, setCurrentPosition} = props;

  const onStepPress = (position) => {
    setCurrentPosition(position);
  };
  const renderStepIndicator = (params) => (
    <Icon {...getStepIndicatorIconConfig(params)} color={COLOR.APP} />
  );
  return (
    <View style={{ height: props.height ? props.height : stepCount * 67}}>
      <StepIndicator
        stepCount={stepCount}
        customStyles={customStyles}
        currentPosition={currentPosition}
        onPress={onStepPress}
        renderStepIndicator={renderStepIndicator}
        direction="vertical"
      />
    </View>
  );
}

export default MyVerticalStepIndicator;
