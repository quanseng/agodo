import React from 'react';
import { GOOGLE_MAP_API_KEY } from '../../utils/Constants';
import { Modal } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useRef } from 'react';
import styles from './styles';
import { console_log } from '../../utils/Misc';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomStyle from '../../styles/CustomStyle';
import { View, Image } from 'react-native';


const MyGooglePlacesInputModal = (props) => {
  const { visible, setVisible, setLocationData } = props;
  const ref = useRef();

  const showModal = () => {
    setVisible(true)
  }
  const hideModal = () => {
    setVisible(false)
  }

  useEffect(() => {
    if (visible) {
      ref.current?.focus()
    }
  }, [visible])

  const onPressGoBack = () => {
    setVisible(false)
  }

  return (
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.contentContainerStyle}>

      <View style={[CustomStyle.screenHeader]}>
        <TouchableOpacity onPress={() => { onPressGoBack() }}>
          <Image source={require('../../assets/images/icons/arrow_left.png')} style={CustomStyle.iconBackArrow} alt="back" resizeMode="contain" />
        </TouchableOpacity>
        <View></View>
      </View>
      <View style={[styles.contentStyle]}>
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder='Search location'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console_log("GooglePlacesInput, data, details::::::::", data, details);
            setLocationData(details)
            hideModal()
          }}
          query={{
            key: GOOGLE_MAP_API_KEY,
            language: 'en',
            //components: 'country:us',
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
        />
      </View>
    </Modal>
  )
}

export default MyGooglePlacesInputModal;