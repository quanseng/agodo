import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Icons from "./Icons";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";
import MyCCInput from "./MyCCInput";
import CustomStyle from "../../../styles/CustomStyle";
import BaseStyle from "../../../styles/BaseStyle";

const INFINITE_WIDTH = 1000;

const s = StyleSheet.create({
  container: {
    width: '100%'
  },
  icon: {
    width: 48,
    resizeMode: "contain",
  },
  expanded: {
    flex: 1,
  },
  hidden: {
    width: 0,
  },
  leftPart: {
    overflow: "hidden",
  },
  rightPart: {
    overflow: "hidden",
    flexDirection: "row",
  },
  last4: {
    flex: 1,
    justifyContent: "center",
  },
  numberInput: {
    width: INFINITE_WIDTH,
  },
  expiryInput: {
    width: 80,
  },
  cvcInput: {
    width: 80,
  },
  last4Input: {
    width: 60,
    marginLeft: 20,
  },
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class MyCreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,

    placeholders: PropTypes.object,

    inputStyle: Text.propTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    additionalInputsProps: PropTypes.objectOf(PropTypes.shape(TextInput.propTypes)),
  };

  static defaultProps = {
    labels: {
      name: "Cardholder's Name",
      number: "Card Number",
      expiry: "MM/YY",
      cvc: "CVV",
      postalCode: "Postal Code",
    },
    placeholders: {
      number: "",
      expiry: "",
      cvc: "",
    },
    validColor: "",
    invalidColor: "red",
    placeholderColor: "gray",
    additionalInputsProps: {},
  };

  componentDidMount = () => this._focus(this.props.focused);

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focusNumber = () => this._focus("number");
  _focusExpiry = () => this._focus("expiry");

  _focus = field => {
    if (!field) return;
    this.refs[field].focus();
    LayoutAnimation.easeInEaseOut();
  }

  _inputProps = field => {
    const {
      inputStyle, validColor, invalidColor, placeholderColor, labels,
      placeholders, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
      additionalInputsProps,
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,

      label: labels[field],
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
      additionalInputProps: additionalInputsProps[field],
    };
  };

  _iconToShow = () => {
    const { focused, values: { type } } = this.props;
    if (focused === "cvc" && type === "american-express") return "cvc_amex";
    if (focused === "cvc") return "cvc";
    if (type) return type;
    return "placeholder";
  }

  render() {
    const { focused, values: { number }, inputStyle, status: { number: numberStatus } } = this.props;
    const showRightPart = focused && focused !== "number";

    return (
      <View style={s.container}>
        <View style={CustomStyle.formControl}>
          <MyCCInput {...this._inputProps("number")}
            keyboardType="numeric"
            containerStyle={s.numberInput}
          />
          {/* <TouchableOpacity onPress={showRightPart ? this._focusNumber : this._focusExpiry}>
            <Image style={s.icon} source={Icons[this._iconToShow()]} />
          </TouchableOpacity> */}
        </View>
        <View style={BaseStyle.flexRow}>
          <View style={[BaseStyle.col6, BaseStyle.pr1]}>
            <View style={CustomStyle.formControl}>
              <MyCCInput {...this._inputProps("expiry")}
                keyboardType="numeric"
                containerStyle={s.expiryInput} />
            </View>
          </View>
          <View style={[BaseStyle.col6, BaseStyle.pl2]}>
            <View style={CustomStyle.formControl}>
              <MyCCInput {...this._inputProps("cvc")}
                keyboardType="numeric"
                containerStyle={s.cvcInput} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
