import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
} from "react-native";

import { TextInput } from 'react-native-paper';
import MyTextInput from "../../MyTextInput";
import BaseStyle from "../../../styles/BaseStyle";
import { COLOR } from "../../../utils/Constants";

const s = StyleSheet.create({
  baseInputStyle: {
    color: COLOR.APP
  },
});

export default class MyCCInput extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
    additionalInputProps: PropTypes.shape(TextInput.propTypes),
  };

  static defaultProps = {
    label: "",
    value: "",
    status: "incomplete",
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => { },
    onChange: () => { },
    onBecomeEmpty: () => { },
    onBecomeValid: () => { },
    additionalInputProps: {},
  };

  componentWillReceiveProps = newProps => {
    const { status, value, onBecomeEmpty, onBecomeValid, field } = this.props;
    const { status: newStatus, value: newValue } = newProps;

    if (value !== "" && newValue === "") onBecomeEmpty(field);
    if (status !== "valid" && newStatus === "valid") onBecomeValid(field);
  };

  focus = () => this.refs.input.focus();

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = value => this.props.onChange(this.props.field, value);

  render() {
    const { label, value, placeholder, status, keyboardType,
      containerStyle, inputStyle, labelStyle,
      validColor, invalidColor, placeholderColor,
      additionalInputProps } = this.props;
    return (
      <TextInput
        mode="flat" //flat,outlined      
        placeholderTextColor={COLOR.FONT_GRAY}
        underlineColor={COLOR.TRANSPARENT}
        activeUnderlineColor={COLOR.FONT_GRAY}
        //selectionColor={COLOR.SELECTION}           
        theme={{
          colors: {
            primary: COLOR.APP,
            onSurface: COLOR.FONT_GRAY,
            surfaceVariant: COLOR.BG_GRAY,
            onSurfaceVariant: ((validColor && status === "valid") ? COLOR.APP : (invalidColor && status === "invalid") ? COLOR.RED : COLOR.APP),
          },
        }}
        label={<Text style={[BaseStyle.textGray]}>{label}</Text>}
        ref="input"
        {...additionalInputProps}
        keyboardType={keyboardType}
        autoCapitalise="words"
        autoCorrect={false}
        style={[
          s.baseInputStyle,
          inputStyle,
          ((validColor && status === "valid") ? { color: validColor } :
            (invalidColor && status === "invalid") ? { color: invalidColor } :
              {}),
        ]}
        underlineColorAndroid={"transparent"}
        placeholder={placeholder}
        value={value}
        onFocus={this._onFocus}
        onChangeText={this._onChange}
      />
    );
  }
}
