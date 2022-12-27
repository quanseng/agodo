import React, { } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';

//import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { console_log } from '../../utils/Misc';
import { setDarkStatusBarStyle } from '../../utils/Utils';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from '../../utils/Constants';
import GooglePlacesInput from '../../components/GooglePlacesInput';

const TestScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: GOOGLE_MAP_API_KEY,
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}

      /> */}
      <GooglePlacesInput 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
});


export default TestScreen;