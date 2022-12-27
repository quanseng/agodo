import React from 'react';
import { Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import BaseStyle from '../../styles/BaseStyle';
import { COLOR, GOOGLE_MAP_API_KEY, SIZE } from '../../utils/Constants';
import styles from './styles';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { console_log } from '../../utils/Misc';

const GooglePlacesInput = (props) => {
  const onPress = {props}
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console_log("GooglePlacesInput data, details::::::::", data, details);
        onPress(data, details)
      }}
      query={{
        key: GOOGLE_MAP_API_KEY,
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;