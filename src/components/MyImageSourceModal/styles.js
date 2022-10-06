import { StyleSheet } from 'react-native';
import { COLOR, SIZE } from '../../utils/Constants';

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: SIZE.APP_BODY_PADDING
    },
    icon:{
      width: 48,
      height: 48,
      tintColor: COLOR.APP
    },
    titleWrapper:{
      display: 'flex',
      flexDirection: "row",
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%'
    },
    bodyWrapper:{
      display: 'flex',
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: SIZE.APP_BODY_PADDING/2,
      marginBottom: SIZE.APP_BODY_PADDING/2,
    },
    itemWrapper:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default styles;