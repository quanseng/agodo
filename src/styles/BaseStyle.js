import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import { COLOR, SIZE, STATUSBAR_HEIGHT } from "../utils/Constants";
const { width, height } = Dimensions.get("window");

const BaseStyle = StyleSheet.create({
  positionAbsolute:{
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
  },
  flex: {
    flex: 1
  },
  h100p: {
    minHeight: height
  },
  flexRow: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifyBetween: {
    justifyContent: 'space-between'
  },
  alignCenter: {
    alignItems: 'center'
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  colEnd: {
    alignItems: 'flex-end'
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: COLOR.LIGHT_GRAY,
  },
  bgWhite: {
    backgroundColor: COLOR.WHITE
  },
  bgLightGray: {
    backgroundColor: COLOR.BG_GRAY,
  },
  textLightDark: {
    color: COLOR.FONT_LIGHT_DARK
  },
  textDark: {
    color: COLOR.FONT_DARK
  },
  textGray: {
    color: COLOR.FONT_GRAY
  },
  textLightGray: {
    color: COLOR.FONT_LIGHT_GRAY
  },
  textWarning: {
    color: COLOR.FONT_WARNING
  },
  textWhite: {
    color: COLOR.WHITE
  },
  textPrimary: {
    color: COLOR.APP,
  },
  textXl: {
    fontSize: 32,
    lineHeight: 48,
  },
  textLg: {
    fontSize: 24,
    lineHeight: 36,
  },
  textLg1: {
    fontSize: 20,
    lineHeight: 32,
  },
  textMd: {
    fontSize: 16,
    lineHeight: 24,
  },
  textMd1: {
    fontSize: 14,
    lineHeight: 21,
  },
  textSm: {
    fontSize: 13,
    lineHeight: 20,
  },
  textXs: {
    fontSize: 11,
    lineHeight: 17,
  },
  textBold: {
    fontWeight: '700'
  },
  textSemiBold: {
    fontWeight: '500'
  },
  textLight: {
    fontWeight: '400'
  },
  textLighter: {
    fontWeight: '200'
  },
  textLeft:{
    textAlign:'left'
  },
  textRight:{
    textAlign:'right'
  },
  textCenter:{
    textAlign:'center'
  },
  textJustify:{
    textAlign:'justify'
  },

  col0: {
    width: 0
  },
  col1: {
    width: '8.3333%'
  },
  col2: {
    width: '16.6666%'
  },
  col3: {
    width: '25%'
  },
  col4: {
    width: '33.3333%'
  },
  col5: {
    width: '41.6666%'
  },
  col6: {
    width: '50%'
  },
  col7: {
    width: '58.3333%'
  },
  col8: {
    width: '66.6666%'
  },
  col9: {
    width: '75%'
  },
  col10: {
    width: '83.3333%'
  },
  col11: {
    width: '91.6666%'
  },
  col12: {
    width: '100%'
  },
  mb0: {
    marginBottom: 0
  },
  mb1: {
    marginBottom: SIZE.APP_BODY_PADDING * (1 / 6)
  },
  mb2: {
    marginBottom: SIZE.APP_BODY_PADDING * (2 / 6)
  },
  mb3: {
    marginBottom: SIZE.APP_BODY_PADDING * (3 / 6)
  },
  mb4: {
    marginBottom: SIZE.APP_BODY_PADDING * (4 / 6)
  },
  mb5: {
    marginBottom: SIZE.APP_BODY_PADDING * (5 / 6)
  },
  mb6: {
    marginBottom: SIZE.APP_BODY_PADDING * (6 / 6)
  },
  mb7: {
    marginBottom: SIZE.APP_BODY_PADDING * (7 / 6)
  },
  mb8: {
    marginBottom: SIZE.APP_BODY_PADDING * (8 / 6)
  },
  mb9: {
    marginBottom: SIZE.APP_BODY_PADDING * (9 / 6)
  },
  mb10: {
    marginBottom: SIZE.APP_BODY_PADDING * (10 / 6)
  },
  mb11: {
    marginBottom: SIZE.APP_BODY_PADDING * (11 / 6)
  },
  mb12: {
    marginBottom: SIZE.APP_BODY_PADDING * (12 / 6)
  },
  mt0: {
    marginTop: 0
  },
  mt1: {
    marginTop: SIZE.APP_BODY_PADDING * (1 / 6)
  },
  mt2: {
    marginTop: SIZE.APP_BODY_PADDING * (2 / 6)
  },
  mt3: {
    marginTop: SIZE.APP_BODY_PADDING * (3 / 6)
  },
  mt4: {
    marginTop: SIZE.APP_BODY_PADDING * (4 / 6)
  },
  mt5: {
    marginTop: SIZE.APP_BODY_PADDING * (5 / 6)
  },
  mt6: {
    marginTop: SIZE.APP_BODY_PADDING * (6 / 6)
  },
  mt7: {
    marginTop: SIZE.APP_BODY_PADDING * (7 / 6)
  },
  mt8: {
    marginTop: SIZE.APP_BODY_PADDING * (8 / 6)
  },
  mt9: {
    marginTop: SIZE.APP_BODY_PADDING * (9 / 6)
  },
  mt10: {
    marginTop: SIZE.APP_BODY_PADDING * (10 / 6)
  },
  mt11: {
    marginTop: SIZE.APP_BODY_PADDING * (11 / 6)
  },
  mt12: {
    marginTop: SIZE.APP_BODY_PADDING * (12 / 6)
  },
  ml0: {
    marginLeft: 0
  },
  ml1: {
    marginLeft: SIZE.APP_BODY_PADDING * (1 / 6)
  },
  ml2: {
    marginLeft: SIZE.APP_BODY_PADDING * (2 / 6)
  },
  ml3: {
    marginLeft: SIZE.APP_BODY_PADDING * (3 / 6)
  },
  ml4: {
    marginLeft: SIZE.APP_BODY_PADDING * (4 / 6)
  },
  ml5: {
    marginLeft: SIZE.APP_BODY_PADDING * (5 / 6)
  },
  ml6: {
    marginLeft: SIZE.APP_BODY_PADDING * (6 / 6)
  },
  ml7: {
    marginLeft: SIZE.APP_BODY_PADDING * (7 / 6)
  },
  ml8: {
    marginLeft: SIZE.APP_BODY_PADDING * (8 / 6)
  },
  ml9: {
    marginLeft: SIZE.APP_BODY_PADDING * (9 / 6)
  },
  ml10: {
    marginLeft: SIZE.APP_BODY_PADDING * (10 / 6)
  },
  ml11: {
    marginLeft: SIZE.APP_BODY_PADDING * (11 / 6)
  },
  ml12: {
    marginLeft: SIZE.APP_BODY_PADDING * (12 / 6)
  },
  mr0: {
    marginRight: 0
  },
  mr1: {
    marginRight: SIZE.APP_BODY_PADDING * (1 / 6)
  },
  mr2: {
    marginRight: SIZE.APP_BODY_PADDING * (2 / 6)
  },
  mr3: {
    marginRight: SIZE.APP_BODY_PADDING * (3 / 6)
  },
  mr4: {
    marginRight: SIZE.APP_BODY_PADDING * (4 / 6)
  },
  mr5: {
    marginRight: SIZE.APP_BODY_PADDING * (5 / 6)
  },
  mr6: {
    marginRight: SIZE.APP_BODY_PADDING * (6 / 6)
  },
  mr7: {
    marginRight: SIZE.APP_BODY_PADDING * (7 / 6)
  },
  mr8: {
    marginRight: SIZE.APP_BODY_PADDING * (8 / 6)
  },
  mr9: {
    marginRight: SIZE.APP_BODY_PADDING * (9 / 6)
  },
  mr10: {
    marginRight: SIZE.APP_BODY_PADDING * (10 / 6)
  },
  mr11: {
    marginRight: SIZE.APP_BODY_PADDING * (11 / 6)
  },
  mr12: {
    marginRight: SIZE.APP_BODY_PADDING * (12 / 6)
  },
  pb0: {
    paddingBottom: 0
  },
  pb1: {
    paddingBottom: SIZE.APP_BODY_PADDING * (1 / 6)
  },
  pb2: {
    paddingBottom: SIZE.APP_BODY_PADDING * (2 / 6)
  },
  pb3: {
    paddingBottom: SIZE.APP_BODY_PADDING * (3 / 6)
  },
  pb4: {
    paddingBottom: SIZE.APP_BODY_PADDING * (4 / 6)
  },
  pb5: {
    paddingBottom: SIZE.APP_BODY_PADDING * (5 / 6)
  },
  pb6: {
    paddingBottom: SIZE.APP_BODY_PADDING * (6 / 6)
  },
  pb7: {
    paddingBottom: SIZE.APP_BODY_PADDING * (7 / 6)
  },
  pb8: {
    paddingBottom: SIZE.APP_BODY_PADDING * (8 / 6)
  },
  pb9: {
    paddingBottom: SIZE.APP_BODY_PADDING * (9 / 6)
  },
  pb10: {
    paddingBottom: SIZE.APP_BODY_PADDING * (10 / 6)
  },
  pb11: {
    paddingBottom: SIZE.APP_BODY_PADDING * (11 / 6)
  },
  pb12: {
    paddingBottom: SIZE.APP_BODY_PADDING * (12 / 6)
  },
  pt0: {
    paddingTop: 0
  },
  pt1: {
    paddingTop: SIZE.APP_BODY_PADDING * (1 / 6)
  },
  pt2: {
    paddingTop: SIZE.APP_BODY_PADDING * (2 / 6)
  },
  pt3: {
    paddingTop: SIZE.APP_BODY_PADDING * (3 / 6)
  },
  pt4: {
    paddingTop: SIZE.APP_BODY_PADDING * (4 / 6)
  },
  pt5: {
    paddingTop: SIZE.APP_BODY_PADDING * (5 / 6)
  },
  pt6: {
    paddingTop: SIZE.APP_BODY_PADDING * (6 / 6)
  },
  pt7: {
    paddingTop: SIZE.APP_BODY_PADDING * (7 / 6)
  },
  pt8: {
    paddingTop: SIZE.APP_BODY_PADDING * (8 / 6)
  },
  pt9: {
    paddingTop: SIZE.APP_BODY_PADDING * (9 / 6)
  },
  pt10: {
    paddingTop: SIZE.APP_BODY_PADDING * (10 / 6)
  },
  pt11: {
    paddingTop: SIZE.APP_BODY_PADDING * (11 / 6)
  },
  pt12: {
    paddingTop: SIZE.APP_BODY_PADDING * (12 / 6)
  },
  pl0: {
    paddingLeft: 0
  },
  pl1: {
    paddingLeft: SIZE.APP_BODY_PADDING * (1 / 6)
  },
  pl2: {
    paddingLeft: SIZE.APP_BODY_PADDING * (2 / 6)
  },
  pl3: {
    paddingLeft: SIZE.APP_BODY_PADDING * (3 / 6)
  },
  pl4: {
    paddingLeft: SIZE.APP_BODY_PADDING * (4 / 6)
  },
  pl5: {
    paddingLeft: SIZE.APP_BODY_PADDING * (5 / 6)
  },
  pl6: {
    paddingLeft: SIZE.APP_BODY_PADDING * (6 / 6)
  },
  pl7: {
    paddingLeft: SIZE.APP_BODY_PADDING * (7 / 6)
  },
  pl8: {
    paddingLeft: SIZE.APP_BODY_PADDING * (8 / 6)
  },
  pl9: {
    paddingLeft: SIZE.APP_BODY_PADDING * (9 / 6)
  },
  pl10: {
    paddingLeft: SIZE.APP_BODY_PADDING * (10 / 6)
  },
  pl11: {
    paddingLeft: SIZE.APP_BODY_PADDING * (11 / 6)
  },
  pl12: {
    paddingLeft: SIZE.APP_BODY_PADDING * (12 / 6)
  },
  pr0: {
    paddingRight: 0
  },
  pr1: {
    paddingRight: SIZE.APP_BODY_PADDING * (1 / 6)
  },
  pr2: {
    paddingRight: SIZE.APP_BODY_PADDING * (2 / 6)
  },
  pr3: {
    paddingRight: SIZE.APP_BODY_PADDING * (3 / 6)
  },
  pr4: {
    paddingRight: SIZE.APP_BODY_PADDING * (4 / 6)
  },
  pr5: {
    paddingRight: SIZE.APP_BODY_PADDING * (5 / 6)
  },
  pr6: {
    paddingRight: SIZE.APP_BODY_PADDING * (6 / 6)
  },
  pr7: {
    paddingRight: SIZE.APP_BODY_PADDING * (7 / 6)
  },
  pr8: {
    paddingRight: SIZE.APP_BODY_PADDING * (8 / 6)
  },
  pr9: {
    paddingRight: SIZE.APP_BODY_PADDING * (9 / 6)
  },
  pr10: {
    paddingRight: SIZE.APP_BODY_PADDING * (10 / 6)
  },
  pr11: {
    paddingRight: SIZE.APP_BODY_PADDING * (11 / 6)
  },
  pr12: {
    paddingRight: SIZE.APP_BODY_PADDING * (12 / 6)
  },
});

export default BaseStyle;