import { StyleSheet } from 'react-native';
import { COLOR } from '../../utils/Constants';
import { isRoundedDevice } from '../../utils/Utils';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: COLOR.BG_GRAY,
    borderTopWidth: 1,
    backgroundColor: COLOR.WHITE,
  },
  tabItem: {
    width: '25%',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: isRoundedDevice() ? 30 : 20,
  },
  selected: {
    backgroundColor: 'rgba(255,255,255,0)',
  },
  tabItemOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  tabItemText: {
    marginTop: 2,
    fontSize: 11,
    color: COLOR.DARK,
    letterSpacing: -0.4
  },
  tabIconImage: {
    width: 24,
    height: 24
  },
});

export default styles;