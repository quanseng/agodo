import { Platform, StyleSheet, Dimensions } from "react-native";
import { COLOR } from "../../utils/Constants";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLOR.BLACK
  },
  header: {
    paddingTop: 42,
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  menuContainer: {
    height: height - 70,
    overflow: 'scroll',
  },
  menuItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 14,
    lineHeight: 16,
    color: COLOR.WHITE,
  },
  menuIcon:{
    width: 14,
    height: 14,
    marginRight: 7
  },
  menuDivider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 6,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)'
  },
  drawerMenuList:{

  },

});

export default styles;