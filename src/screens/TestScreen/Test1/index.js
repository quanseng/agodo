import React, { Component } from "react";
import { StyleSheet, View, Switch, KeyboardAvoidingView, Platform } from "react-native";
import { CreditCardInput, LiteCreditCardInput, MyCreditCardInput } from "../../../components/MyCreditCardForm/src";

const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    marginTop: 60,
  },
});


export default class Example extends Component {
  state = { useLiteCreditCardInput: true };

  _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  _onFocus = (field) => console.log("focusing", field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput });

  render() {
    return (
      <KeyboardAvoidingView style={s.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Switch
          style={s.switch}
          onValueChange={this._setUseLiteCreditCardInput}
          value={this.state.useLiteCreditCardInput} />

        { this.state.useLiteCreditCardInput ?
          (
            <MyCreditCardInput
              autoFocus
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          ) : (
            <CreditCardInput
              autoFocus

              requiresName
              requiresCVC
              requiresPostalCode
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          )
        }
      </KeyboardAvoidingView>
    );
  }
}
