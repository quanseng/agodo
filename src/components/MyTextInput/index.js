import React from 'react';
import { Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';

const MyTextInput = (props) => {
  return (
    <>
      <TextInput
        mode="flat" //flat,outlined      
        placeholderTextColor={COLOR.FONT_GRAY}
        underlineColor={COLOR.TRANSPARENT}
        activeUnderlineColor={COLOR.FONT_GRAY}
        //selectionColor={COLOR.SELECTION}
        style={{
          color: COLOR.APP,
        }}
        theme={{
          colors: {
            primary: COLOR.APP,
            onSurface: COLOR.FONT_GRAY,
            surfaceVariant: COLOR.BG_GRAY,
            onSurfaceVariant: COLOR.APP,
          },
        }}
        {...props}
        label={<Text style={[BaseStyle.textGray]}>{props.label}</Text>} 
      />
    </>
  )
}

export default MyTextInput
