import React, { useState } from "react";
//import PropTypes from 'prop-types'
import { Keyboard, Platform, StyleSheet, KeyboardAvoidingView} from "react-native";
import { Block, Input, Button, Text, DotIndicator } from '../elements';
import {theme} from '../constants';
import { CommonUtils } from '../utils'

const VALID_PASSWORD = "react";
export default function LoginScreen(props) {
  const [email, setEmail] = useState('plantapp@react.com')
  const [password, setPassword] = useState('react')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  function onEmailTextChanged(newEmail) {
    setEmail(newEmail)
  }

  function onPasswordTextChanged(newPassword) {
    setPassword(newPassword)
  }

  //Server side mockup
  async function onLoginClicked() {
    Keyboard.dismiss()
    setLoading(true)
    await CommonUtils.wait(2000)
    const errors = []
    if(!CommonUtils.validateEmail(email)){
      errors.push('email')
    } 

    if(password !== VALID_PASSWORD) {
      errors.push('password')
    }

    setErrors(errors)
    setLoading(false)

    if(errors.length === 0)
      props.navigation.navigate('browse')
  }

  function onForgotPasswordClicked() {
    props.navigation.navigate('forgot_password')
  }

  const isErrors = errors;
  const errorStyle = key => isErrors.includes(key) ? styles.inputError : null

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.select({
        ios: 0,
        android: theme.sizes.base * 2
      })}
      behavior="padding"
    >
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Login
        </Text>
        <Block middle>
          <Input
            label="Email"
            error = {errorStyle('email')}
            style={[styles.input, errorStyle('email')]}
            defaultValue={email}
            onChangeText={text => onEmailTextChanged(text)}
          />
          <Input
            secure
            label="Password"
            style={[styles.input, errorStyle('password')]}
            error={errorStyle("password")}
            defaultValue={password}
            onChangeText={(text) => onPasswordTextChanged(text)}
          />
          <Button gradient onPress={onLoginClicked}>
            {loading ? (
              <DotIndicator
                color={theme.colors.white}
                count={4}
                size={theme.sizes.base * 0.5}
              />
            ) : (
              <Text bold white center>
                Login
              </Text>
            )}
          </Button>
          <Button onPress={onForgotPasswordClicked}>
            <Text
              center
              caption
              gray
              style={{ textDecorationLine: "underline" }}
            >
              Forgot Password?
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}

LoginScreen.defaultProps = {

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  input: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inputError: {
    borderBottomColor: theme.colors.accent
  }
})
