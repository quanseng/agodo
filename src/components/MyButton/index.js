import React from 'react';
import { Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, SIZE } from '../../utils/Constants';
import styles from './styles';

const MyButton = (vprops) => {
  return (
    <Button
    style={styles.myButton}
      {...vprops}
    >
      {vprops.children}
    </Button>
  )
}

export default MyButton;