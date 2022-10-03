import React, { useState } from 'react';
import { Text } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';

const MyDropdown = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <>
      <DropDown      
        mode={"flat"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        underlineColor={COLOR.TRANSPARENT}
        activeUnderlineColor={COLOR.FONT_GRAY}
        activeColor={COLOR.APP}
        theme={{
          colors: {
            primary: COLOR.APP,
            surface: "rgba(255, 251, 254, 1)",
            onSurface: COLOR.TRANSPARENT, 
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

export default MyDropdown
