import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import BaseStyle from '../../styles/BaseStyle';
import CustomStyle from '../../styles/CustomStyle';
import { COLOR, SIZE } from '../../utils/Constants';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './styles';

const dotIcon = () => {
  return (
    <Text style={styles.dotIcon}>
      •
    </Text>
  )
}
const MyCodeField = (props) => {
  const { cellCount = 4, value, setValue } = props;

  const ref = useBlurOnFulfill({ value, cellCount: cellCount });
  const [vprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <>
      <View style={[styles.codeFieldContainer]}>
        <CodeField
          ref={ref}
          {...vprops}
          value={value}
          onChangeText={setValue}
          cellCount={cellCount}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Text style={styles.cursorFont}><Cursor /></Text> : dotIcon())}
            </Text>
          )}
        />
      </View>
    </>
  )
}

export default MyCodeField;
